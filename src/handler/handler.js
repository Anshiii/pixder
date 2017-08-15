/**
 * Created by Anshi on 2017/7/19.
 */
/**
 * Created by Anshi on 2017/7/17.
 */
const fs = require('fs');
const config = require('../../config/config');


module.exports = class Handler {
  constructor(path) {

	/*this.usId = items[0].info.userId;
	 this.items = items;*/

	// data/usid/imgid
	this.count = 0;
	this.readableQuene = [];


  }


  async saveImg(illust) {
	let filePath = `${process.cwd()}/data/${illust.info.userId}`;

	if (!fs.existsSync(filePath)) {
	  fs.mkdir(filePath)
	}

	const dest = fs.createWriteStream(`${filePath}/${illust.id}.${illust.info.imgType}`);
	let _this = this;
	illust.getStream().then(data => {
	  console.log(_this.count)
	  //readable.pipe(writable);
	  data.body.on('end', () => {
		if (_this.readableQuene.length > 0) {
		  let rw = _this.readableQuene.shift();
		  rw.r.pipe(rw.w)
		}
		console.log('图片读取完了');
	  });
	  dest.on('pipe', () => {
		_this.count++;
		console.log('写入图片数:' + _this.count);
	  });

	  if (_this.count < 3) {
		data.body.pipe(dest);
	  } else {
		_this.readableQuene.push({r: data.body, w: dest})
	  }


	})
	.catch(err => err)
  }
};

