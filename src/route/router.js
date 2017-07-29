/**
 * Created by Anshi on 2017/7/19.
 */
const Following = require('../Page/Following');
const Works = require('../Page/Works');
const Illust = require('../Page/Illust');
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

	this.taskOrder()
  }

  async exec() {

  }

  //从作品id列表到作品uri {}对象。需要知道类型


  async getUriListIdByUserId(id) {
	let _this = this;
	let work = new Works(id, this.option);
	await  work.getIllustsList();
	let illustsList = work.illustsList;
	let illusts = [];
	let promiseArr = [];
	Object.keys(illustsList).forEach(item => {
	  illustsList[item].forEach(id => {
		let illust = new Illust(id, _this.option, item);
		illusts.push(illust);
		let pro = illust.getIllustUri();
		if (pro) {
		  promiseArr.push(pro)
		}
	  })
	});
	await Promise.all(promiseArr).catch(err => err);
	new Handler(illusts);
  }


  async taskOrder() {
	let _this = this;
	switch (this.type) {
	  case 0:
		//getFollowingIllusts
		this.initTask = new Following(this.id);
		await this.initTask.getFollowingList();
		this.initTask.followingList.forEach(user => {
		  _this.getUriListIdByUserId(user.id)
		})
	}
  }
}
;