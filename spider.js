/**
 * Created by Anshi on 2017/7/15.
 */
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const userConfig = require('./config.js');
const fs = require('fs');

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

let getFollowIdListFromPage = function ($page) {
  let listFollower = $page('.members li').find('input');
  let listId = [];

  for (let i = 1; i < listFollower.length; i++) {
	listId.push(listFollower.eq(i).val())
  }
  return listId;
};

async function getFollowerIdList() {
  let homeUrl = 'https://www.pixiv.net';
  //获取member页
  const $homePage = await getPage(homeUrl);
  let nextPageLink = $homePage('._profile-menu-unit > .menu-item').eq(0).children().eq(0).find('a').attr('href');

  //获取关注用户的id列表
  let followPageList = [];
  let followIdList = [];
  const $follwerPage = await getPage(homeUrl + nextPageLink);
  //添加首页的
  followPageList = followPageList.concat(getFollowIdListFromPage($follwerPage));
  let pageNum = $follwerPage('._pager-complex').eq(0).find('a');
  for (let i = 0; i < pageNum.length - 1; i++) {
	followPageList.push(getPage(`https://www.pixiv.net/bookmark.php${pageNum.eq(i).attr('href')}`))
  }
  Promise.all(followPageList)
  .then(pages => {
	pages.forEach((item) => {
	  followIdList = followIdList.concat(getFollowIdListFromPage(item));
	});
	//将follow的id存起来，放在josn数组里。
	fs.writeFile('./data/followIdList.json', JSON.stringify(followIdList), (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
  })
  .catch(err => console.log(err))
}

/*getFollowerIdList();
module.exports = {
  getFollowerIdList:async function(){

  }
}*/


