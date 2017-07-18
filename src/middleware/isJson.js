/**
 * Created by Anshi on 2017/7/18.
 */

//并不全面，但是够用。。
module.exports = function (str) {
  if (typeof str === 'string') {
	try {
	  let json = JSON.parse(str);
	  return json && typeof json === 'object';
	} catch (e) {
	  console.log('isJson', e);
	  return false;
	}
  }
}