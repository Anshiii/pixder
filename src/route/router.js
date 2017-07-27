/**
 * Created by Anshi on 2017/7/19.
 */
const Following = require('../Page/Following');
const Works = require('../Page/Works');
const Illust = require('../Page/Illust');
const process = require('../process/index');


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


module.exports = class Router {

  constructor(id, option, type) {
	this.id = id;
	this.option = option;
	this.type = type;
	this.page = [];


  }

  async exec() {

  }

  taskList() {
	switch (this.type) {
	  case 0:
		//getFollowingIllusts
		this.page.push(new Following(this.id)); //this.followingList =[];
		this.page.push([]); //this.illustsList = {manga:[],illust:{]}; 这里option就可以过滤了。
		this.page.push([]); //this.imgList = {};
	}
  }

  async taskOrder() {
	this.taskList();
	let _this = this;
	switch (this.type) {
	  case 0:

		//getFollowingIllusts
		let list = await this.page[0].getfollowingList();


		//getIllustsList
		let illustsList = {};
		list.forEach(item => {
		  this.page[1].push(new Works(item, this.option));
		});
		let promiseArray = this.page[1].map(work => {
		  return work.getIllustsList();
		});
		await Promise.all(promiseArray);

		this.option.type.forEach(item => {
		  illustsList[item] = [];
		  this.page[1].forEach(work => {
			illustsList[item] = illustsList[item].concat(work.illustsList[item]);
		  })
		});


		//getImage
		let imgUriList = [];
		this.option.type.forEach(item => {
		  illustsList[item].forEach(id => {
		    this.page[2].push(new Illust(id,_this.option))
		  })
		});
		let promiseArray2 = this.page[2].map(illust =>{
		  return illust.getIllustUri();
		});
		await Promise.all(promiseArray2);

		imgUriList = this.page[2].map(illust =>{
		  return illust
		});

		//todo
		//获取到所有图片的uri之后，陆续存起来。


	}
  }

  static promiseArray(list = [], promise) {
	let promiseArray = [];
	list.forEach(item => {
	  promiseArray.push(promise(item))
	});
	return Promise.all(promiseArray);
  }


};