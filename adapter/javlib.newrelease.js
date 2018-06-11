"use strict";
const URL = require('url');

const pattern = /vl_newrelease\.php/;

const handle = (url, $) => {
	console.log(`Analyzing ${url}`);

	let res = {
		url,
		items: [],
		next: URL.resolve(url, $('.page.next').attr('href')),
	};

	$('div.video').each((index, video) => {
		let link = $(video).find('a').eq(0);
		let imgBlock = link.find('img').eq(0);
		let codeBlock = link.find('div').eq(0);
		let obj = {
			title: link.attr('title'),
			link: URL.resolve(url, link.attr('href')),
			image: imgBlock.attr('src'),
			id: $(video).attr('id'),
			code: codeBlock.text(),
		};

		res.items.push(obj);
	});

	return res;
};

module.exports = {
	name: 'JAV Lib New Release',
	pattern,
	handle,
};