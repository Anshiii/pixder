/**
 * Created by Anshi on 2017/7/19.
 */

const Request = require('../core/request');
const {URLSearchParams} = require('url');
const userConfig = require('../../config/config')

/*
 * 到profile能干嘛
 * 获取following列表
 * profile https://www.pixiv.net/bookmark.php?id=3132272
 * */


module.exports = class Profile {
  constructor(args) {
	this.arg = args && args[0];
	this.baseUrl = userConfig.pageMap['profile'];
	/*this.headers = {
	 'User-Agent': userConfig.User_Agent,
	 'Cookie': userConfig.cookie
	 };*/
	this.request = new Request();
	this.followingList = [];
	this.restPage = [];
	this.fileName = this.arg || 'user'
  }

  async run() {
	let {pageList, idList} = await this.parseFirstPage();
	 this.followingList = idList;
	 this.restPage = pageList;
	 await this.parseRestPage();
	 if (this.followingList < 1) {
	 console.log('用户未关注任何用户')
	 }
	/*this.followingList = [
	  {
		"name": "KOALA",
		"id": 311182
	  },
	  {
		"name": "ふぉ～ど",
		"id": 370712
	  },
	  {
		"name": "久方綜司",
		"id": 80713
	  }]*/
  }

  parseFirstPage() {
	let params, firstUri, _this = this;
	if (this.arg) {
	  params = new URLSearchParams({
		id: this.arg
	  });
	} else {
	  params = new URLSearchParams({
		type: 'user'
	  });
	}
	firstUri = this.baseUrl + '?' + params.toString();
	return this.request.getDom(firstUri).then(dom => {
	  let idList = _this.getFollowIdListFromPage(dom);
	  let pageList = _this.getRestPage(dom);
	  return {
		pageList,
		idList
	  }
	}).catch(err => err)
  }

  parseRestPage() {
	let requestArr = [];
	let _this = this;
	if (this.restPage.length < 1) {
	  return
	}
	this.restPage.forEach(item => {
	  requestArr.push(this.request.getDom(this.baseUrl + item));
	});
	return Promise.all(requestArr)
	.then(doms => {
	  doms.forEach(item => {
		_this.followingList = _this.followingList.concat(_this.getFollowIdListFromPage(item));
	  })
	})
	.catch(err => err)
  }

  getFollowIdListFromPage($) {
	let listFollowing = $('.members li');
	let listId = [];
	for (let i = 1; i < listFollowing.length; i++) {
	  let item = listFollowing.eq(i).find('a');
	  listId.push({
		name: item.data('user_name'),
		id: item.data('user_id')
	  })
	}
	return listId;
  };

  getRestPage($) {
	let pageList = [];
	let pageNum = $('._pager-complex') && $('._pager-complex').eq(0).find('a') || [];
	for (let i = 0; i < pageNum.length - 1; i++) {
	  pageList.push(pageNum.eq(i).attr('href'));
	}
	return pageList;
  }
};