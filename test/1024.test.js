/**
 * Created by Edel on 2018/4/8.
 */
"use strict";

const CL = require('../adapter/1024');

CL.getLatestURL().then(
	v => {
		console.log(v);
	}
);