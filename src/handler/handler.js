/**
 * Created by Anshi on 2017/7/19.
 */
/**
 * Created by Anshi on 2017/7/17.
 */
const fs = require('fs-extra');
const config = require('../../config/config');


module.exports = class Handler {
  constructor(path) {

	/*this.usId = items[0].info.userId;
	 this.items = items;*/

	// data/usid/imgid

  }


  async saveImg(illust) {
	let filePath = `${process.cwd()}/data/${illust.info.userId}`;

	await fs.emptyDir(filePath);
	const dest = fs.createWriteStream(`${filePath}/${illust.id}.${illust.info.imgType}`);

	illust.getStream().then(data => {
	  data.body.pipe(dest);
	})

  }
}

