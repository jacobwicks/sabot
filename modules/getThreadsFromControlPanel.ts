import { Page } from 'puppeteer';
import { controlPanel } from './urls';
import listedThreads from './threads';

const getThreadsFromControlPanel = async (page: Page) => {
    //navigate to the thread and page number
    await page.goto(controlPanel, {
        waitUntil: 'networkidle0',
    });

    const bookMarkedThreads = await page.evaluate(async () => {
        const threadIdParam =
            'https://forums.somethingawful.com/showthread.php?threadid';

        const threadTitles: HTMLAnchorElement[] = <HTMLAnchorElement[]>[
            ...document.getElementsByClassName('thread_title'),
        ];

        return threadTitles.map((thread) => ({
            id: Number(new URLSearchParams(thread.href).get(threadIdParam)),
            title: thread.innerHTML,
        }));
    });

    return bookMarkedThreads.map((thread) => {
        const asListed = listedThreads.find(
            (listedThread) => listedThread.threadId === thread.id
        );

        return {
            //the limits you put on scanning this threadId
            limit: asListed?.limit,

            //what you named the threadId
            name: asListed?.name,

            //the threadId
            threadId: thread.id,

            //the current title of the the thread on the forums
            title: thread.title,
        };
    });
};

export default getThreadsFromControlPanel;
