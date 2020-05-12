import fetch from 'node-fetch';
import { apiKeys } from '../config.json';

//get the consumer key and secret from config.json
const { twitter } = apiKeys;

//encode the key and secret
const rfcKey = encodeURI(twitter.consumerKey);
const rfcSecret = encodeURI(twitter.consumerSecret);

//make the bearer token credentials string from the encoded key and secret
const bearerTokenCredentials = `${rfcKey}:${rfcSecret}`;

//encode the token credentials to base64
const base64BearerTokenCredentials = Buffer.from(
    bearerTokenCredentials
).toString('base64');

//the options object for the fetch request
const options = {
    headers: {
        //gzip indicates compressed data
        accept: 'gzip',

        //the base64 encoded credentials
        Authorization: 'Basic ' + base64BearerTokenCredentials,

        'content-type': 'application/x-www-form-urlencoded',
    },

    //it's a post request
    method: 'POST',

    //tells OAuth you are asking for your own app's credentials
    //not credentials on behalf of a user of your app
    body: 'grant_type=client_credentials',
};

const getTwitterAuth2 = async () => {
    //make the fetch request to the twitter api endpoint
    const response = await fetch(
        'https://api.twitter.com/oauth2/token',
        options
    );

    //the json method on the response object is async
    const bearerToken = await response.json();

    //now you've got the bearerToken {
    //"token_type": "bearer",
    //"access_token": "string goes here"
    //}
    return bearerToken;
};

export default getTwitterAuth2;
