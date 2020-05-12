import { Page } from 'puppeteer';
import { showThreadPageNumber } from './urls';
import getPosts from './getPosts';

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

export default getPostsFromPageNumber;
