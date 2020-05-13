import { Page } from 'puppeteer';

//limits on where to scan in a thread
export interface LimitProps {
    startPage: number;
    startPost?: number;
    stopPage?: number;
    stopPost?: number;
}

//the relevant parts of a post scraped from the forums
//posts start as Element, but we grab these from them
export interface Post {
    //the name of the user that wrote the post
    author: string;

    //the body of the post, without other quoted posts inside it
    body: string;

    //the unique postId number
    id: number;

    //the img.src property
    image?: string;
}

export interface PostManipulatedImageProps extends respondToPostProps {
    //the url of the image to be widened
    image: string;
}

//an interface for a response that quotes a specific postId
export interface respondToPostProps {
    //puppeteer Page object
    page: Page;

    //the id of the post that will be quoted
    postId: number;

    //the thread where the post is
    threadId: number;
}

//a thread that the bot monitors
export interface Thread {
    //human readable name
    //goes in the logs
    name: string;

    //the unique id of the thread on the forums
    threadId: number;

    //optional limits on scanning the thread
    //start at X page, post, stop at Y page, post
    limit?: LimitProps;
}
