"use strict";

const Adapter = require('../lib/Adapter');
const {toNumber} = require('../lib/util');

const pattern = /github\.com\/trending/;
const ADAPTER_NAME = 'GitHub Trending';

const handle = (url, $) => {
    let res = {
        repos : [],
        lang : ''
    };

    $('.Box-row').each((index, repo) => {
        let _repo = $(repo);
        let name = _repo.find('h1 a').attr('href').replace(/^\//, '');

        const info = {
            name,
            url: `https://github.com/${name}`,
            description: _repo.find('p').text().trim(),
            language: _repo.find('[itemprop=programmingLanguage]').text().trim(),
            starsAdded: toNumber(_repo.find(`.float-sm-right`)),
            stars: toNumber(_repo.find(`[href="/${name}/stargazers"]`)),
            forks: toNumber(_repo.find(`[href="/${name}/network/members"]`)),
        };

        res.repos.push(info);
    });

    return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
