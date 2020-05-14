import fetch from 'node-fetch';
import makePost from './makePost';
import log from '../log';
import { apiKeys } from '../../config.json';
import { RespondToPostProps } from '../../types';

const options = {
    headers: {
        'X-API-KEY': apiKeys.catAPI,
    },
};

//the cat API. What a wonderful service!
const catApiUrl = 'https://api.thecatapi.com/v1/images/search';

//gets a cat from the cat api
const getCat = async (): Promise<string> =>
    //json method of the response is async, must be awaited
    (
        await //image request with the API key in options
        (await fetch(catApiUrl, options)).json()
    )[0]?.url;

//posts a cat in response to a specific post
const postCat = async ({ page, postId, threadId }: RespondToPostProps) => {
    log(`posting a kitty cat, quoting id ${postId}`);

    const catImgSrc = await getCat();

    //generate the postcontent string by wrapping the cat url in bbCode img tags
    const postContent = `[img]${catImgSrc}[/img]`;

    try {
        await makePost({
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
