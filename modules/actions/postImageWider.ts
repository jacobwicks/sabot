import { widen } from '../manipulateImage';
import makePost from './makePost';
import log from '../log';
import { respondToPostProps } from '../../types';
import uploadToImgur from '../uploadToImgur';

interface PostImageWiderProps extends respondToPostProps {
    //the url of the image to be widened
    image: string;
}

//widens an image, uploads it to imgur, and posts the link
const postImageWider = async ({
    image,
    page,
    postId,
    threadId,
}: PostImageWiderProps) => {
    //widen the image
    const imageBuffer = await widen(image);

    //post the image anonymously to imgur
    const imageUrl = await uploadToImgur(imageBuffer);

    //generate the postcontent string by wrapping the cat url in bbCode img tags
    const postContent = `[img]${imageUrl}[/img]`;

    try {
        await makePost({
            postContent,
            page,
            postId,
            threadId,
        });
    } catch (err) {
        //if something goes wrong, then log it!
        log('postCat failed', { page, postId, threadId }, err);
    }
};

export default postImageWider;
