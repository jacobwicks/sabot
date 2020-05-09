import { Page } from 'puppeteer';
import { Post } from '../types';
import { threadLastRead, showThreadPageNumber } from './urls';
import log from './log';

//gets the page number from the url string
const getPageNumber = (url: string) =>
    Number(new URLSearchParams(url).get('pagenumber')?.split('#')[0]);

//the forums use anchor links to link to individual posts
//the url will resolve to something with the post number on the page
//https://forums.somethingawful.com/showthread.php?noseen=0&threadid=3921885&perpage=40&pagenumber=109#pti34
const getPostNumber = (url: string) => {
    const params = new URLSearchParams(url);
    const anchor = params.get('pagenumber')?.split('#').pop();

    //lastpost indicates that we have already read all the posts in the thread
    //no anchor indicates that we haven't read any posts in the thread
    //either way, the calling function should deal with them
    if (!anchor || anchor === 'lastpost') {
        return anchor;
    } else {
        //anchor starts with 'pti', slice that off
        //convert the string to a number
        //subtract 1 for a 0 based index
        const postNumber = Number(anchor.slice(3)) - 1;

        //don't want to deal with NaN in calling function
        return postNumber === NaN ? undefined : postNumber;
    }
};

// //get all the quotes, if any
// const quotes = [...post.querySelectorAll('blockquote')];

// //get the first image quoted
// //when you get back to this, make it find first image in post if none in quotes
// const getFirstImage = (quotes: HTMLQuoteElement[]) => {
//     const quoteWithImage = quotes.find((quote) =>
//         quote.querySelector('img')
//     );
//     return quoteWithImage?.querySelector('img')?.src;
// };

//evaluate the page, pass in the last read post
//might need to scan multiple pages
const getPosts = async (page: Page): Promise<Post[]> =>
    await page.evaluate(async () =>
        [...document.getElementsByClassName('post')].map((post) => {
            //get the author
            //getElementsByClassName returns Elements, not HTMLElement
            //cast to Any then Cast to array of HTMLElement
            const author = (<HTMLElement[]>(
                (<any>post.getElementsByClassName('author'))
            ))[0].innerText;

            //the post body container
            const postBody = (<HTMLElement[]>(
                (<any>post.getElementsByClassName('postbody'))
            ))[0];

            //we just want the text that the user posted, not the text that they quoted from other posts
            //so get post body text without text from child nodes
            //get an array of all the childNodes from the postBody
            const body = [...postBody.childNodes]
                //reduce it to a string
                .reduce(
                    (bodyText, currentText) =>
                        //only add the TEXT_NODEs to the accumulator
                        currentText.nodeType === Node.TEXT_NODE
                            ? (bodyText += currentText.nodeValue)
                            : bodyText,
                    '' //the bodyText starts as an empty string
                )
                //trim the whitespace
                .trim();

            //get the first image, if any
            const image = postBody.querySelector('img')?.src;

            //the postId
            const id = Number(post.id.slice(4, post.id.length));

            return {
                author,
                body,
                id,
                image,
            };
        })
    );

//goes to given thread on given page number
//and returns the posts from that page
const getPostsFromPageNumber = async ({
    page,
    pageNumber,
    threadId,
}: {
    page: Page;
    pageNumber: number;
    threadId: number;
}) => {
    //generate the url string for the thread and page number
    const threadUrl = showThreadPageNumber({
        pageNumber,
        threadId,
    });

    //navigate to the thread and page number
    await page.goto(threadUrl, {
        waitUntil: 'networkidle0',
    });

    //return the posts from the current page
    return await getPosts(page);
};

//gets the number of the last page in the thread
const getLastPageNumber = async (page: Page) => {
    //puppeteer element handle
    const lastPageEH = await page.$('[title="Last page"]');

    //puppeteer javascript handle
    const lastPageJH = await lastPageEH?.getProperty('innerText');

    //value of innertext
    const lastPageJV = await lastPageJH?.jsonValue();

    //cut off the trailing >> characters, remove whitespace
    //cast to number
    const lastPage = Number((lastPageJV as string)?.slice(0, -2).trim());

    //if lastPage doesn't exist, it's because we are on the last page
    //and on the last page, the last page element doesn't exist
    return lastPage || getPageNumber(await page.url());
};

interface LimitProps {
    startPage: number;
    startPost?: number;
    stopPage?: number;
    stopPost?: number;
}

//if no limits are provided,
//use this dummy object as the destructuring target
const noLimits = {
    startPage: undefined,
    startPost: undefined,
    stopPage: undefined,
    stopPost: undefined,
};

//gets all new posts from a thread
export const getNewPostsFromThread = async ({
    page,
    limit,
    threadId,
}: {
    //puppeteer page object
    page: Page;

    //limits on what page, posts to scan
    limit?: LimitProps;

    //the unique id of the target thread
    threadId: number;
}): Promise<Post[]> => {
    //get limits by destructuring limit prop
    const { startPage, startPost, stopPage, stopPost } = limit || noLimits;

    //generate the last read url
    const lastReadPostUrl = threadLastRead(threadId);

    //navigate to the lastReadPost url
    await page.goto(lastReadPostUrl, {
        waitUntil: 'networkidle0',
    });

    //url with search parameters
    //NOTE: resolves to #lastpost if its the last post. In that case, you don't need to scan
    const resolvedUrl = await page.evaluate(() => window.location.href);

    //starting page
    //takes limit value if provided, else
    //starts on the last unread page
    const pageNumber =
        startPage !== undefined ? startPage : getPageNumber(resolvedUrl);

    //starting post
    const postNumber =
        startPost !== undefined ? startPost : getPostNumber(resolvedUrl);

    //end page
    const lastPageNumber =
        stopPage !== undefined ? stopPage : await getLastPageNumber(page);

    //if the last read post was the last post in the thread, no new posts
    //return empty array
    if (postNumber === 'lastpost' || postNumber === undefined) return [];

    //if there's a page number, proceed
    if (pageNumber) {
        const remainingPages = [];

        //create an array with the pageNumbers to be scanned
        for (let page = pageNumber; page <= lastPageNumber; page++) {
            remainingPages.push(page);
        }

        //reduce the array of pageNumbers
        //to an array of the posts from those pages
        const posts = await remainingPages.reduce(
            async (previousPosts, currentPageNumber, index) => {
                //reduce accumulator is a promise
                //wait for accumulator to resolve
                const allPosts = await previousPosts;

                //wait for posts from the current page number
                let currentPosts = await getPostsFromPageNumber({
                    page,
                    pageNumber: currentPageNumber,
                    threadId,
                });

                //if limits defined a page and post to stop on
                //then slice the array of posts from that page
                if (
                    stopPage !== undefined &&
                    stopPost !== undefined &&
                    currentPageNumber === stopPage
                ) {
                    currentPosts = currentPosts.slice(stopPost);
                }

                //first page currentPosts will be sliced at the last read post number
                //to stop the bot from reacting twice to the same posts
                return index === 0
                    ? [...allPosts, ...currentPosts.slice(postNumber as number)]
                    : [...allPosts, ...currentPosts];
            },
            //type the accumulator as an array of Post objects
            Promise.resolve<Post[]>([])
        );

        return posts;
    } else {
        //if no page number, log error
        throw new Error('getNewPostsFromThread failed to find a pageNumber');
    }
};
