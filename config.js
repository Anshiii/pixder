/**
 * Created by Anshi on 2017/7/17.
 */
let cookie = 'p_ab_id=2; p_ab_id_2=3; login_ever=yes; _ga=GA1.2.852950813.1499050195; device_token=79bbbdae4099c5d5469db78a80aeabc0; module_orders_mypage=%5B%7B%22name%22%3A%22recommended_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22everyone_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22following_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22mypixiv_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22fanbox%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22featured_tags%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22contests%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22sensei_courses%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22spotlight%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22booth_follow_items%22%2C%22visible%22%3Atrue%7D%5D; PHPSESSID=3132272_1443462d36eb7e578d20fbf3799cfc8c; __utma=235335808.852950813.1499050195.1500117706.1500120569.5; __utmc=235335808; __utmz=235335808.1500117706.4.3.utmcsr=touch.pixiv.net|utmccn=(referral)|utmcmd=referral|utmcct=/member_illust.php; __utmv=235335808.|2=login%20ever=yes=1^3=plan=normal=1^5=gender=female=1^6=user_id=3132272=1^9=p_ab_id=2=1^10=p_ab_id_2=3=1^11=lang=ja=1';
let User_Agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';

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
  User_Agent
};