//const https = require('https');
// import https from 'https';

// https.get('https://api.thecatapi.com/v1/images/search', (res) => {
//     var str = '';
//     console.log('Response is ' + res.statusCode);

//     res.on('data', function (chunk) {
//         str += chunk;
//     });

//     res.on('end', function () {
//         const json = JSON.parse(str)[0].url;

//         console.log(json);
//     });
// });
const fetch = require('node-fetch');
const { apiKeys } = require('./config.json');
const apiKey = apiKeys.catAPI;
const options = {
    headers: {
        'X-API-KEY': apiKey,
    },
};

(async () => {
    try {
        const url = (
            await (
                await fetch(
                    'https://api.thecatapi.com/v1/images/search',
                    options
                )
            ).json()
        )[0]?.url;

        console.log(url);
    } catch (err) {
        console.log(err);
    }
})();
