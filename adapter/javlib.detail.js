"use strict";
const URL = require('url');

const pattern = /javlibrary\.com\/cn\/\?v=/;

const handle = (url, $) => {
	console.log(`Analyzing ${url}`);

	let res = {
		url,
		title: '',
		code: '',
		link: '',
		image: '',
		thumbnail: '',
		id: '',
		publishTime: '',
		duration: '',
		director: '',
		directorId: '',
		company: '',
		companyId: '',
		publisher: '',
		publisherId: '',
		vote: '',
		tag: [],
		actor: [],
	};

	let info = $('div#vidoe_info');

	console.log(info.find('#video_id td:eq(2)').text());

	// $('div.video').each((index, video) => {
	// 	let link = $(video).find('a').eq(0);
	// 	let imgBlock = link.find('img').eq(0);
	// 	let codeBlock = link.find('div').eq(0);
	// 	let obj = {
	// 		title: link.attr('title'),
	// 		link: URL.resolve(url, link.attr('href')),
	// 		image: imgBlock.attr('src'),
	// 		id: $(video).attr('id'),
	// 		code: codeBlock.text(),
	// 	};
	//
	// 	res.items.push(obj);
	// });

	return res;
};

module.exports = {
	name: 'JAV Lib Detail',
	pattern,
	handle,
};