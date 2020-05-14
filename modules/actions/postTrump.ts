import makePost from './makePost';
import log from '../log';
import { RespondToPostProps } from '../../types';

const postTrump = async ({ page, postId, threadId }: RespondToPostProps) => {
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
