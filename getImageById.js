/**
 * Created by Anshi on 2017/7/17.
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

let getImageIdListFromPage = function ($) {
  let itemList = $('.image-item');
  let idList = [];
  for (let i = 0; i < itemList.length; i++) {
	idList.push(itemList.eq(i).find('img').data('id'))
  }
  return idList;
}


//获取一个用户的投稿作品，并存到对应的文件夹里。
let id = '3767';
let baseurl = "https://www.pixiv.net/member_illust.php";
async function getImage(id) {
  const $memberIllustPage = await getPage(`${baseurl}?id=${id}`);
  let pageList = $memberIllustPage('.page-list').eq(0).find('li');
  let pageListPro = [];
  let imageList = [];
  imageList = imageList.concat(getImageIdListFromPage($memberIllustPage));

  for (let i = 1; i < pageList.length; i++) {
	pageListPro.push(getPage(baseurl + pageList.eq(i).find('a').attr('href')))
  }
  Promise.all(pageListPro)
  .then(pages =>{
	pages.forEach(item =>{
	  imageList = imageList.concat(getImageIdListFromPage(item))
	})
	return imageList
  })
  .then(list =>{
	fs.writeFile(`./data/imageList_userid-${id}.json`, JSON.stringify(list), (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
  })
  .catch(err => err)
}
getImage(id)
