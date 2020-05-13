import { createCanvas, loadImage } from 'canvas';

//returns number between 100 and 255
const getRedderBy = () => Math.floor(Math.random() * (255 - 100 + 1) + 100);

export const redden = async (imageUrl: string) => {
    //get the amount to redden the image by
    const redFaction = getRedderBy();

    //load image from provided url
    const image = await loadImage(imageUrl);

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

    for (
        //start at 0, go to the length of the pixel data
        let redPixel = 0, dataLength = originalPixels.data.length;
        //once we reach the end of the data, stop
        redPixel < dataLength;
        //skip forward by 4 pixels
        redPixel += 4
    ) {
        // transparent pixel = 0.
        //If it's not a transparent pixel, then increase redness
        if (currentPixels.data[redPixel + 3] > 0) {
            //divide original red channel value by 255
            //then multiply by 255 + redFaction variable, which is 100-255
            currentPixels.data[redPixel] =
                (originalPixels.data[redPixel] / 255) * (255 + redFaction);
        }
    }

    //load reddened pixels into context
    context.putImageData(currentPixels, 0, 0);

    //create buffer from cotext
    const redImageBuffer = canvas.toBuffer();

    return redImageBuffer;
};

//returns 1.3 - ~ 2.3
const getWiderBy = () => 1.3 + Number(Math.random().toFixed(2));

//widens the image, returns the image data as Buffer
export const widen = async (imageUrl: string) => {
    //generate how much to widen the image
    const widerBy = getWiderBy();

    //load the image from the provided url
    const image = await loadImage(imageUrl);

    //multiply image width by widerBy variable to set canvas width
    const canvas = createCanvas(image.width * widerBy, image.height);
    const context = canvas.getContext('2d');

    //draw the image onto the canvas, this will stretch it
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    //create
    const widerImageBuffer = canvas.toBuffer();

    return widerImageBuffer;
};
