"use strict";

const pattern = /josephyzhou\/github-trending/;
const ADAPTER_NAME = 'Github Trending';

const md = require('markdown-it')();
const cheerio = require('cheerio');

const handle = (url, body) => {
	console.log(`Analyzing ${url}`);

	let res = {
		adapterType : ADAPTER_NAME,
		date : '',
		data : [],
	};

	if(body && body.text()){
		let text = md.render(body.text());
		let $ = cheerio.load(text);

		let date = $("h3").first().text();
		res.date = new Date(date);

		let typeArr = $('h4').map(function(i, el){
			return $(this).text();
		}).get();

		$('ul').each(function(i, el){
			let tempRepos = [];
			let li = $(this).find('li');
			li.each(function(i, el){
				let text = $(this).text().split(':');
				text.shift();

				let link = $(this).children('a');
				let linkText = link.text();

				let obj = {
					desc : text.join(':'),
					author : linkText.split('/')[0],
					name : linkText.split('/')[1],
					link : link.attr('href')
				};

				tempRepos.push(obj);
			});

			res.data.push({
				type : typeArr[i],
				data : tempRepos,
			});
		});
	}

	return res;
};

module.exports = {
	name : ADAPTER_NAME,
	pattern,
	handle,
};