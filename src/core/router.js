/**
 * Created by Anshi on 2017/7/19.
 */
const profile = require('../handler/profile');
const process = require('../process');

const handlers = {
  profile
};
//获取handler里的文件，
/*
 * home https://www.pixiv.net/
 * profile https://www.pixiv.net/bookmark.php?id=3132272
 * profile_illust https://www.pixiv.net/member_illust.php?id=14914
 * rank https://www.pixiv.net/ranking.php?mode=daily&content=illust
 *  	   https://www.pixiv.net/ranking.php?mode=daily&content=illust&date=20170716
 *  	   mode:weekly||monthly&content=illust&date=20170716
 * illust https://www.pixiv.net/member_illust.php?mode=medium&illust_id=63883176
 * */


module.exports = async function (args, cls) {
//这里的cls是字符串。
//  uri要根据cls从config里获得baseUrl+部分arg里的param
  let handler = new (handlers[cls])(args[0]);
  let path = args[1] && args[1].path;
  await handler.run();
  process(path, JSON.stringify(handler.followingList));
};