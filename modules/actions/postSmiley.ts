import typePost from './typePost';
import log from '../log';
import * as smilies from '../smilies.json';
import { respondToPostProps } from '../../types';

//gets a smiley from the smilies
const getSmiley = () => smilies[Math.floor(Math.random() * smilies.length)];

const postSmiley = async ({ page, postId, threadId }: respondToPostProps) => {
    log(`posting a random smiley cat, quoting id ${postId}`);

    const postContent = getSmiley();

    try {
        await typePost({
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
