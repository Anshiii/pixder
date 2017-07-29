/**
 * Created by Anshi on 2017/7/17.
 */
/*在这里编写任务*/
/*默认任务（题外话：有种写gulp的感觉...gulp好像是流任务著称*/

require('babel-register');
const spider = require('./src/pixder.js');



// spider.getImagesByUserId(1565632);
spider.getFollowingIllusts();



