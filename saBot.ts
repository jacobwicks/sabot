import { Page } from 'puppeteer';
import { Post } from './types';
import { loginWithCookies } from './modules/login';
import { threadLastRead } from './modules/urls';

const puppeteer = require('puppeteer');

//scans the posts on the page
const scanPosts = async ({
    page,
    threadId,
}: {
    page: Page;
    threadId: string;
}) => {
    //generate the last read link
    const lastReadPostUrl = threadLastRead(threadId);

    //navigate to the lastReadPost url
    await page.goto(lastReadPostUrl, {
        waitUntil: 'networkidle0',
    });

    //wait for it to resolve
    //then, read the address
    //the forums use anchor links to link to individual posts
    //the url will resolve to something with the post number on the page
    //https://forums.somethingawful.com/showthread.php?noseen=0&threadid=3921885&perpage=40&pagenumber=109#pti34
    console.log(page.url());

    //evaluate the page, pass in the last read post
    //there are only 40 posts per page, so we might ned to scan multiple pages
    const posts: Post[] = await page.evaluate(async () =>
        [...document.getElementsByClassName('post')].map((post) => {
            //get the author
            //getElementsByClassName returns Elements, not HTMLElement
            //cast to Any then Cast to array of HTMLElement
            const author = (<HTMLElement[]>(
                (<any>post.getElementsByClassName('author'))
            ))[0].innerText;

            //get all the quotes, if any
            const quotes = [...post.querySelectorAll('blockquote')];

            //get the first image quoted

            const getFirstImage = (quotes: HTMLQuoteElement[]) => {
                const quoteWithImage = quotes.find((quote) =>
                    quote.querySelector('img')
                );
                return (
                    //@ts-ignore
                    quoteWithImage && quoteWithImage.querySelector('img').src
                );
            };

            const image = getFirstImage(quotes);

            //the post body
            const body = (<HTMLElement[]>(
                (<any>post.getElementsByClassName('postbody'))
            ))[0].innerText.trim();

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

    console.log(`there are ${posts.length} posts on the page`);
};

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
        console.log(`Logged in! Better do something useful!`);
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
