import puppeteer, { Page } from 'puppeteer';
import { getNewPostsFromThread } from './modules/scanPosts';
import { loginWithCookies } from './modules/login';
import { covidThreadId, trumpThreadId } from './modules/urls';
import handlePosts from './modules/handlePosts';
import { LimitProps, Post } from './types';

interface Thread {
    name: string;
    threadId: number;
    limit?: LimitProps;
}

const trumpThread = {
    name: 'CSPAM Trump thread',
    threadId: trumpThreadId,
};

const covidThread = {
    name: 'CSPAM Covid thread',
    threadId: covidThreadId,
};

const threads: Thread[] = [covidThread];

const getTrumpThreadPosts = async (page: Page) => {
    const limit = {
        startPage: 263,
        startPost: 8,
        stopPage: 265,
        stopPost: 1,
    };
    return getNewPostsFromThread({ page, threadId: trumpThreadId });
};

const getCovidThreadPosts = async (page: Page) =>
    getNewPostsFromThread({ page, threadId: covidThreadId });

//what the bot is doing

//startup functions
(async () => {
    //create the puppeteer browser
    const browser = await puppeteer.launch();

    //instantiate a page
    const page: Page = await browser.newPage();

    //login
    //try the stored cookies first
    //then credentials
    let loggedIn = await loginWithCookies(page);

    if (loggedIn) {
        console.log(`Logged in! scanning threads`);

        const newPosts = await threads.reduce(
            async (previousPosts, thread) => {
                //reduce accumulator is a promise
                //wait for accumulator to resolve
                const allPosts = await previousPosts;

                //get thread name, id, limits
                const { name, threadId, limit } = thread;

                console.log(`scanning ${name}, threadId ${threadId}`);

                //wait for posts from the current page number
                const currentPosts = await getNewPostsFromThread({
                    page,
                    threadId,
                });

                console.log(
                    `there are ${currentPosts.length} new posts in the ${name} thread`
                );

                allPosts[threadId] = currentPosts;

                return allPosts;
            },
            Promise.resolve<{
                [key: number]: Post[];
            }>({})
        );

        Object.keys(newPosts).forEach(async (threadId) => {
            await handlePosts({
                page,
                posts: newPosts[Number(threadId)],
                threadId: Number(threadId),
            });
        });
    } else {
        console.error(`login failed`);
    }

    await browser.close();
})();

// (async () => {
//     //create the puppeteer browser
//     const browser = await puppeteer.launch();

//     //instantiate a page
//     const page: Page = await browser.newPage();

//     //goto the forums login page
//     //waituntil designates the network conditions that cause the promise to resolve
//     await page.goto(loginPage, {
//         waitUntil: 'networkidle0',
//     });

//     const initialCookies = await page.cookies();

//     //wait for all promises to resolve
//     await Promise.all([
//         //call the login routine
//         //login clicks the login button, which redirects to the forums main page
//         login({ creds, page }),

//         //wait for the page to navigate and the network to have 0 active connections
//         page.waitForNavigation({ waitUntil: 'networkidle0' }),
//     ]);

//     console.log(`username and password entered`);

//     if (isLoggedIn(page)) {
//         console.log('login succeeded');
//     } else console.error('login failed');

//     const cookies = await page.cookies();

//     const newCookies = cookies.filter(
//         (cookie) =>
//             !initialCookies.some(
//                 (initialCookie) =>
//                     JSON.stringify(initialCookie) === JSON.stringify(cookie)
//             )
//     );

//     console.log(newCookies);

//     await browser.close();
// })();
