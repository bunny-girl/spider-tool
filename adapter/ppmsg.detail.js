"use strict";

const pattern = /ppmsg/;
const ADAPTER_NAME = 'PPMSG Detail';

const handle = (url, $) => {
	console.log(`Analyzing ${url}`);

	let res = {
		adapterType : ADAPTER_NAME,
		title: '',
		pics: [],
		url,
		next : '',
	};

	res.title = $('.lm .left').text();

	let imgArr = $('ul.file img');

	res.next = $('ul.image a').last().attr('href');

	imgArr.each((index, img) => {
		res.pics.push($(img).attr('src'));
	});

	return res;
};

module.exports = {
	name : ADAPTER_NAME,
	pattern,
	handle,
};