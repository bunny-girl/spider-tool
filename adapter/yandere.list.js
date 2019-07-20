"use strict";

const $ = require('cheerio');

const Adapter = require('../lib/Adapter');
const {toNumber} = require('../lib/util');
const {URL} = require('url');

const pattern = /yande\.re\/post\?/;
const ADAPTER_NAME = 'Yandere List';

const handle = (url, $) => {
    let res = {
        posts : $('#post-list-posts li').map((i, el) => {
            return new URL($(el).find('a').eq(0).attr('href'), url).href
        }).get()
    };

    return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
