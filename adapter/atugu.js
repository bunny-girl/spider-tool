/**
 * Created by Edel on 2018/4/7.
 */
"use strict";

const pattern = /http:\/\/www\.atugu\.com\/pics\/show/;
const ADAPTER_NAME = 'Atugu Detail';

const handle = (url, $) => {
	console.log(`Analyzing ${url}`);

	let res = {
		adapterType : ADAPTER_NAME,
		title: '',
		thumbnails : [],
		pics: [],
		url,
		next : '',
	};

	res.title = $('strong', '#infoTitle.panel-heading.breakline').text();

	let linkArr = $('a', '#pic_show_list'),
		imgArr = $('img', "#pic_show_list");

	linkArr.each((index, link) => {
		res.pics.push($(link).attr('href'));
	});

	imgArr.each((index, img) => {
		res.thumbnails.push($(img).attr('src'));
	});

	return res;
};

module.exports = {
	name : ADAPTER_NAME,
	pattern,
	handle,
};

// 	async downloadImagesByConf(dist = `${os.homedir()}/data/atugu/`) {
// 		let data = await this.getImagesByConf();
//
// 		for (let res of data) {
// 			console.log(`Downloading ${res.url}.`);
// 			await Downloader.downByArray(res.pics.large, `${dist}${res.title}/`);
// 			console.log(`${res.title} of ${res.url} finished downloading`);
// 			this.conf.pages = util.removeFromArray(this.conf.pages, res.url);
// 			console.log(`${this.conf.pages}`);
// 		}
//
// 		this.saveConf();
// 	}
