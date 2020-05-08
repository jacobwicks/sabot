//the login page for the SA forums
export const loginPage =
    'https://forums.somethingawful.com/account.php?action=loginform';

//successful login redirects to this url
export const loggedInAddress = 'https://forums.somethingawful.com/';

export const loggedOutAddress =
    'https://forums.somethingawful.com/account.php?action=logout';

//the trump threadId changes every month when the thread gets closed and a new one starts
//probably move this to the config file
export const trumpThreadId = 3921885;

//this links to the last read post in the trump thread
export const trumpThreadLastRead = `https://forums.somethingawful.com/showthread.php?threadid=${trumpThreadId}&goto=newpost`;

//starts a new reply to a given thread
export const replyToThread = (threadId: string) =>
    `https://forums.somethingawful.com/newreply.php?action=newreply&threadid=${threadId}`;

//reply to a specific post in a given thread
export const replyToPost = ({
    postId,
    threadId,
}: {
    postId: string;
    threadId: string;
}) => `${replyToThread(threadId)}&postid=${postId}`;

export const showThread = (threadId: number) =>
    `https://forums.somethingawful.com/showthread.php?threadid=${threadId}`;

export const showThreadPageNumber = ({
    threadId,
    pageNumber,
}: {
    threadId: number;
    pageNumber: number;
}) => `${showThread(threadId)}&perpage=40&pagenumber=${pageNumber}`;

//this links to the last read post in the thread
export const threadLastRead = (threadId: number) =>
    `https://forums.somethingawful.com/showthread.php?threadid=${threadId}&goto=newpost`;

export const replyToTrumpThread = `https://forums.somethingawful.com/newreply.php?action=newreply&threadid=${trumpThreadId}`;
