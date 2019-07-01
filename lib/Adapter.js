"use strict";

module.exports = class Adapter {
    constructor(name, pattern, handler) {
        this.name = name;
        this.pattern = pattern;
        this.handler = handler;
    }

    handle(url, $){
        console.log(`[ . ] : Analyzing ${url}`);

        let res = this.handler.call(this, url, $);

        res['adapter'] = this.name;
        res['url'] = url;

        return res;
    }
};
