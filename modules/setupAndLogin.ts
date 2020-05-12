import setupBrowser from './setupBrowser';
import { loginWithCookies } from './login';

//startup functions
const setupAndLogin = async () => {
    //get the Puppeteer browser page object
    const { browser, page } = await setupBrowser();

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

export default setupAndLogin;
