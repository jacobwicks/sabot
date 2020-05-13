import { Page } from 'puppeteer';
import { replyToPost, replyToThread } from '../urls';

interface typePostProps {
    postContent: string;
    page: Page;
    postId: number;
    threadId: number;
}

//types a post and hits the submit reply button
const makePost = async ({
    postContent,
    page,
    postId,
    threadId,
}: typePostProps) => {
    const address = postId
        ? replyToPost({ postId, threadId })
        : replyToThread(threadId);

    //navigate to the reply page
    await page.goto(address, {
        waitUntil: 'networkidle0',
    });

    //use querySelector to get the textarea where you type the post
    //post is a puppeteer 'elementHandle'
    const post = await page.$('textarea');

    if (post) {
        //used to use .type, but dunno how to append text instead of put it the beginning
        //elementHandles have available methods, including .type()
        //.type() allows you to type text into the element that the elementHandle refers to
        //await post.type(postContent);

        //pass postContent string into page.evaluate
        await page.evaluate((postContent: string) => {
            //get the textarea where you type the post
            const postField = <HTMLTextAreaElement>(
                document.getElementsByName('message')[0]
            );

            //append postContent to the textarea postField
            postField.value += postContent;
        }, postContent);

        //querySelectorAll for input type = submit gets us the buttons
        const submits = await page.$$('input[type="submit"]');

        //the submit reply button is second in the array
        const submitReply = [...submits][1];

        //click submit reply to post!
        submitReply.click();

        //wait for post to be accepted
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
        throw new Error('typePost Unable to find post');
    }
};

export default makePost;
