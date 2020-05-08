import { Page } from 'puppeteer';
import { getNewPostsFromThread } from './modules/scanPosts';
import { loginWithCookies } from './modules/login';
import { trumpThreadId } from './modules/urls';
import handlePosts from './modules/handlePosts';

const puppeteer = require('puppeteer');

const getTrumpThreadPosts = async (page: Page) =>
    getNewPostsFromThread({ page, threadId: trumpThreadId });

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
        console.log(`Logged in! scanning trump thread`);
        const posts = await getTrumpThreadPosts(page);
        console.log(`there are ${posts.length} new posts in the trump thread`);
        await handlePosts({
            page,
            posts,
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
