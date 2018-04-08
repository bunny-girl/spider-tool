/**
 * Created by Edel on 2018/4/7.
 */
"use strict";

const Query = require('../lib/Query');

const getList = () => {};

const getImages = (url, cb) => {
	let q = new Query(url);

	q.cheerio((err, $) => {
		if(err){
			cb(err, null);
		}

		let res = {
			title : '',
			pics : {
				medium : [],
				large : []
			}
		};

		res.title = $('strong', '#infoTitle.panel-heading.breakline').text();

		let linkArr = $('a', '#pic_show_list'),
			imgArr = $('img', "#pic_show_list");

		linkArr.each((index, link) => {
			res.pics.large.push($(link).attr('href'));
		});

		imgArr.each((index, img) => {
			res.pics.medium.push($(img).attr('src'));
		});

		cb(err, res);
	})
};

exports.getImages = getImages;