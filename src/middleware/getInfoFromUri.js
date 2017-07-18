/**
 * Created by Anshi on 2017/7/18.
 */
module.exports = function (uri) {
  //"https://i.pximg.net/img-original/img/2016/08/12/02/15/22/58396920_p0.jpg"
  //我觉得可能需要学点正则吧。。。先用绕路的方法解决吧。

  //["", "img", "2016", "08", "12", "02", "15", "22", "58396920_p0.jpg"]
  let tem = uri.substring(uri.indexOf('/img/')).split('/');

  let typeTem = tem[tem.length - 1];
  let type = typeTem.substring(typeTem.indexOf('.') + 1);

  return {
	time: tem[2] + tem[3] + tem[4],
	type: type
  }
}


