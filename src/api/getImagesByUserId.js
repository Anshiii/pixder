/**
 * Created by Anshi on 2017/7/18.
 */
const getPage = require('../middleware/getPage');
const getImageByImgid = require('../core/getImageByImgid');
const fs = require('fs');
const saveFile = require('../middleware/saveFile');
var ProgressBar = require('progress');


let getImageIdListFromPage = function ($) {
  let itemList = $('.image-item');
  let idList = [];
  for (let i = 0; i < itemList.length; i++) {
	idList.push(itemList.eq(i).find('img').data('id'))
  }
  return idList;
};

let baseurl = "https://www.pixiv.net/member_illust.php";


module.exports = async function getImageByUserId(id, option) {
  const $memberIllustPage = await getPage(`${baseurl}?id=${id}`);
  let pageList = $memberIllustPage('.page-list').eq(0).find('li');
  let pageListPro = [];
  let imageList = [];
  imageList = imageList.concat(getImageIdListFromPage($memberIllustPage));

  for (let i = 1; i < pageList.length; i++) {
	pageListPro.push(getPage(baseurl + pageList.eq(i).find('a').attr('href')))
  }
  Promise.all(pageListPro)
  .then(pages => {
	pages.forEach(item => {
	  imageList = imageList.concat(getImageIdListFromPage(item))
	})
	return imageList
  })
  .then(list => {
	fs.mkdir(`${process.cwd()}/data/${id}`, sth => console.log(sth));

	saveFile(JSON.stringify(list), `${process.cwd()}/data/${id}/imageList.json`);

	let bar = new ProgressBar(':bar :current/:total', {total: list.length});
	list.forEach(item => {
	  bar.tick();
	  getImageByImgid(item, option)
	})
  })
  .catch(err => err)
};




