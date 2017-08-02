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
module.exports = class Spider {
  constructor(option) {
	this.option = {
	  headers: {
		'Cookie': userConfig.cookie
	  }
	};
  }

  getDom(uri) {

    console.log(uri);
	return fetch(uri, this.option)
	.then(res => {
	  return res.text()
	})
	.then(body => {
	  return cheerio.load(body)
	})
	.catch(err => err)
  }
}