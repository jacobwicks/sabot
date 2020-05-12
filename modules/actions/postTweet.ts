import { Page } from 'puppeteer';
import makePost from './typePost';
import getTweet from '../getTweet';

interface postTweetProps {
    page: Page;
    postId: number;
    threadId: number;
    twitterAccount: string;
}

//posts latest tweet from requested account
const postTweet = async ({
    page,
    postId,
    threadId,
    twitterAccount,
}: postTweetProps) => {
    const postContent = await getTweet(twitterAccount);

    postContent &&
        (await makePost({
            postContent,
            page,
            postId,
            threadId,
        }));
};

export const postTrumpTweet = async ({
    page,
    postId,
    threadId,
}: {
    page: Page;
    postId: number;
    threadId: number;
}) => {
    const twitterAccount = 'realdonaldtrump';
    await postTweet({ page, postId, threadId, twitterAccount });
};

export default postTweet;
