"use strict";

const path = require('path');

const Adapter = require('../lib/Adapter');

const pattern = /www\.meitulu\.com\/item/;
const ADAPTER_NAME = 'Meitulu Item';

const handle = (url, $) => {
    let res;

    let id = path.basename(url, '.html').split('_')[0];
    let title = $('title').text().replace('/', '-');
    let images = [];

    let max = title.match(/\d+P]/g);
    max = max[0].split('P')[0];
    max = parseInt(max);

    let base = `https://mtl.ttsqgs.com/images/img/${id}/`;

    for (let i = 1; i <= max; i++) {
        images.push(base + i + '.jpg');
    }

    res = {
        id,
        title,
        max,
        images,
    }

    return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
