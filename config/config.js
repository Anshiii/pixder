/**
 * Created by Anshi on 2017/7/17.
 */
let cookie = "p_ab_id=2; p_ab_id_2=3; login_ever=yes; googtrans=/ja/en; googtrans=/ja/en; ki_t=1501121292477%3B1501121292477%3B1501121292477%3B1%3B1; ki_r=https%3A%2F%2Fwww.google.co.jp%2F; login_bc=1; PHPSESSID=26457473_bd5be1ad921a35f511d0051befde60ea; device_token=79bbbdae4099c5d5469db78a80aeabc0; is_sensei_service_user=1; user_language=ja; _ga=GA1.2.852950813.1499050195; _gid=GA1.2.76519267.1501121309; module_orders_mypage=%5B%7B%22name%22%3A%22recommended_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22everyone_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22following_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22mypixiv_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22fanbox%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22featured_tags%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22contests%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22sensei_courses%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22spotlight%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22booth_follow_items%22%2C%22visible%22%3Atrue%7D%5D; __utma=235335808.852950813.1499050195.1501121288.1501127470.19; __utmc=235335808; __utmz=235335808.1501127470.19.5.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmv=235335808.|2=login%20ever=yes=1^3=plan=normal=1^5=gender=female=1^6=user_id=26457473=1^9=p_ab_id=2=1^10=p_ab_id_2=3=1^11=lang=ja=1"
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
