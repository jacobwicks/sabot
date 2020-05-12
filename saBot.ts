import getPostsAndHandlePosts from './modules/getPostsAndHandlePosts';
import setupAndLogin from './modules/setupAndLogin';

//do the things that the bot does
const runBot = async () => {
    const browserPage = await setupAndLogin();

    if (browserPage) {
        const { browser, page } = browserPage;

        await getPostsAndHandlePosts(page);

        await browser.close();
    } else {
        console.log(`no browser, nothing to do`);
    }
};

const intervalMinutes = 2;

const interval = intervalMinutes * 60 * 1000;

setInterval(runBot, interval);
