"use strict";

const Adapter = require('../lib/Adapter');

const pattern = /cnbeta\.com\/backend\.php/;
const ADAPTER_NAME = 'CNBeta List';

const handle = (url, $) => {
    let res = {
        news : [],
    };

    $('item').each((index, item) => {
        let _news = $(item);

        const props = ['title', 'link', 'description', 'author', 'source', 'pubDate', 'guid'];
        const props_link = ['link', 'source'];
        const info = {};

        props.map(prop => info[prop] = _news.find(prop).text().trim());
        props_link.map(prop => info[prop] = _news.find(prop)[0].next.data.trim());

        res.news.push(info);
    });

    return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
