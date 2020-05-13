const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const screamUrl = 'http://www.w3schools.com/tags/img_the_scream.jpg';
const bushUrl = 'https://i.imgur.com/qSJvRFk.jpg';
const wideTrump = 'https://i.imgur.com/jYOjavk.png';

//returns number between 100 and 255
const getRedderBy = () => Math.floor(Math.random() * (255 - 100 + 1) + 100);

const redden = async () => {
    const redFaction = getRedderBy();

    //load image from provided url
    const image = await loadImage(wideTrump);

    //create the canvas object. Width and Height of original image
    const canvas = createCanvas(image.width, image.height);

    //2d context to manupulate image
    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const originalPixels = context.getImageData(
        0,
        0,
        image.width,
        image.height
    );
    const currentPixels = context.getImageData(0, 0, image.width, image.height);

    image.onload = null;

    if (!originalPixels) return; // Check if image has loaded

    for (var I = 0, L = originalPixels.data.length; I < L; I += 4) {
        // If it's not a transparent pixel
        if (currentPixels.data[I + 3] > 0) {
            //divide original red channel value by 255
            //then multiply by 255 + redFaction variable, which is 100-255
            currentPixels.data[I] =
                (originalPixels.data[I] / 255) * (255 + redFaction);
        }
    }
    context.putImageData(currentPixels, 0, 0);
    const redImageBuffer = canvas.toBuffer();
    fs.writeFileSync('red1.jpg', redImageBuffer);
};

redden();
