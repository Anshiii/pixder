/**
 * Created by Anshi on 2017/7/28.
 */
const Works = require('../Page/Works');
const Illust = require('../Page/Illust');
const Handler = require('../handler/handler');
const fs = require('fs');

console.log("child is run")
// let usId = process.argv[2];
// let option = JSON.parse(process.argv[3]);
let usId = 14917;
let option = {type: ['illust']};
let work = new Works(usId, option);
let illusts = [];
let promiseArr = [];

work.getIllustsList()
.then(() => {
  Object.keys(work.illustsList).forEach(item => {
	work.illustsList[item].forEach(id => {
	  let illust = new Illust(id, option, item);
	  illusts.push(illust);
	  let pro = illust.getIllustUri();
	  if (pro) {
		promiseArr.push(pro)
	  }
	})
  });
  return Promise.all(promiseArr)
})
.then(x => {
  console.log(JSON.stringify(x));
  fs.writeFile('a.json', JSON.stringify(x), (err) => {
	if (err) throw err;
	console.log('The file has been saved!');

  });
  // new Handler(x);
})
.catch(err => err);


// new Handler(x);