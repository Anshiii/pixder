/**
 * Created by Anshi on 2017/7/19.
 */

const Request = require('../core/Spider');
const {URLSearchParams} = require('url');
const userConfig = require('../../config/config');

/*
 * 到following能干嘛
 * 获取following列表
 * following https://www.pixiv.net/bookmark.php?type=user&id=14914
 * */


module.exports = class Following {
  constructor(id) {
	this.id = id;
	this.baseUrl = userConfig.pageMap['following'];
	this.request = new Request();
	this.followingList = [];
	this.restPage = [];


  }

  getFollowingList() {
	let _this = thisl
	return this.parseFirstPage(obj => {
	  let {pageList, idList, count} = obj;
	  _this.followingList = idList;
	  _this.restPage = pageList;
	  return _this.parseRestPage();
	}).catch(err => err)

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
	params = new URLSearchParams({
	  type: 'user'
	});
	if (this.id) {
	  params.add('id', this.id)
	}
	firstUri = this.baseUrl + '?' + params.toString();
	//爬取当前id列表，和更多following列表页面列表。
	return this.request.getDom(firstUri).then(dom => {
	  let idList = _this.getFollowIdListFromPage(dom);
	  let pageList = _this.getRestPage(dom);
	  let count = _this.getFollowingCount(dom);
	  return {
		pageList,
		idList,
		count
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
	  return _this.followingList;
	})
	.catch(err => err)
  }

  getFollowingCount($) {
	return parseInt($('.count-badge').text(), 10);
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
	let pageNum = $('._pager-complex').length && $('._pager-complex').eq(0).find('a') || [];
	for (let i = 0; i < pageNum.length - 1; i++) {
	  pageList.push(pageNum.eq(i).attr('href'));
	}
	return pageList;
  }
};