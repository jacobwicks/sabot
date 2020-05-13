export const controlPanel = 'https://forums.somethingawful.com/usercp.php';

//the cdc us cases numbers
export const deathToll =
    'https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html';

//the login page for the SA forums
export const loginPage =
    'https://forums.somethingawful.com/account.php?action=loginform';

//successful login redirects to this url
export const loggedInAddress = 'https://forums.somethingawful.com/';

export const loggedOutAddress =
    'https://forums.somethingawful.com/account.php?action=logout';

//starts a new reply to a given thread
export const replyToThread = (threadId: number) =>
    `https://forums.somethingawful.com/newreply.php?action=newreply&threadid=${threadId}`;

//reply to a specific post in a given thread
export const replyToPost = ({
    postId,
    threadId,
}: {
    postId: number;
    threadId: number;
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
