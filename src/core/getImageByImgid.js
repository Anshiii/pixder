/**
 * Created by Anshi on 2017/7/17.
 */
const getPage = require('../middleware/getPage')
const getInfoFromUri = require('../middleware/getInfoFromUri');
const compareOption = require('../middleware/compareOption');
const saveFile = require('../middleware/saveFile');
const fetch = require('node-fetch');


//应该做成可以new的形式吧，userid是固定参数的。
module.exports = async function (id, option, bar) {
  let uri = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + id;
  const $ = await getPage(uri);
  //"https://i.pximg.net/img-original/img/2016/08/12/02/15/22/58396920_p0.jpg"
  //如果imgUri为undefined 可能是因为投稿的是漫画作品，多页的情况。
  let imgUri = $('.original-image').data('src');
  if (!imgUri) return `编号${id}投稿作品非插画，未进行下载`;

  let imgInfo = getInfoFromUri(imgUri);
  imgInfo.rate = $('.rated-count').text();
  imgInfo.id = id;
  imgInfo.userId = $("[name='user_id']").val();

  if (compareOption(option, imgInfo)) {
	fetch(imgUri, {
	  headers: {
		referer: uri
	  }
	})
	.then(res => {
	  if (res.ok) {
		saveFile(res, `${process.cwd()}/data/${imgInfo.userId }/${imgInfo.id}.${imgInfo.type}`)
	  }
	})
	.catch(err => err)
  }
}