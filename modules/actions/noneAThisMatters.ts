import makePost from './makePost';
import log from '../log';
import { RespondToPostProps } from '../../types';

const noneAThisMatters = async ({
    page,
    postId,
    threadId,
}: RespondToPostProps) => {
    const postContent = '[img]https://i.imgur.com/yX9KZ49.jpg[/img]';

    try {
        await makePost({
            postContent,
            page,
            postId,
            threadId,
        });
    } catch (err) {
        //if something goes wrong, then log it!
        log(
            "It don't matter. none a this matters!",
            { page, postId, threadId },
            err
        );
    }
};

export default noneAThisMatters;
