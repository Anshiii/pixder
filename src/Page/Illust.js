/**
 * Created by Anshi on 2017/7/21.
 */
/**
 * Created by Anshi on 2017/7/19.
 */

const Request = require('../core/Spider');
const {URL, URLSearchParams} = require('url');
const userConfig = require('../../config/config');
const fetch = require('node-fetch');

/*
 * illust https://www.pixiv.net/member_illust.php
 * */


module.exports = class Illust {
  //只拿图片origin地址，不拿具体图片。。。
  constructor(id, option, type) {
	this.id = id;
	this.option = option;
	this.type = type;
	this.baseUrl = userConfig.pageMap['illust'];
	this.request = new Request();
	this.info = {};
	this.imgPage = "";
	this.firstPage = "";
	/*this.headers = {
	 'User-Agent': userConfig.User_Agent,
	 'Cookie': userConfig.cookie
	 };*/
	this.uri = "";
	this.info = {};
  }

  getIllustUri() {
	let _this = this;
	return this.parseFirstPage().then(() => {
	  if (this.isOk()) {
		//继续
		return this.parseImgPage().then(() => _this)
	  } else {
		return process.nextTick(() => {
		  this.uri = "";
		})
	  }
	}).catch(err => err)
  }

  getImgPage() {
	//https://www.pixiv.net/member_illust.php?mode=manga&illust_id=21177899
	//https://www.pixiv.net/member_illust.php?mode=medium&illust_id=58396920
	let url = new URL(this.baseUrl);
	url.search = new URLSearchParams({
	  mode: this.type === 'illust' ? 'medium' : this.type,
	  illust_id: this.id
	});
	this.imgPage = url.href;
  }

  parseImgPage() {
	this.getImgPage();
	let _this = this;
	return this.request.getDom(this.imgPage).then($ => {
	  _this.uri = _this.getUri($, this.type);
	  _this.getImgType();
	}).catch(err => err)
  }

  getFirstPage() {
	let url = new URL(this.baseUrl);
	url.search = new URLSearchParams({
	  mode: 'medium',
	  illust_id: this.id
	});
	this.firstPage = url.href;
  }

  parseFirstPage() {
	this.getFirstPage();
	let _this = this;
	return this.request.getDom(this.firstPage).then($ => {
	  _this.info.rate = $('.rated-count').text();
	  _this.info.userId = $("[name='user_id']").val();
	  _this.info.Day = _this.getDay($('.works_display').find('img').attr('src'));
	}).catch(err => err)
  }


  getUri($, cls) {
	let uri;
	switch (cls) {
	  case 'manga':
		uri = [];
		let imgs = $('.image');
		for (let i = 0; i < imgs.length; i++) {
		  uri.push(imgs.eq(0).attr('src'));
		}
		break;
	  case 'illust':
		uri = $('.original-image').data('src');
		break;
	}
	return uri;
  }

  //获取文件类型（可能没必要。。。）
  getImgType() {
	let tem = this.uri.substring(this.uri.indexOf('/img/')).split('/');
	let typeTem = tem[tem.length - 1];
	this.info.imgType = typeTem.substring(typeTem.indexOf('.') + 1);
  }

  getDay(uri) {
	let tem = uri.substring(uri.indexOf('/img/')).split('/');
	return tem[2] + tem[3] + tem[4];
  }

  isOk() {
	let result = true;
	let option = this.option,
		info = this.info,
		keys = Object.keys(option);

	if (!option || (typeof option) !== 'object' || keys.length < 2) {
	  return result
	}

	let j = 0;
	while (!result || j < keys.length) {
	  let i = option[keys[j]];
	  j++;
	  switch (i) {
		case 'rate':
		  if (parseInt(option.rate) > parseInt(info.rate)) {
			result = false
		  }
		  break;
		case 'day':
		  if (option.day.toString() !== info.day) {
			result = false
		  }
		  break;
		case 'time':
		  let time = parseInt(option.time, 10);
		  if (typeof option.time === 'object') {
			let min, max;
			if (option.time[0] > option.time[1]) {
			  min = option.time[1];
			  max = option.time[0];
			} else {
			  min = option.time[0];
			  max = option.time[1];
			}
			if (time < parseInt(min, 10) || time > parseInt(max, 10)) {
			  result = false;
			}
		  } else if (typeof option.time === 'string') {
			if (time < parseInt(option.time, 10)) {
			  result = false;
			}
		  }
	  }
	}
	return result;
  }


  getStream() {
	return fetch(this.uri, {
	  headers: {
		referer: this.imgPage
	  }
	})
	.then(res => res)
	.catch(err => err)
  }


};