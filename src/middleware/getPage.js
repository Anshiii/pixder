/**
 * Created by Anshi on 2017/7/18.
 */

const fetch = require('node-fetch');
const userConfig = require('./../../config/config.js');
const cheerio = require('cheerio');


let getPage = function (url) {
  return fetch(url, {
	headers: {
	  'User-Agent': userConfig.User_Agent,
	  'Cookie': userConfig.cookie
	}
  })
  .then(res => res.text())
  .then(body => body)
  .then(page => cheerio.load(page))
  .catch(err => err)
};
module.exports = getPage;