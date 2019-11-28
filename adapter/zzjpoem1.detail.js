"use strict";

const Adapter = require('../lib/Adapter');
const URL = require('url').URL;

const pattern = /viewoneshi/;
const ADAPTER_NAME = 'Poem Detail';

const handle = (url, $) => {
    const urlObj = new URL(url);
    const selector = 'center>table>tbody>tr';
    const getData = n => $(selector).eq(n).text().replace(/\n/g, '').replace(/\t/g, '').replace(/\s{4,}/g, '')
    let res = {
        chapter: urlObj.searchParams.get('js'),
        no: urlObj.searchParams.get('ns'),
        title: getData(2),
        author: getData(3),
        content: getData(4),
    };

    return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
