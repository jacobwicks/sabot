import fetch from 'node-fetch';
const { apiKeys } = require('./config.json');
const { twitter } = apiKeys;

const bearerToken = twitter.bearerToken.access_token;
const screenName = 'realdonaldtrump';
const url =
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=';

const getUrl = `${url}${screenName}&count=10`;

const options = {
    headers: {
        Authorization: `Bearer ${bearerToken}`,
    },
};

const getFirstOriginalTweet = (tweets) =>
    tweets.find((tweet) => !tweet.retweeted);

const getFirstRetweet = (tweets) =>
    tweets.find((tweet) => tweet.retweeted === true);

const tweets = await (await fetch(getUrl, options)).json();

const retweets = tweets.filter((tweet) => tweet.retweeted === true);

const firstOriginalTweet = getFirstOriginalTweet(tweets);

const firstRetweet = getFirstRetweet(tweets);

const logTweet = (tweet) => {
    const tweetId = tweet.id_str;
    const author = tweet.user.name;
    const retweet = tweet.retweeted;
    console.log(tweetId, author, retweet);
};

const wtf = () => {
    console.log(`no retweets found`);
    tweets.forEach((tweet, index) => {
        const tweetId = tweet.id_str;
        const author = tweet.user.name;
        const retweet = tweet.retweeted;
        console.log(`tweet ${index}: ${tweetId}, ${author}, ${retweet}`);
    });
};

logTweet(firstOriginalTweet);
tweets.forEach((tweet) => logTweet(tweet));

//console.log(tweets[0]);
// tweets.forEach((tweet) => {
//     const tweetId = tweet.id_str;
//     const author = tweet.user.name;
//     console.log(tweetId, author);
// });

//https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2

//const post = `[url]https://twitter.com/${screenName}/status/${tweetId}[/url]`;

//console.log(post);
//[url]https://twitter.com/thedailybeast/status/1259956481702666241[/url]

//console.log(tweet);
