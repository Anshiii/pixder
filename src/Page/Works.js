/**
 * Created by Anshi on 2017/7/26.
 */

const Request = require('../core/Spider');
const {URL, URLSearchParams} = require('url');
const userConfig = require('../../config/config');

module.exports = class Works {
  constructor(id, option) {
	this.id = id;
	this.type = option.type || ['illust'];
	this.baseUrl = userConfig.pageMap['works'];
	this.request = new Request();
	this.restPage = {};
	this.firstPage = {};

	this.illustsList = {};

  }

   getIllustsList() {
	let _this = this;
	let promiseArr = [];
	for (let cls in this.type) {
	  promiseArr.push(this.parseFirstPage(cls).then(() => {
		_this.parseRestPage(cls);
	  }));
	}
	return Promise.all(promiseArr);
  }

  getFirstPage() {
	//https://www.pixiv.net/member_illust.php?type=illust&id=14914
	this.type.forEach(item => {
	  let url = new URL(this.baseUrl);
	  url.search = new URLSearchParams({
		type: item,
		id: this.id
	  });
	  this.firstPage[item] = url.href;
	});
  }

  parseFirstPage(cls) {
	this.getFirstPage();
	let _this = this;
	return this.request.getDom(this.firstPage[cls]).then($ => {
	  this.restPage[cls] = _this.getRestPage($);
	  this.illustsList[cls] = _this.getWorksId($);
	}).catch(err => err)
  }

  parseRestPage(cls) {
	if (this.restPage[cls].length < 1) {
	  return
	}
	let promiseArr = [],
		_this = this;
	this.restPage[cls].forEach(item => {
	  promiseArr.push(this.request.getDom(this.baseUrl + item))
	});
	return Promise.all(promiseArr)
	.then(doms => {
	  doms.forEach(item => {
		_this.illustsList[cls] = _this.illustsList[cls].concat(_this.getWorksId(item));
	  })
	})
	.catch(err => err)
  }

  static getRestPage($) {
	let pageList = [];
	let pageNum = $('.page-list').length && $('.page-list').eq(0).find('a') || [];
	for (let i = 0; i < pageNum.length - 1; i++) {
	  pageList.push(pageNum.eq(i).attr('href'));
	}
	return pageList;
  }

  static getWorksId($) {
	let itemList = $('.image-item');
	let idList = [];
	for (let i = 0; i < itemList.length; i++) {
	  idList.push(itemList.eq(i).find('img').data('id'))
	}
	return idList;
  }


}