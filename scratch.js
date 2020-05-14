const { imageCollections } = require('./config.json');

const add = 'add';
const gimme = 'gimme';
const instruction = 'gimme a trump';

const instructions = [
    'gimme a trump',
    'add to snoo',
    'add to schnorkles',
    'gimme a schnorkles',
    'gimme a snoo',
    'add to snoo',
    'add snoo',
    'add schnorkles',
    'gimme trump',
    'gimme doodoo',
    'add to peeeee',
];

/*
gimme ${imageCollection}
gimme a ${imageCollection}

add to ${imageCollection}
add ${imageCollection}

1. recognize gimme as a request for image from imageCollection

*/

const addToImageCollection = (instruction) =>
    Object.keys(imageCollections).includes(instruction)
        ? console.log(`valid instruction`)
        : console.log(`invalid`, instruction);

const getFromImageCollection = (instruction) => {
    Object.keys(imageCollections).includes(instruction)
        ? console.log(`valid instruction`)
        : console.log(`invalid`, instruction);
};

const processInstruction = (instruction) => {
    if (instruction.slice(0, gimme.length) === gimme) {
        instruction = instruction.slice(gimme.length).trim();

        instruction.trim().slice(0, 1) === 'a' &&
            (instruction = instruction.trim().slice(1));

        instruction = instruction.trim();

        getFromImageCollection(instruction);
    } else if (instruction.slice(0, add.length) === add) {
        instruction = instruction.slice(add.length).trim();

        instruction.trim().slice(0, 2) === 'to' &&
            (instruction = instruction.trim().slice(2));

        instruction = instruction.trim();

        addToImageCollection(instruction);
    } else {
        //console.log(`standard`);
    }
};

instructions.forEach((instruction) => processInstruction(instruction));
