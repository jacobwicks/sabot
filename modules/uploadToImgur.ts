import fetch from 'node-fetch';
import FormData from 'form-data';
import { apiKeys } from '../config.json';

//var fs = require('fs');

//uploads to imgur anonymously
const uploadToImgur = async (imageFile: Buffer) => {
    const imgurUploadUrl = 'https://api.imgur.com/3/image';
    const { clientId, clientSecret } = apiKeys.imgur;

    //const imageFile = 'wider2.jpg';

    const formData = new FormData();
    formData.append('image', imageFile);
    //read from disk
    //formData.append('image', fs.createReadStream(imageFile));

    const response = await fetch(imgurUploadUrl, {
        //mode: 'cors',
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${clientId}`,
        },
        body: formData,
    });

    //response.json === { data { link: string }, success, status}
    const json = await response.json();
    const link: string | undefined = json?.data?.link;

    return link;
};

export default uploadToImgur;
