/**
 * Created by Anshi on 2017/7/28.
 */
const Works = require('../Page/Works');
const Illust = require('../Page/Illust');
const Handler = require('../handler/handler');
const fs = require('fs');

console.log("child 正在运行")
let item = {};
// item.id = process.argv[2];
_this = {};
// _this.option = JSON.parse(process.argv[3]);
item.id = 14914;
_this.option = {type: ['illust']};


let work = new Works(item.id, _this.option);
let illusts = [];
let promiseArr = [];

work.getIllustsList().then(() => {
  Object.keys(work.illustsList).forEach(item => {
	work.illustsList[item].forEach(id => {
	  let illust = new Illust(id, _this.option, item);
	  illusts.push(illust);
	  let pro = illust.getIllustUri();
	  if (pro) {
		promiseArr.push(pro)
	  }
	})
  })
  return Promise.all(promiseArr)
})
.then(x => {
  fs.writeFile('a.json', JSON.stringify(x), (err) => {
	if (err) throw err;
	console.log('The file has been saved!');
  });

  new Handler(x);
});
