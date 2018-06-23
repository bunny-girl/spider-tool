"use strict";

const pattern = /ppmsg/;

const handle = (url, $) => {
	console.log(`Analyzing ${url}`);

	let res = {
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
	name : 'PPMSG Detail',
	pattern,
	handle,
};