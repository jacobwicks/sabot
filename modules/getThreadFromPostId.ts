import threads from './threads';
import { Page } from 'puppeteer';

//const postId = 504748217;
const showPost = `https://forums.somethingawful.com/showthread.php?action=showpost&postid=${postId}`;

const getThreadFromPostId = async ({
    page,
    postId,
}: {
    page: Page;
    postId: number;
}) => {
    //use postId to load post on its own
    `https://forums.somethingawful.com/showthread.php?action=showpost&postid=504748217`;
    //on the page that loads with the signle post, there's the ? element
    //find this by class user_jump
    // <a class="user_jump" title="Show posts by this user" href="/showthread.php?threadid=3913318&amp;userid=179334">?</a>

    document.getElementsByClassName('user_jump')[0];

    //get the href property of the element
    `https://forums.somethingawful.com/showthread.php?threadid=3913318&userid=179334`;
    // and pull the threadId out of it.. use params or whatever

    const url = `https://forums.somethingawful.com/showthread.php?threadid=3913318&userid=179334`;
    const threadIdParam =
        'https://forums.somethingawful.com/showthread.php?threadid';

    const params = new URLSearchParams(url);

    const threadId = Number(params.get(threadIdParam));
    return threadId;
};

const postIsInBotThread = async ({
    page,
    postId,
}: {
    page: Page;
    postId: number;
}) => {
    const threadId = await getThreadFromPostId({ page, postId });
    return threads.some((thread) => thread.threadId === threadId);
};
