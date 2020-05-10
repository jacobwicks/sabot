import puppeteer, { Page } from 'puppeteer';
import { loginWithCookies } from './modules/login';
import scanAndHandlePosts from './modules/scanAndHandlePosts';

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

        await scanAndHandlePosts(page);
    } else {
        console.error(`login failed`);
    }

    await browser.close();
})();
