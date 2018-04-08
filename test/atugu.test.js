/**
 * Created by Edel on 2018/4/7.
 */
"use strict";

const Atugu = require('../adapter/atugu');


// new Atugu().downloadImagesByConf().then(v => {
// 	console.log('finished!');
// });

Atugu.getImages('http://www.atugu.com/pics/show/22283').then(
	v => {
		console.log(v);
	}
);