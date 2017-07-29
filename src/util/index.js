/**
 * Created by Anshi on 2017/7/19.
 */
module.exports = {
  isJson(str){
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
};