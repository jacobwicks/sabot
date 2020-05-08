import { loggedInAddress } from './urls';
import { Page } from '../node_modules/@types/puppeteer/index';

//gets login status without navigating to a new page
export const quickLoginStatus = async (page: Page) =>
    await page.evaluate(() => {
        const logoutText = 'Log Out';
        const links = [...document.querySelectorAll('a')];
        const isLoggedIn = links.some((link) => link.innerText === logoutText);
        return isLoggedIn;
    });

const getLoginStatus = async (page: Page) => {
    //go to the forums homepage
    await page.goto(loggedInAddress, {
        waitUntil: 'networkidle0',
    });

    //evaluate the page. Find the links that say *** Log In *** or Log Out
    return await quickLoginStatus(page);
};

export default getLoginStatus;
