/**
 * Created by Anshi on 2017/7/19.
 */
const Following = require('../page/Following');
const Works = require('../page/Works');
const Illust = require('../page/Illust');
const Handler = require('../handler/handler');
const {execFile} = require('child_process');


module.exports = class Router {
  constructor(id, option = {}, type) {
	this.id = id;
	this.option = option;

	if (!option.type || !option.type.length || option.type.length < 1) {
	  this.option.type = ['illust']
	}
	this.type = type;
	this.page = [];
	this.task = [];
	this.handler = new Handler();

	this.taskOrder()
  }

  async exec() {

  }

  //从作品id列表到作品uri {}对象。需要知道类型


  async taskOrder() {
	let _this = this;
	switch (this.type) {
	  case 0:
		//getFollowingIllusts
		this.page[0] = new Following(this.id);
		await this.page[0].getFollowingList();


		this.page[0].followingList.forEach(async (user) => {
		  let illustsList = await _this.handleWorks(user.id);

		  Object.keys(illustsList).forEach(item => {
			for (let id of illustsList[item]) {
			  _this.handleIllust(id, item)
			}
		  })
		});
		break;
	  case 1:
		//获取排行榜
	}
  }

  async handleIllust(id, cls) {
	let illust = new Illust(id, this.option, cls);
	await illust.getIllustUri();
	if (illust.uri && illust.uri.length > 0) {
	  this.handler.saveImg(illust);
	}
  }

  async handleWorks(id) {
	let work = new Works(id, this.option);
	return await  work.getIllustsList();
  }
}