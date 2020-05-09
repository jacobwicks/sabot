import { Page } from 'puppeteer';

interface postTweetProps {
    page: Page;
    twitterAccount: string;
}

//posts latest tweet from requested account
const postTweet = ({ page, twitterAccount }: postTweetProps) =>
    console.log(`placeholder for posting tweet`);

export const postTrumpTweet = async (page: Page) => {
    const twitterAccount = 'realDonaldTrump';
    postTweet({ page, twitterAccount });
};

export default postTweet;
