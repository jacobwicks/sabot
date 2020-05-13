import fetch from 'node-fetch';
import FormData from 'form-data';
import { apiKeys } from '../config.json';

//uploads to imgur anonymously
const uploadToImgur = async (imageFile: Buffer) => {
    const imgurUploadUrl = 'https://api.imgur.com/3/image';
    const { clientId } = apiKeys.imgur;

    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(imgurUploadUrl, {
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${clientId}`,
        },
        body: formData,
    });

    //response.json === { data { link: string }, success, status}
    const json = await response.json();
    const link: string | undefined = json?.data?.link;

    //link to uploaded img
    return link;
};

export default uploadToImgur;
