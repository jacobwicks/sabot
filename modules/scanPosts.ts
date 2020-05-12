import { Page } from 'puppeteer';
import { Post, LimitProps } from '../types';
import { threadLastRead } from './urls';
import log from './log';
import getPageNumber from './getPageNumber';
import getLastPageNumber from './getLastPageNumber';
import getPostsFromPageNumber from './getPostsFromPageNumber';
import getPostNumber from './getPostNumber';

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
