/**
 * Created by Edel on 2018/4/7.
 */

const rp = require('request-promise-native'),
	request = require('request'),
	cheerio = require('cheerio');

class Query {
	constructor(url, option = {}) {
		this.url = url;
		this.option = option;
	}

	query(cb) {
		// request(url, option)
	}

	promise() {
		return rp(url)
	}

	cheerio(cb) {
		let options = {
			uri: this.url,
			transform: function (body) {
				return cheerio.load(body);
			}
		};

		rp(options)
			.then($ => {cb(null, $)})
			.catch(err => {cb(err)});
	}
}

module.exports = Query;