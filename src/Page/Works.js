/**
 * Created by Anshi on 2017/7/26.
 */

const Request = require('../core/Spider');
const {URL, URLSearchParams} = require('url');
const userConfig = require('../../config/config');

module.exports = class Works {
  constructor(id, option) {
	this.id = id;
	this.type = option.type;
	this.baseUrl = userConfig.pageMap['works'];
	this.request = new Request();
	this.restPage = {};
	this.firstPage = {};
	this.illustsList = {};

  }

  async getIllustsList() {


	for (let cls of this.type) {
	  await this.handlePage(cls);
	  console.log(this.id,cls);
	}
	return this.illustsList;
  }

  async handlePage(cls) {
	await this.parseFirstPage(cls);
	if (this.restPage[cls].length > 0) {
	  await this.parseRestPage(cls);
	}
  }

  getFirstPage() {
	//https://www.pixiv.net/member_illust.php?type=illust&id=14914
	let _this = this;
	this.type.forEach(item => {
	  let url = new URL(_this.baseUrl);
	  url.search = new URLSearchParams({
		type: item,
		id: _this.id
	  });
	  _this.firstPage[item] = url.href;
	});
  }

  parseFirstPage(cls) {
	this.getFirstPage();
	let _this = this;
	return this.request.getDom(this.firstPage[cls])
	.then($ => {
	  _this.restPage[cls] = _this.getRestPage($);
	  _this.illustsList[cls] = _this.getWorksId($);
	  return cls;
	})
	.catch(err => err)
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
	  return _this;
	})
	.catch(err => err)
  }

  getRestPage($) {
	let pageList = [];
	let pageNum = $('.page-list').length && $('.page-list').eq(0).find('a') || [];
	for (let i = 0; i < pageNum.length; i++) {
	  pageList.push(pageNum.eq(i).attr('href'));
	}
	return pageList;
  }

  getWorksId($) {
	let itemList = $('.image-item');
	let idList = [];
	for (let i = 0; i < itemList.length; i++) {
	  idList.push(itemList.eq(i).find('img').data('id'))
	}
	return idList;
  }


}