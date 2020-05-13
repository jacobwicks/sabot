import getPostsAndHandlePosts from './modules/getPostsAndHandlePosts';
import setupAndLogin from './modules/setupAndLogin';
import getThreadsFromControlPanel from './modules/getThreadsFromControlPanel';
import log from './modules/log';

//do the things that the bot does
const runBot = async () => {
    try {
        const browserPage = await setupAndLogin();

        if (browserPage) {
            const { browser, page } = browserPage;

            //get bookmarked threads from control panel
            const threads = await getThreadsFromControlPanel(page);

            //get the posts from each bookmarked thread
            //you add names and limit the threads
            //using the threads array in modules/threads.ts
            //then handle each post from each thread
            await getPostsAndHandlePosts({ page, threads });

            //done handling posts, close the browser object
            await browser.close();
        } else {
            throw Error('no browser loaded');
        }
    } catch (err) {
        log(err);
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
