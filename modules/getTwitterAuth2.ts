import fetch from 'node-fetch';
import { apiKeys } from '../config.json';
const { twitter } = apiKeys;

const rawUrlEncode = (str: string) => {
    //           note 1: This reflects PHP 5.3/6.0+ behavior
    //           note 1: Please be aware that this function expects \
    //           note 1: to encode into UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: rawurlencode('Kevin van Zonneveld!')
    //        returns 1: 'Kevin%20van%20Zonneveld%21'
    //        example 2: rawurlencode('https://kvz.io/')
    //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
    //        example 3: rawurlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
    //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'

    str = str + '';

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
    // but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
};

const rfcKey = rawUrlEncode(twitter.consumerKey);
const rfcSecret = rawUrlEncode(twitter.consumerSecret);
const bearerTokenCredentials = `${rfcKey}:${rfcSecret}`;
const base64BearerTokenCredentials = Buffer.from(
    bearerTokenCredentials
).toString('base64');

const options = {
    headers: {
        accept: 'gzip',
        Authorization: 'Basic ' + base64BearerTokenCredentials,
        'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: 'grant_type=client_credentials',
};

const getTwitterToken = async () => {
    const response = await fetch(
        'https://api.twitter.com/oauth2/token',
        options
    );
    const bearerToken = await response.json();
    return bearerToken;
};
