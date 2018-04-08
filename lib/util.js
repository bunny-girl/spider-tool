/**
 * Created by Edel on 2018/4/8.
 */

"use strict";

exports.removeFromArray = (arr, item) => {
	let res = [];
	for(let obj of arr){
		if(item !== obj){
			res.push(item);
		}
	}
	return res;
};