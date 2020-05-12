import fetch from 'node-fetch';
import typePost from './typePost';
import log from '../log';
import { apiKeys } from '../../config.json';
import { respondToPostProps } from '../../types';

const options = {
    headers: {
        'X-API-KEY': apiKeys.catAPI,
    },
};

//gets a cat from the cat api
const getCat = async (): Promise<string> =>
    //json method of the response is async, must be awaited
    (
        await //image request with the API key in options
        (
            await fetch('https://api.thecatapi.com/v1/images/search', options)
        ).json()
    )[0]?.url;

const postCat = async ({ page, postId, threadId }: respondToPostProps) => {
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
