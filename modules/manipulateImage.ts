import { createCanvas, loadImage } from 'canvas';

const getWiderBy = () => 1.3 + Number(Math.random().toFixed(2));

export const widen = async (url: string) => {
    //generate how much to widen the image
    const widerBy = getWiderBy();

    //load the image from the provided url
    const image = await loadImage(url);

    //multiply image width by widerBy variable to set canvas width
    const canvas = createCanvas(image.width * widerBy, image.height);
    const context = canvas.getContext('2d');

    //draw the image onto the canvas, this will stretch it
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    //create
    const widerImageBuffer = canvas.toBuffer();

    return widerImageBuffer;
    //save to disk
    //require('fs').writeFileSync('wider2.jpg', widerImageBuffer);
};
