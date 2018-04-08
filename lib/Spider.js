/**
 * Created by Edel on 2018/4/8.
 */

"use strict";
const fs = require('fs'),
	yaml = require('js-yaml'),
	os = require('os');

class Spider {
	constructor(name) {
		this.name = name;
		this.conf = null;
		this.confPath = `${os.homedir()}/data/${this.name}/conf.yml`;
	}

	getConf(confPath = this.confPath) {
		this.conf = yaml.safeLoad(fs.readFileSync(confPath, 'utf-8'));
	}

	saveConf(confPath = this.confPath){
		fs.writeFileSync(confPath, yaml.safeDump(this.conf));
	}
}

module.exports = Spider;