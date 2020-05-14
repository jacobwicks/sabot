import { Page } from 'puppeteer';
import { Post } from '../types';
import { botName, imageCollections } from '../config.json';
import postCat from './actions/postCat';
import { postTrumpTweet } from './actions/postTweet';
import postDeathToll from './actions/postDeathToll';
import postImageWider from './actions/postImageWider';
import postImageRedder from './actions/postImageRedder';
import postFromImageCollection from './actions/postFromImageCollection';

const isInstruction = (body: string) =>
    body.slice(0, botName.length).toLowerCase() === botName;

const getInstructionFromBody = (body: string) =>
    body
        .slice(botName.length + 1)
        .trim()
        .toLowerCase();

const getInstructions = (posts: Post[]) =>
    posts
        .filter((post) => isInstruction(post.body))
        .map((post) => ({
            ...post,
            instruction: getInstructionFromBody(post.body),
        }));

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
    const instructions = getInstructions(posts);

    console.log(
        `there are ${instructions.length} instructions in thread ${threadId}`
    );

    instructions.forEach((instruction) => console.log(instruction));

    //use a for loop, await in forEach doesn't work as expected
    for await (const post of instructions) {
        //get the properties of the post
        let { author, body, id: postId, image, instruction } = post;

        //if a user posts valid instructions as the body of their post
        //then the corresponding action will be taken
        const handleBody: { [key: string]: () => Promise<void> } = {
            deathtoll: () => postDeathToll({ page, postId, threadId }),

            //posts a random picture of a cat
            //https://thecatapi.com/
            kittycat: () => postCat({ page, postId, threadId }),

            //reddens the first image in the post
            redder: () =>
                !!image
                    ? postImageRedder({ image, page, postId, threadId })
                    : Promise.resolve(),

            //posts the latest tweet by trump
            "what's trumping": () => postTrumpTweet({ page, postId, threadId }),
            "what's trumpin": () => postTrumpTweet({ page, postId, threadId }),
            'whats trumping': () => postTrumpTweet({ page, postId, threadId }),
            'whats trumpin': () => postTrumpTweet({ page, postId, threadId }),

            //widens the first image in the post
            wider: () =>
                !!image
                    ? postImageWider({ image, page, postId, threadId })
                    : Promise.resolve(),

            //no instruction received
            default: () => Promise.resolve(),
        };

        const gimme = 'gimme';
        const add = 'add';

        //get image from collection starts with gimme
        if (instruction.slice(0, gimme.length) === gimme) {
            instruction = instruction.slice(gimme.length).trim();

            //may say 'gimme a' or just 'gimme'
            //slice of 'a'
            instruction.trim().slice(0, 1) === 'a' &&
                (instruction = instruction.trim().slice(1));

            const imageCollection = instruction.trim();

            await postFromImageCollection({
                imageCollection,
                page,
                postId,
                threadId,
            });
        } else if (instruction.slice(0, add.length) === add) {
            //request to add image to imaegCollection starts with 'add'
            instruction = instruction.slice(add.length).trim();

            //may say 'add to' or just 'add'
            //slice off 'to'
            instruction.trim().slice(0, 2) === 'to' &&
                (instruction = instruction.trim().slice(2));

            const imageCollection = instruction.trim();

            //addToImageCollection(instruction);
        } else {
            //invoke handleBody with the body of the post
            await (
                handleBody[instruction] ||
                //maybe they added a period, or exclamation point
                handleBody[instruction.slice(0, -1)] ||
                //if neither of the first two is found, default
                handleBody['default']
            )();
        }

        //if there are multiple instructions,
        //wait 10 seconds for the forums rate limiter
        if (instructions.length > 1)
            await setTimeout(async () => Promise.resolve(), 10000);
    }
};

export default handlePosts;
