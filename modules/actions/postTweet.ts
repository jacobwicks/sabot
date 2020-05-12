import fetch from 'node-fetch';
import { Page } from 'puppeteer';
import { apiKeys } from '../../config.json';
import typePost from './typePost';

interface postTweetProps {
    page: Page;
    postId: number;
    threadId: number;
    twitterAccount: string;
}

const getTweet = async (screenName: string) => {
    const bearerToken = apiKeys.twitter.bearerToken.access_token;

    const baseUrl =
        'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=';

    const count = 10;

    //https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=10
    const getUrl = `${baseUrl}${screenName}&count=${count}`;

    const options = {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    };

    const tweets = await (await fetch(getUrl, options)).json();

    if (Array.isArray(tweets)) {
        const getFirstOriginalTweet = (tweets: any) =>
            tweets.find((tweet: any) => !tweet.retweeted);

        const tweet = getFirstOriginalTweet(tweets);

        const tweetId = tweet.id_str;

        //[url]https://twitter.com/thedailybeast/status/1259956481702666241[/url]
        const postContent = `[url]https://twitter.com/${screenName}/status/${tweetId}[/url]`;

        return !!tweetId && postContent;
    }
    console.log(`tweets is not an array`, tweets);

    return false;
};

//posts latest tweet from requested account
const postTweet = async ({
    page,
    postId,
    threadId,
    twitterAccount,
}: postTweetProps) => {
    const postContent = await getTweet(twitterAccount);

    postContent &&
        (await typePost({
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
