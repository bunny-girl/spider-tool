/**
 * Created by Edel on 2018/4/7.
 */

const download = require('download');
const request = require('request');
const path = require('path');
const fs = require('fs');

class Downloader {
	constructor(){}

	static down(url, dist, options){
		// return download(url, dist, options);
		let filename = path.basename(url);
		// console.log({url, headers : options});
		request({url, headers : options}).pipe(fs.createWriteStream(`${dist}${filename}`));
	}

	static downByArray(arr, dist, options){
		if(!fs.existsSync(dist)){
			fs.mkdirSync(dist);
		}
		arr.map(item => this.down(item, dist, options))
		// return Promise.all(arr.map(item => download(item, dist, options)));
	}
}

module.exports = Downloader;