"use strict";
const url = require('url');

const pattern = /javlibrary\.com\/cn\/\?v=/;
const ADAPTER_NAME = 'JAV Lib Detail';

const handle = (link, $) => {
	console.log(`Analyzing ${link}`);

	const getPlainVal = str => ($(`#video_${str} .text`).eq(0).text())

	const getLinkVal = str => {
		let node = $(`#video_${str} .text a`).eq(0);
		return {
			text : node.text(),
			link : node.attr('href'),
		}
	};

	let res = {
		adapterType : ADAPTER_NAME,
		url: link,
		title: $("#video_title a").eq(0).text(),
		code: getPlainVal('id') || '',
		link,
		image: $('#video_jacket_img').attr('src'),
		thumbnail: '',
		id: new URL(link).searchParams.get('v'),
		publishTime: new Date(getPlainVal('date')) || null,
		duration: parseInt(getPlainVal('length')) || 0,
		director: getLinkVal('director').text,
		directorId: (getLinkVal('director').link || '').replace('vl_director.php?d=', ''),
		company: getLinkVal('maker').text,
		companyId: (getLinkVal('maker').link || '').replace('vl_maker.php?m=', ''),
		publisher: getLinkVal('label').text,
		publisherId: (getLinkVal('label').link || '').replace('vl_label.php?l=', ''),
		vote: parseInt($(`#video_review .text input[checked='checked']`).eq(0).val()) || 0,
		tags: [],
		actors: [],
	};

	let tags = $("#video_genres .genre");
	tags.each((index, tag) => {
		let link = $(tag).find('a').eq(0);
		res.tags.push({
			name : link.text(),
			id : (link.attr('href') || '').replace('vl_genre.php?g=', ''),
		})
	});

	let actors = $("#video_cast .cast");
	actors.each((index, actor) => {
		let link = $(actor).find('a').eq(0);
		res.actors.push({
			name : link.text(),
			id : (link.attr('href') || '').replace('vl_star.php?s=', ''),
		})
	});

	return res;
};

module.exports = {
	name: ADAPTER_NAME,
	pattern,
	handle,
};