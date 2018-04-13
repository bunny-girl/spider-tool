/**
 * Created by Edel on 2018/4/8.
 */
"use strict";

const Query = require('../lib/Query');

class CL {
	constructor(){}

	static getLatestURL () {
		return new Promise((resolve, reject) => {
			let q = new Query('http://piao.cf/');

			q.cheerio((err, $) => {
				if(err){
					console.log(err);
					reject(err);
				}

				resolve($("a").filter((i, el) => {
						return $(this).text() === '草榴社区'
					}).text() || "NULL");
			});
		});

	}
}

module.exports = CL;