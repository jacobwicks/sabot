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

            //post body text without text from child nodes
            const body = [...postBody.childNodes]
                .reduce((acc, cur) => {
                    if (cur.nodeType === Node.TEXT_NODE) {
                        acc += cur.nodeValue;
                    }
                    return acc;
                }, '')
                .trim();

            //get the first image, if any
            const image = postBody.querySelector('img')?.src;

            //the postId
            const id = post.id.slice(4, post.id.length);

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
    const threadUrl = showThreadPageNumber({
        pageNumber,
        threadId,
    });

    await page.goto(threadUrl, {
        waitUntil: 'networkidle0',
    });

    return await getPosts(page);
};

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

//gets all new posts from a thread
export const getNewPostsFromThread = async ({
    page,
    threadId,
}: {
    page: Page;
    threadId: number;
}): Promise<Post[]> => {
    //first, get the posts from the last read page

    //generate the last read link
    const lastReadPostUrl = threadLastRead(threadId);

    //navigate to the lastReadPost url
    await page.goto(lastReadPostUrl, {
        waitUntil: 'networkidle0',
    });

    //url with search parameters
    //NOTE: resolves to #lastpost if its the last post. In that case, you don't need to scan
    const resolvedUrl = await page.evaluate(() => window.location.href);

    const pageNumber = getPageNumber(resolvedUrl);
    const postNumber = getPostNumber(resolvedUrl);
    const lastPageNumber = await getLastPageNumber(page);

    //if the last read post was the last post in the thread, no new posts
    //return empty array
    if (postNumber === 'lastpost' || postNumber === undefined) return [];

    //if there's a page number, proceed
    if (pageNumber) {
        const remainingPages = [];
        for (let page = pageNumber; page <= lastPageNumber; page++) {
            remainingPages.push(page);
        }

        const posts = await remainingPages.reduce(
            async (previousPosts, currentPageNumber, index) => {
                //reduce accumulator is a promise
                //wait for accumulator to resolve
                const allPosts = await previousPosts;

                //wait for posts from the current page number
                const currentPosts = await getPostsFromPageNumber({
                    page,
                    pageNumber: currentPageNumber,
                    threadId,
                });

                //this could cause a bug... need to test
                return index === 0
                    ? [...allPosts, ...currentPosts.slice(postNumber as number)]
                    : [...allPosts, ...currentPosts];
            },
            Promise.resolve<Post[]>([])
        );

        return posts;
    } else {
        //if no page number, log error
        throw new Error('getNewPostsFromThread failed to find a pageNumber');
    }
};
