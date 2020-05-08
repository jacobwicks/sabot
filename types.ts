//the relevant parts of a post scraped from the forums
//posts start as Element, but we grab these from them
export interface Post {
    //the name of the user that wrote the post
    author: string;

    //the body of the post, without other quoted posts inside it
    body: string;

    //the unique postId number
    id: string;

    //the img.src property
    image?: string;
}