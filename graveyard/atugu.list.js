"use strict";

const pattern = /http:\/\/www\.atugu\.com\/pics\/list/;

const handle = (url, $) => {
	console.log(`Analyzing ${url}`);

	let res = {
		url,
		items,
		next,
	};

	return res;
};

module.exports = {
	name : 'Atugu List',
	pattern,
	handle,
};