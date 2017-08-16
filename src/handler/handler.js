/**
 * Created by Anshi on 2017/7/19.
 */
/**
 * Created by Anshi on 2017/7/17.
 */
const fs = require('fs');
const config = require('../../config/config');
const EventEmitter = require('events');


module.exports = class Handler {
  constructor(path) {

	/*this.usId = items[0].info.userId;
	 this.items = items;*/

	// data/usid/imgid
	this.count = 0;
	this.readableQuene = [];

	this.allCount = 0;
	this.allCount2 = 0;

	this.maxStream = 2;

	this.event = new EventEmitter();
	this.eventOn()

  }

  eventOn() {
	let _this = this;
	this.event.on('readEnd', () => {
	  if (_this.readableQuene.length > 0) {
		_this.saveStream(_this.readableQuene.shift());
	  }
	})
  }


  saveImg(illust) {
	if (this.count >= this.maxStream) {
	  this.readableQuene.push(illust)
	} else {
	  this.saveStream(illust);
	}
  }


  saveStream(illust) {
	let filePath = `${process.cwd()}/data/${illust.info.userId}`;
	if (!fs.existsSync(filePath)) {
	  fs.mkdir(filePath)
	}
	let _this = this;
	this.count++;
	console.log(`当前正获取图片数：${this.count}，获取图片总数${++this.allCount}`);
	illust.getStream().then(data => data.body).then(rd => {
	  const dest = fs.createWriteStream(`${filePath}/${illust.id}.${illust.info.imgType}`);
	  rd.on('end', () => {
		_this.count--;
		_this.event.emit('readEnd')
		console.log(`读取图片总数${++this.allCount2}`)
	  });
	  rd.pipe(dest);
	}).catch();
  }
};

