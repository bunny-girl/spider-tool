/**
 * Created by Edel on 2018/4/7.
 */
"use strict";

const Query = require('../lib/Query');

Query
	.deal('http://www.atugu.com/pics/show/23026')
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	});