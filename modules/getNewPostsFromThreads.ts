import { getNewPostsFromThread } from './scanPosts';
import { Page } from 'puppeteer';
import { Thread, Post } from '../types';

//gets all new posts from an array of Thread objects
//returns an object where the keys are threadIds, values are array of Post objects
const getNewPostsFromThreads = async ({
    threads,
    page,
}: {
    threads: Thread[];
    page: Page;
}) =>
    threads.reduce(
        async (previousPosts, thread) => {
            //reduce accumulator is a promise
            //wait for accumulator to resolve
            const allPosts = await previousPosts;

            //get thread name, id, limit
            //limit is an optional object that designates
            //where to start and stop scanning the thread
            const { name, threadId, limit } = thread;

            console.log(`scanning ${name}, threadId ${threadId}`);

            //wait for posts from the current thread
            const currentPosts = await getNewPostsFromThread({
                limit,
                page,
                threadId,
            });

            console.log(
                `there are ${currentPosts.length} new posts in the ${name} thread`
            );

            allPosts[threadId] = currentPosts;

            return allPosts;
        },
        Promise.resolve<{
            [key: number]: Post[];
        }>({})
    );

export default getNewPostsFromThreads;
