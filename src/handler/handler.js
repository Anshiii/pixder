/**
 * Created by Anshi on 2017/7/19.
 */
/**
 * Created by Anshi on 2017/7/17.
 */
const fs = require('fs-extra');
const config = require('../../config/config');
const util = require('../util/index');


module.exports = class Handler {
  constructor(items = []) {

	this.usId = items[0].info.userId;
	this.items = items;

	// data/usid/imgid
	this.filePath = `${process.cwd()}/data/${this.usId}`;

	this.saveImg();
  }


  saveImg() {
	let _this = this;
	fs.emptyDir(this.filePath)
	.then(() => {
	  this.items.forEach(item => {
		const dest = fs.createWriteStream(`${_this.filePath}/${item.id}.${item.info.imgType}`);
		item.getStream().then(data => {
		  data.body.pipe(dest);
		})
	  })
	})
	.catch(err => err)
  }
}

