/**
 * Created by Edel on 2018/4/7.
 */

const rp = require('request-promise-native');
const cheerio = require('cheerio');

const Atugu = require('../adapter/atugu');
const JAVLib_new_release = require('../adapter/javlib.newrelease');

let adapters = [Atugu, JAVLib_new_release];

const check = uri => {
	return adapters.find(adapter => {
		return adapter.pattern.test(uri)
	});
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

const deal = async (uri, headers = {}) => {
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
			let $ = await rp(options);
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

module.exports = {
	query,
	deal,
};
