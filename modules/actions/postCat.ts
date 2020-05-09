import fetch from 'node-fetch';
import { Page } from 'puppeteer';
import typePost from './typePost';
import log from '../log';
import { apiKeys } from '../../config.json';

const options = {
    headers: {
        'X-API-KEY': apiKeys.catAPI,
    },
};

const getCat = async (): Promise<string> =>
    (
        await (
            await fetch('https://api.thecatapi.com/v1/images/search', options)
        ).json()
    )[0]?.url;

interface postCatProps {
    page: Page;
    postId: number;
    threadId: number;
}

const postCat = async ({ page, postId, threadId }: postCatProps) => {
    log(`posting a kitty cat, quoting id ${postId}`);

    const catImgSrc = await getCat();

    const postContent = `[img]${catImgSrc}[/img]`;

    try {
        await typePost({
            postContent,
            page,
            postId,
            threadId,
        });
    } catch (err) {
        //if something goes wrong, then log it!
        log('postCat failed', { page, postId, threadId }, err);
    }
};

export default postCat;
