import getPostsAndHandlePosts from './modules/getPostsAndHandlePosts';
import setupAndLogin from './modules/setupAndLogin';

//do the things that the bot does
const runBot = async () => {
    const browserPage = await setupAndLogin();

    if (browserPage) {
        const { browser, page } = browserPage;

        //get the posts from each monitored thread
        //you can find the threads in modules/threads.ts
        //handles each post
        await getPostsAndHandlePosts(page);

        //done handling posts, close the browser object
        await browser.close();
    } else {
        console.log(`no browser, nothing to do`);
    }
};

//run the bot every so many minutes
const intervalMinutes = 2;

//multiply minute value by 1000 to get seconds, by 60 to get minutes
const interval = intervalMinutes * 60 * 1000;

//run the bot once
(async () => await runBot())();

//the bot every interval
setInterval(runBot, interval);
