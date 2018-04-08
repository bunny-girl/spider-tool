/**
 * Created by Edel on 2018/4/7.
 */

const download = require('download');

class Downloader {
	constructor(){}

	static down(url, dist){
		return download(url, dist);
	}

	static downByArray(arr, dist){
		return Promise.all(arr.map(item => download(item, dist)));
	}
}

module.exports = Downloader;