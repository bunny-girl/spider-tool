/**
 * Created by Edel on 2018/4/7.
 */

const rp = require('request-promise-native');
const request =require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const Atugu = require('../adapter/atugu');
const JAVLib_new_release = require('../adapter/javlib.newrelease');
const JAVLib_detail = require('../adapter/javlib.detail');
const Ppmsg_detail = require('../adapter/ppmsg.detail');

let adapters = [Atugu, JAVLib_new_release, JAVLib_detail, Ppmsg_detail];

const check = uri => {
	return adapters.find(adapter => {
		return adapter.pattern.test(uri)
	});
};

const getPatternType = url => {
	return (check(url) || {name : null}).name;
};

const query = (uri, headers = {}) => {
	let currentAdapter = check(uri);

	if (currentAdapter) {
	} else {
		return rp({
			uri,
			headers,
		});
	}
};

const deal = async (uri, headers = {}, encoding) => {
	let currentAdapter = check(uri);
	let finalPromise = null;

	let options = {
		uri,
		headers,
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	try {
		if (currentAdapter) {
			console.log(`Found adapter [${currentAdapter.name}]. Will try to analyse.`);
			let $ = '';
			if(encoding){
				let res = await originalRequest(uri, headers, encoding);
				$ = cheerio.load(res);
			}else{
				$ = await rp(options);
			}
			finalPromise = currentAdapter.handle(uri, $);
		} else {
			console.log('Didn\'t find any adapter for this.');
			finalPromise = await rp(options)
		}
	}
	catch (e) {
		console.log('----');
		console.log(e.message);
	}

	return finalPromise;
};

const originalRequest = (url, headers, encoding) => {
	let option = {
		url,
		timeout: 50000,
		headers,
	};
	return new Promise((resolve, reject) => {
		request(option)
			.pipe(iconv.decodeStream(encoding))
			.collect(function (err, data) {
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			})
	});
};

module.exports = {
	query,
	deal,
	getPatternType,
};
