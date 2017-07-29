/**
 * Created by Anshi on 2017/7/17.
 */
let cookie = "input your cookie";
let pageMap = {
  home: 'https://www.pixiv.net/',
  ////实际是收藏页.
  // type=user限定为关注的用户 & id=XXX
  following: 'https://www.pixiv.net/bookmark.php',
  //作品一览页面。id=xxx获取某个用户的作品。包括（插画，漫画，动图）三种类型，可选择爬取
  //type=illust/manga/ugoira & id=xxx
  works: 'https://www.pixiv.net/member_illust.php',
  illust: 'https://www.pixiv.net/member_illust.php',
  rank: 'https://www.pixiv.net/ranking.php'
};


let path = '/Users/Anshi/exper/spider';

/*const {URLSearchParams} = require('url');

 const params = new URLSearchParams();
 params.append('captcha', '');
 params.append('g_recaptcha_response', '');
 params.append('post_key', 'ce05d51c8ff7ab654d2fdc38da8364a7');
 params.append('source', 'touch');
 params.append('ref', '');
 params.append('return_to', 'http://touch.pixiv.net/');
 console.log('url参数方法', params, 'url参数方法完');*/

module.exports = {
  cookie,
  pageMap,
  path
};
