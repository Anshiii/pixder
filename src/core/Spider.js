/**
 * Created by Anshi on 2017/7/19.
 */
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const userConfig = require('../../config/config');


/*interface Spider{
 dom() //实例才有的dom，url，headers
 run()


 }*/

//@params
module.exports = class Spider{
  constructor(option) {
	this.option = option || {
		  headers: {
			'User-Agent': userConfig.User_Agent,
			'Cookie': userConfig.cookie
		  }
		};
  }

  async getDom(uri) {
	await fetch(uri, this.option)
	.then(res => res.text())
	.then(body => cheerio.load(body))
	.catch(err => err)
  }
}