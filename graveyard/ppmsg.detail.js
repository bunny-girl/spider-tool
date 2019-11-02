"use strict";

const Adapter = require('../lib/Adapter');

const pattern = /ppmsg/;
const ADAPTER_NAME = 'PPMSG Detail';

const handle = (url, $) => {
	let res = {
		title: '',
		pics: [],
		thumbnails : [],
		next : '',
	};

	res.title = $('.lm .left').text();

	let imgArr = $('ul.file img');

	res.next = $('ul.image a').last().attr('href');

	imgArr.each((index, img) => {
		res.pics.push($(img).attr('src').replace('\n', ''));
	});

	res.thumbnails = res.pics;

	return res;
};

module.exports = new Adapter(ADAPTER_NAME, pattern, handle);
