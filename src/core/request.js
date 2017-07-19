/**
 * Created by Anshi on 2017/7/19.
 */
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const userConfig = require('../../config/config');


//@params
module.exports = class Request {
  constructor(option) {
	this.option = option || {
		  headers: {
			'User-Agent': userConfig.User_Agent,
			'Cookie': userConfig.cookie
		  }
		};
  }

  getDom(uri) {
	let _this = this;
	return fetch(uri, this.option)
	.then(res => res.text())
	.then(body => cheerio.load(body))
	.catch(err => err)
  }

  getRes(uri) {
	let _this = this;
	return fetch(uri, this.option)
	.then(res => res)
	.catch(err => err)
  }

}