const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const screamUrl = 'http://www.w3schools.com/tags/img_the_scream.jpg';

const getWiderBy = () => 1.3 + Number(Math.random().toFixed(2));

const widen = async () => {
    const widerBy = getWiderBy();
    const image = await loadImage(screamUrl);
    const canvas = createCanvas(image.width * widerBy, image.height);
    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const buf = canvas.toBuffer();
    fs.writeFileSync('wider2.jpg', buf);
};

widen();
