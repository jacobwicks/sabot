import { Page } from 'puppeteer';
import { Post } from '../types';

//gets allthe posts from the current page
//returns them as an array of Post objects
//the functions are defined inside of Array.map
//because passing a function into page.evaluate involves modifying the page object
const getPosts = async (page: Page): Promise<Post[]> =>
    await page.evaluate(async () =>
        [...document.getElementsByClassName('post')].map((post) => {
            //get the author
            //getElementsByClassName returns Elements, not HTMLElement
            //cast to Any then Cast to array of HTMLElement
            const author = (<HTMLElement[]>(
                (<any>post.getElementsByClassName('author'))
            ))[0].innerText;

            //the post body container
            const postBody = (<HTMLElement[]>(
                (<any>post.getElementsByClassName('postbody'))
            ))[0];

            //we just want the text that the user posted, not the text that they quoted from other posts
            //so get post body text without text from child nodes
            //get an array of all the childNodes from the postBody
            const body = [...postBody.childNodes]
                //reduce it to a string
                .reduce(
                    (bodyText, currentText) =>
                        //only add the TEXT_NODEs to the accumulator
                        currentText.nodeType === Node.TEXT_NODE
                            ? (bodyText += currentText.nodeValue)
                            : bodyText,
                    '' //the bodyText starts as an empty string
                )
                //trim the whitespace
                .trim();

            //get the first image, if any
            //use querySelectorAll to get all images
            const images = [...postBody.querySelectorAll('img')].map(
                (img) => img.src
            );

            //ok, so, the smilies are stored in a lot of places
            //I think most are in url type 1 or 2
            //smiley url type 1  'https://fi.somethingawful.com/safs/smilies/1/8/same.001.gif'
            //smiley url type 2  'https://fi.somethingawful.com/images/smilies/confused.gif';
            //but then here's :whitewater:
            //https://i.somethingawful.com/u/garbageday/2013/avatars/whitewater.gif
            //maybe come back and figure all these out, but then again... maybe not
            const smiley = 'https://fi.somethingawful.com/safs/smilies';
            const smiley2 = 'https://fi.somethingawful.com/images/smilies';

            const isSmiley = (img: string) =>
                img.slice(0, 42) === smiley || img.slice(0, 44) === smiley2;

            //use .find to find the first image that isn't an SA smiley
            const image = images.find((img) => !isSmiley(img));

            //the postId
            const id = Number(post.id.slice(4, post.id.length));

            return {
                author,
                body,
                id,
                image,
            };
        })
    );

export default getPosts;
