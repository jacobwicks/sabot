import makePost from './makePost';
import log from '../log';
import * as smilies from '../smilies.json';
import { RespondToPostProps } from '../../types';

//gets a smiley from the smilies
const getSmiley = () => smilies[Math.floor(Math.random() * smilies.length)];

const postSmiley = async ({ page, postId, threadId }: RespondToPostProps) => {
    log(`posting a random smiley, quoting id ${postId}`);

    const postContent = getSmiley();

    try {
        await makePost({
            postContent,
            page,
            postId,
            threadId,
        });
    } catch (err) {
        //if something goes wrong, then log it!
        log('postSmiley failed', { page, postId, threadId }, err);
    }
};

export default postSmiley;
