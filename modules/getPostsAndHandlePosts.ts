import { Page } from 'puppeteer';
import getNewPostsFromThreads from './getNewPostsFromThreads';
import threads from './threads';
import handlePosts from './handlePosts';

const getPostsAndHandlePosts = async (page: Page) => {
    //an object { threadId : Post[] }
    const newPosts = await getNewPostsFromThreads({
        threads,
        page,
    });

    //use a for loop, await in forEach doesn't work as expected
    for await (const thread of Object.keys(newPosts)) {
        //cast the key to a number
        const threadId = Number(thread);
        console.log(`handling posts for ${threadId}`);

        //handle each post in the array
        await handlePosts({
            page,
            //the threadId is the key, value Post[]
            posts: newPosts[threadId],
            threadId,
        });
    }
};

export default getPostsAndHandlePosts;
