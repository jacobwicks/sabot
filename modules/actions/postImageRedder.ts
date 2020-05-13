import { redden } from '../manipulateImage';
import makePost from './makePost';
import log from '../log';
import { PostManipulatedImageProps } from '../../types';
import uploadToImgur from '../uploadToImgur';

//widens an image, uploads it to imgur, and posts the link
const postImageRedder = async ({
    image,
    page,
    postId,
    threadId,
}: PostManipulatedImageProps) => {
    //widen the image
    const imageBuffer = await redden(image);

    if (imageBuffer) {
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
            log('imageRedder failed', { page, postId, threadId }, err);
        }
    } else {
        log('imageRedder failed- no imageBuffer', { page, postId, threadId });
    }
};

export default postImageRedder;
