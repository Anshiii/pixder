/**
 * Created by Anshi on 2017/7/17.
 */
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const userConfig = require('./config.js');
const fs = require('fs');

//https://www.pixiv.net/member_illust.php?mode=medium&illust_id=58396920

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
let getImageById = async function (id) {
  let uri = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + id;
  const $ = await getPage(uri);
  //"https://i.pximg.net/img-original/img/2016/08/12/02/15/22/58396920_p0.jpg"
  //如果imgUri为undefined 可能是因为投稿的是漫画作品，多页的情况。
  let imgUri = $('.original-image').data('src');
  let rated_count = parseInt($('.rated-count').text(), 10);
  if (imgUri && rated_count > 1500) {
	fetch(imgUri, {
	  headers: {
		referer: uri
	  }
	})
	.then(res => {
	  console.log(res.ok)
	  if(res.ok){
	    //@Q：这一段到底到底做了写什么...
		const dest = fs.createWriteStream(`./data/${userId}/${id}.png`);
		res.body.pipe(dest);
	  }
	})
	.catch(err => err)
  }
}

let userId = '3767'
function saveImageByIdList() {
  fs.mkdir(`./data/${userId}`, sth => sth);
  let imageIdList = JSON.parse(fs.readFileSync('./data/imageList_userid-3767.json', 'utf8'));
  imageIdList.forEach(item => {
	getImageById(item)
  })

}
saveImageByIdList();

/*
 fetch("https://i.pximg.net/img-original/img/2016/08/12/02/15/22/58396920_p0.jpg", {
 headers: {
 referer: 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=58396920'
 }
 })
 .then(res => {
 const dest = fs.createWriteStream('./58396920.png');
 res.body.pipe(dest);
 console.log(err)
 })
 .catch(err => err)*/
