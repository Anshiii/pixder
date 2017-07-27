/**
 * Created by Anshi on 2017/7/15.
 */

/* interface Pixder{

 getIllusts(option)
 }*/

const Router = require('./route/router');


module.exports = {
  /*  getFollowingIdList(id){
   return router(arguments,'following');
   }*/

  getFollowingIllusts(id, option){
  new Router(id,option,0)
  }
};





