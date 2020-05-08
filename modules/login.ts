import { Page } from '../node_modules/@types/puppeteer/index';
import { loginPage } from './urls';
import getLoginStatus, { quickLoginStatus } from './getLoginStatus';
import { cookies, creds } from '../config.json';

interface creds {
    username: string;
    password: string;
}

const useCookies = async (page: Page) => await page.setCookie(...cookies);

//uses provided credentials to login using the page object
const doLogin = async ({ creds, page }: { creds: creds; page: any }) =>
    page.evaluate(
        async ({ creds }: { creds: creds }) => {
            const inputs = Array.from(
                //cast to collection of input elements because we use the value property
                <HTMLCollectionOf<HTMLInputElement>>(
                    document.getElementsByClassName('bginput')
                )
            );
            const usernameInput = inputs[0];
            const passwordInput = inputs[1];
            const loginButton = inputs[2];

            usernameInput.value = creds.username;
            passwordInput.value = creds.password;

            loginButton.click();
        },
        { creds }
    );

//accepts the page object and logs into the forums
const login = async (page: Page) => {
    //to log in, first go to the login page
    await page.goto(loginPage, {
        waitUntil: 'networkidle0',
    });

    await Promise.all([
        //doLogin fills in the username and password and
        //clicks the login button, which navigates to the forums main page
        doLogin({ creds, page }),

        //wait for the page to navigate and the network to have 0 active connections
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
};

export const loginWithCookies = async (page: Page) => {
    //use stored cookies to be logged in
    await useCookies(page);

    let loggedIn = await getLoginStatus(page);

    if (!loggedIn) {
        console.log(
            `couldn't login with cookies, logging in with credentials...`
        );

        //call the function to login with the credentials
        await login(page);
    }

    loggedIn = await getLoginStatus(page);
    loggedIn ? console.log('success!') : console.error(`Couldn't log in`);
    return loggedIn;
};

export default login;
