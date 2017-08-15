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
	this.maxHttp = 5;
	this.currentHttp = 0;
	this.line = [];
	this.uriQueue = [];

	this.eventPromise();
  }

  eventPromise() {
	let _this = this;
	event.on("decrease", () => {
	  //添加任务。
	  if(_this.uriQueue.length>0){
		let uri = _this.uriQueue.shift();
		event.emit(uri, _this.fetchDom(uri));
	  }
	})
  }

  promiseUri(uri) {
	return new Promise(res => {
	  event.on(uri, promise => {
		res(promise)
	  })
	})
  }

  getDom(uri) {
	if (this.currentHttp >= this.maxHttp) {
	  this.uriQueue.push(uri);
	  return this.promiseUri(uri);
	} else {
	  return this.fetchDom(uri)
	}
  }


  fetchDom(uri) {
	let _this = this;
	this.currentHttp++;
	console.log(`当前连接总数${this.currentHttp}`);
	return fetch(uri, this.option)
	.then(res => {
	  return res.text()
	})
	.then(body => {
	  event.emit("decrease");
	  _this.currentHttp--;
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