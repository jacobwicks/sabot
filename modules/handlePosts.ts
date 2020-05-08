import { Page } from 'puppeteer';
import { Post } from '../types';
const postTrump = ({ page, postId }: { page: Page; postId: string }) => {};

const imageRedder = ({
    image,
    page,
    postId,
}: {
    image: string;
    page: Page;
    postId: string;
}) => {};

const imageWider = ({
    image,
    page,
    postId,
}: {
    image: string;
    page: Page;
    postId: string;
}) => {};

const postCat = ({ page, postId }: { page: Page; postId: string }) => {};

//takes an array of posts, handles them
const handlePosts = ({ page, posts }: { page: Page; posts: Post[] }) => {
    posts.forEach(async (post, index) => {
        //get the properties of the post
        const { author, body, id: postId, image } = post;

        console.log(`${index}: id ${postId}, written by ${author}`, image);

        //if a user posts valid instructions as the body of their post
        //then the corresponding action will be taken
        const handleBody: { [key: string]: () => void } = {
            //posts a random picture of a cat
            //https://thecatapi.com/
            kittycat: () => postCat({ page, postId }),

            //posts a misspelling of trump
            'gimme a trump': () => postTrump({ page, postId }),

            //reddens the first image in the post
            redder: () => !!image && imageRedder({ image, page, postId }),

            //widens the first image in the post
            wider: () => !!image && imageWider({ image, page, postId }),

            //no instruction received
            default: () => console.log('no instruction'),
        };

        //invoke handleBody with the body of the post
        (
            handleBody[body.toLowerCase()] ||
            //maybe they added a period, or exclamation point
            handleBody[body.toLowerCase().slice(0, -1)] ||
            //if neither of the first two is found, default
            handleBody['default']
        )();
    });
};

export default handlePosts;
