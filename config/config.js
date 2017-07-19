/**
 * Created by Anshi on 2017/7/17.
 */
let cookie = 'input your cookie here';
let User_Agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';


/*
 * home https://www.pixiv.net/
 * profile https://www.pixiv.net/bookmark.php?id=3132272
 * profile_illust https://www.pixiv.net/member_illust.php?id=14914
 * rank https://www.pixiv.net/ranking.php?mode=daily&content=illust
 *  	   https://www.pixiv.net/ranking.php?mode=daily&content=illust&date=20170716
 *  	   mode:weekly||monthly&content=illust&date=20170716
 * illust https://www.pixiv.net/member_illust.php?mode=medium&illust_id=63883176
 * */

let pageMap = {
  home: 'https://www.pixiv.net/',
  profile: 'https://www.pixiv.net/bookmark.php',
  profile_illust: 'https://www.pixiv.net/member_illust.php',
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
  User_Agent,
  pageMap,
  path
};
