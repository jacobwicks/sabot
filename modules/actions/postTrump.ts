import { Page } from 'puppeteer';
import typePost from './typePost';
import log from '../log';

interface postTrumpProps {
    page: Page;
    postId: string;
    threadId: string;
}

const postTrump = async ({ page, postId, threadId }: postTrumpProps) => {
    log(`posting trum, quoting id ${postId}`);

    const postContent = `treeMOP!`;

    try {
        await typePost({
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
