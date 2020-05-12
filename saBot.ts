import puppeteer, { Page } from 'puppeteer';
import { loginWithCookies } from './modules/login';
import getPostsAndHandlePosts from './modules/getPostsAndHandlePosts';

const setup = async () => {
    //create the puppeteer browser
    const browser = await puppeteer.launch();

    //instantiate a page
    const page: Page = await browser.newPage();

    //disable slow stuff
    await page.setRequestInterception(true);

    //intercept the requests to disable it
    page.on('request', (req) => {
        if (
            //css
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font' ||
            //image loading
            req.resourceType() == 'image' ||
            //javascript
            req.resourceType() === 'script'
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });

    return {
        browser,
        page,
    };
};

const setupAndLogin = async () => {
    //get the Puppeteer browser page object
    const { browser, page } = await setup();

    //login
    //try the stored cookies first
    //then credentials
    let loggedIn = await loginWithCookies(page);

    if (loggedIn) {
        console.log(`Logged in! scanning threads`);

        return { browser, page };
    } else {
        console.error(`login failed`);
    }
};
//startup functions
const doThings = async () => {
    const browserPage = await setupAndLogin();
    if (browserPage) {
        const { browser, page } = browserPage;

        await getPostsAndHandlePosts(page);

        await browser.close();
    } else {
        console.log(`no browswer, nothing to do`);
    }
};

doThings();
