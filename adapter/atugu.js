/**
 * Created by Edel on 2018/4/7.
 */
"use strict";

const Query = require('../lib/Query'),
	Spider = require('../lib/Spider'),
	Downloader = require('../lib/Downloader'),
	fs = require('fs'),
	os = require('os'),
	util = require('../lib/util');

require('../lib/util');

class Atugu extends Spider {
	constructor() {
		super('atugu');
		this.getConf();
	}

	getImagesByConf() {
		return Promise.all(
			this.conf.pages.map(page => Atugu.getImages(page))
		);
	}

	async downloadImagesByConf(dist = `${os.homedir()}/data/atugu/`) {
		let data = await this.getImagesByConf();

		for (let res of data) {
			console.log(`Downloading ${res.url}.`);
			await Downloader.downByArray(res.pics.large, `${dist}${res.title}/`);
			console.log(`${res.title} of ${res.url} finished downloading`);
			this.conf.pages = util.removeFromArray(this.conf.pages, res.url);
			console.log(`${this.conf.pages}`);
		}

		this.saveConf();
	}

	static getImages(url) {
		return new Promise((resolve, reject) => {
			let q = new Query(url);

			q.cheerio((err, $) => {
				if (err) {
					reject(err);
				}

				console.log(`Analyzing ${url}`);

				let res = {
					title: '',
					pics: {
						medium: [],
						large: []
					},
					url
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

				resolve(res);
			})
		});

	};
}

module.exports = Atugu;