/**
 * Created by Edel on 2018/4/7.
 */

const rp = require('request-promise-native');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');

let adapters = fs.readdirSync(path.join(__dirname, '../adapter')).map(adapter => require('../adapter/' + adapter));

const check = uri => adapters.find(adapter => {
    return adapter.pattern.test(uri)
});

const getPatternType = url => {
    return (check(url) || {name: null}).name;
};

const deal = async (uri, headers = {}, encoding) => {
    let currentAdapter = check(uri);
    let finalPromise = null;

    let ifTransform = !(currentAdapter && ['Github Trending'].includes(currentAdapter.pattern));

    let options = {
        uri,
        headers,
        transform: function (body) {
            return ifTransform ? cheerio.load(body) : body;
        }
    };

    try {
        if (currentAdapter) {
            console.log(`[ . ] : Found adapter [${currentAdapter.name}]. Will try to analyse.`);
            let $ = '';
            if (encoding) {
                let res = await originalRequest(uri, headers, encoding);
                $ = cheerio.load(res);
            } else {
                $ = await rp(options);
            }
            finalPromise = currentAdapter.handle(uri, $);
        } else {
            console.log('[ X ] : Didn\'t find any adapter for this.');
            finalPromise = await rp(options)
        }
    } catch (e) {
        console.log('----');
        console.log(e.message);
    }

    return finalPromise;
};

const originalRequest = (url, headers, encoding) => {
    let option = {
        url,
        timeout: 50000,
        headers,
    };
    return new Promise((resolve, reject) => {
        console.log(`[ . ] : Trying to query [${url}]`);
        request(option)
            .pipe(iconv.decodeStream(encoding))
            .collect(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    });
};

module.exports = {
    deal,
    getPatternType,
};
