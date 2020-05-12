import makePost from './typePost';
import log from '../log';
import { respondToPostProps } from '../../types';

const postTrump = async ({ page, postId, threadId }: respondToPostProps) => {
    log(`posting trum, quoting id ${postId}`);

    const postContent = `treeMOP!`;

    try {
        await makePost({
            postContent,
            page,
            postId,
            threadId,
        });
    } catch (err) {
        //if something goes wrong, then log it!
        log('postTrump failed', { page, postId, threadId }, err);
    }
};

export default postTrump;
