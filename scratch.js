const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const screamUrl = 'http://www.w3schools.com/tags/img_the_scream.jpg';

const getWiderBy = () => 1.3 + Number(Math.random().toFixed(2));

const widen = async () => {
    const widerBy = getWiderBy();
    console.log(widerBy);
    const image = await loadImage(screamUrl);
    const canvas = createCanvas(image.width * widerBy, image.height);
    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const buf = canvas.toBuffer();
    fs.writeFileSync('wider2.jpg', buf);
};

widen();

//the options object for the fetch request
const options = {
    headers: {
        //gzip indicates compressed data
        accept: 'gzip',

        //the base64 encoded credentials
        Authorization: 'Basic ',

        'content-type': 'application/x-www-form-urlencoded',
    },

    //it's a post request
    method: 'POST',

    //tells OAuth you are asking for your own app's credentials
    //not credentials on behalf of a user of your app
    body: 'grant_type=client_credentials',
};

// curl --location --request POST 'https://api.imgur.com/3/image' \
// --header 'Authorization: Client-ID {{clientId}}' \
// --form 'image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
