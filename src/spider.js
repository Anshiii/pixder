/**
 * Created by Anshi on 2017/7/15.
 */

const router = require('./core/router');





module.exports = {
  getFollowingIdList(id){
	return router(arguments,'profile');
  }
};





