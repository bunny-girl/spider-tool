"use strict";

const Adapter = require('../lib/Adapter');

const pattern = /cnbeta\.com\/articles/;
const ADAPTER_NAME = 'CNBeta Detail';

const handle = (url, $) => {
    let res = {
        title : $('.title h1').text(),
        content : $('#artibody').text(),
    };

    return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
