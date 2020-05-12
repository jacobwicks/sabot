const example = 'https://fi.somethingawful.com/images/smilies/confused.gif';
const example2 = 'https://fi.somethingawful.com/images/smilies/frown.gif';

const images = [
    example,
    example2,
    'https://fi.somethingawful.com/safs/smilies/1/8/same.001.gif',
    'https://fi.somethingawful.com/safs/smilies/1/8/same.001.gif',
    'https://i.imgur.com/1zNlH6L.jpg',
    'https://fi.somethingawful.com/safs/smilies/1/8/same.001.gif',
    'https://fi.somethingawful.com/safs/smilies/1/8/same.001.gif',
];

const smiley = 'https://fi.somethingawful.com/safs/smilies';
const smiley2 = 'https://fi.somethingawful.com/images/smilies';

const isSmiley = (img) =>
    img.slice(0, 42) === smiley || img.slice(0, 44) === smiley2;

const image = images.find((img) => !isSmiley(img));

console.log(image);
