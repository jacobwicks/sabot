import puppeteer, { Page } from 'puppeteer';

const setupBrowser = async () => {
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

    //need the browser object to close it out when done
    return {
        browser,
        page,
    };
};

export default setupBrowser;
