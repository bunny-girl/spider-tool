"use strict";

const Adapter = require('../lib/Adapter');
const {toNumber} = require('../lib/util');

const pattern = /yande\.re\/post\/show\/\d+/;
const ADAPTER_NAME = 'Yandere Post';

const handle = (url, $) => {
    let res = {
        id : '',
        tags : [],
        date : '',
        source : '',
        image : '',
        highres : '',
    };

    res.image = $('#image').attr('src');
    res.tags = $('#tag-sidebar li').map((i, el) => $(el).find('a').eq(1).text()).get();

    res.highres = $('#png').attr('href') || $('#highres').attr('href') || '';

    let status = $('#stats li');

    res.id = status.eq(0).text().split(': ')[1];
    res.date = status.eq(1).find('a').attr('title');
    res.source = status.eq(3).find('a').attr('href');

    return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
