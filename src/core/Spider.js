/**
 * Created by Anshi on 2017/7/19.
 */
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const userConfig = require('../../config/config');
const EventEmitter = require('events');
const event = new EventEmitter();

/*interface Spider{
 dom() //实例才有的dom，url，headers
 run()


 }*/

//@params
class Spider {
  constructor(option) {
	this.option = {
	  headers: {
		'Cookie': userConfig.cookie
	  }
	};
	this.maxHttp = 10;
	this.currentHttp = 0;
	this.line = [];
  }

  eventPromise() {
    let _this = this;
	return new Promise(res => {
	  console.log('监听的:'+_this.line.push)
	  event.on("decrease", () => {
	    //判断减了多少次。

		//返回队列中第一个的Dom promise
		//获取队列中的第一个promise，手动resolve，返回dom promise
		res('ok')
	  })
	})
  }

  async getDom(uri) {
	let _this = this;
	if (this.currentHttp > this.maxHttp) {
	  //等待一会。
	  let pro = new Promise();
	  _this.line.push(_this.currentHttp);


	  await this.eventPromise();
	}
	console.log(`当前连接总数${this.currentHttp},即访问${uri}`);
	this.currentHttp++;
	return fetch(uri, this.option)
	.then(res => {
	  event.emit("decrease")
	  _this.currentHttp--; 

	  return res.text()
	})
	.then(body => {
	  return cheerio.load(body)
	})
	.catch(err => err)
  }

  getStream(uri, imgPage) {

	return fetch(uri, {
	  headers: {
		referer: imgPage
	  }
	})
	.then(res => {
	  res
	})
	.catch(err => err)
  }
}
module.exports = new Spider();