import { Page } from 'puppeteer';
import { Post } from '../types';
import postCat from './actions/postCat';
import { postTrumpTweet } from './actions/postTweet';

const postTrump = async ({ page, postId }: { page: Page; postId: number }) =>
    console.log('placeholder for misspelling turmp');

const imageRedder = async ({
    image,
    page,
    postId,
}: {
    image: string;
    page: Page;
    postId: number;
}) => {
    console.log('placeholder for reddening image');
};

const imageWider = async ({
    image,
    page,
    postId,
}: {
    image: string;
    page: Page;
    postId: number;
}) => {
    console.log('placeholder for widening image');
};

//takes an array of posts, handles them
const handlePosts = async ({
    page,
    posts,
    threadId,
}: {
    page: Page;
    posts: Post[];
    threadId: number;
}) => {
    //use a for loop, await in forEach doesn't work as expected
    for await (const post of posts) {
        //get the properties of the post
        const { author, body, id: postId, image } = post;

        console.log(`id ${postId}, written by ${author}`, image, body);

        //if a user posts valid instructions as the body of their post
        //then the corresponding action will be taken
        const handleBody: { [key: string]: () => Promise<void> } = {
            //posts a random picture of a cat
            //https://thecatapi.com/
            kittycat: () => postCat({ page, postId, threadId }),

            //posts a misspelling of trump
            'gimme a trump': () => postTrump({ page, postId }),

            //reddens the first image in the post
            redder: () =>
                !!image
                    ? imageRedder({ image, page, postId })
                    : Promise.resolve(),

            //posts the latest tweet by trump
            "what's trumping": () => postTrumpTweet(page),
            "what's trumpin": () => postTrumpTweet(page),
            'whats trumping': () => postTrumpTweet(page),
            'whats trumpin': () => postTrumpTweet(page),

            //widens the first image in the post
            wider: () =>
                !!image
                    ? imageWider({ image, page, postId })
                    : Promise.resolve(),

            //no instruction received
            default: () => Promise.resolve(),
        };

        //invoke handleBody with the body of the post
        await (
            handleBody[body.toLowerCase()] ||
            //maybe they added a period, or exclamation point
            handleBody[body.toLowerCase().slice(0, -1)] ||
            //if neither of the first two is found, default
            handleBody['default']
        )();
    }
};

export default handlePosts;

// posts.forEach(async (post, index) => {
//     //get the properties of the post
//     const { author, body, id: postId, image } = post;

//     console.log(
//         `${index}: id ${postId}, written by ${author}`,
//         image,
//         body
//     );

//     //if a user posts valid instructions as the body of their post
//     //then the corresponding action will be taken
//     const handleBody: { [key: string]: () => Promise<void> } = {
//         //posts a random picture of a cat
//         //https://thecatapi.com/
//         kittycat: async () => await postCat({ page, postId, threadId }),

//         //posts a misspelling of trump
//         'gimme a trump': () => postTrump({ page, postId }),

//         //reddens the first image in the post
//         redder: () =>
//             !!image
//                 ? imageRedder({ image, page, postId })
//                 : Promise.resolve(),

//         //posts the latest tweet by trump
//         "what's trumping": () => postTrumpTweet(page),
//         "what's trumpin": () => postTrumpTweet(page),
//         'whats trumping': () => postTrumpTweet(page),
//         'whats trumpin': () => postTrumpTweet(page),

//         //widens the first image in the post
//         wider: () =>
//             !!image
//                 ? imageWider({ image, page, postId })
//                 : Promise.resolve(),

//         //no instruction received
//         default: () => Promise.resolve(),
//     };

//     //invoke handleBody with the body of the post
//     await (
//         handleBody[body.toLowerCase()] ||
//         //maybe they added a period, or exclamation point
//         handleBody[body.toLowerCase().slice(0, -1)] ||
//         //if neither of the first two is found, default
//         handleBody['default']
//     )();
// });
