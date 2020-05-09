//const https = require('https');
import https from 'https';

https.get('https://api.thecatapi.com/v1/images/search', (res) => {
    var str = '';
    console.log('Response is ' + res.statusCode);

    res.on('data', function (chunk) {
        str += chunk;
    });

    res.on('end', function () {
        const json = JSON.parse(str)[0].url;

        console.log(json);
    });
});
