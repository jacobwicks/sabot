import fetch from 'node-fetch';
import { apiKeys } from '../config.json';

//gets a random image from an imgur album
const getRandomImageFromCollection = async (albumHash: string) => {
    const imgurGetAlbumUrl = `https://api.imgur.com/3/album/${albumHash}`;
    const { clientId } = apiKeys.imgur;

    const response = await fetch(imgurGetAlbumUrl, {
        method: 'GET',
        headers: {
            Authorization: `Client-ID ${clientId}`,
        },
    });

    const images = (await response.json()).data?.images;

    const getRandomImage = (): string =>
        images[Math.floor(Math.random() * images.length)];

    return images && getRandomImage().link;
};

export default getRandomImageFromCollection;
