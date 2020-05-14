import makePost from './makePost';
import log from '../log';
import { RespondToPostProps } from '../../types';
import getRandomImageFromCollection from '../getRandomImageFromCollection';
import addTyposToString, { defaultSettings } from '../typos/addTyposToString';

const {
    imageCollections,
}: { imageCollections: KeyValueObject } = require('../../config.json');

interface KeyValueObject {
    [key: string]: string;
}

const isValidImageCollection = (imageCollection: string) =>
    Object.keys(imageCollections).includes(imageCollection);

interface PostFromImageCollection extends RespondToPostProps {
    imageCollection: string;
}

const getTrump = () => {
    const inputString = 'Trump!';

    const settings = {
        ...defaultSettings,
        extraCharacters: 40,
        frequency: 35,
        missedCharacters: 25,
    };

    return addTyposToString({
        inputString,
        settings,
    });
};

const postFromImageCollection = async ({
    imageCollection,
    page,
    postId,
    threadId,
}: PostFromImageCollection) => {
    if (isValidImageCollection(imageCollection)) {
        const image = await getRandomImageFromCollection(
            imageCollections[imageCollection]
        );

        const getPostContent: KeyValueObject = {
            trump: `[img]${image}[/img]\n${getTrump()}`,
            default: `[img]${image}[/img]`,
        };

        const postContent =
            getPostContent[imageCollection] || getPostContent.default;

        try {
            await makePost({
                postContent,
                page,
                postId,
                threadId,
            });
        } catch (err) {
            //if something goes wrong, then log it!
            log(
                'postFromImageCollection failed',
                { page, postId, threadId },
                err
            );
        }
    } else
        log('postFromImageCollection Failed: bad collection', imageCollection);
};

export default postFromImageCollection;
