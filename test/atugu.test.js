/**
 * Created by Edel on 2018/4/7.
 */
"use strict";

const atugu = require('../adapter/atugu'),
	Downloader = require('../lib/Downloader'),
	os = require('os');

let url = "http://www.atugu.com/pics/show/22084";

atugu.getImages(url, (err, res) => {
	if (err) {
		console.log(`Error : ${err}`);
		return;
	}

	Downloader.downByArray(res.pics.large, `${os.homedir()}/data/atugu/${res.title}/`).then(() => {
		console.log('done');
	}).catch(err => {
		console.log(err);
	});

});