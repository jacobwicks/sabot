const puppeteer = require('puppeteer');
const deathToll =
    'https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html';

const setupBrowser = async () => {
    //create the puppeteer browser
    const browser = await puppeteer.launch();

    //instantiate a page
    const page = await browser.newPage();

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

const getDeathToll = async () => {
    const { browser, page } = await setupBrowser();
    await page.goto(deathToll, {
        waitUntil: 'networkidle0',
    });

    const { cases, deaths } = await page.evaluate(() => {
        const callouts = [...document.getElementsByClassName('callout')];
        const deathArray = callouts[1].innerText.split(' ');
        const deaths = {
            new: deathArray[3],
            total: deathArray[2],
        };

        const casesArray = callouts[0].innerText.split(' ');
        const cases = {
            new: casesArray[3],
            total: casesArray[2],
        };

        return {
            cases,
            deaths,
        };
    });

    const postContent = `There have been ${deaths.total} total deaths, including ${deaths.new} newly reported.
    There are ${cases.total} COVID 19 cases, including ${cases.new} newly reported.`;

    console.log(postContent);

    await browser.close();
};

getDeathToll();
