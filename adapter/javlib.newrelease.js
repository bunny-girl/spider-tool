"use strict";
const URL = require('url');

const pattern = /vl_newrelease\.php/;
const ADAPTER_NAME = 'JAV Lib New Release';

const handle = (url, $) => {
	console.log(`Analyzing ${url}`);

	let res = {
		adapterType : ADAPTER_NAME,
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
	name: ADAPTER_NAME,
	pattern,
	handle,
};