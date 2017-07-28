/**
 * Created by Anshi on 2017/7/19.
 */
const Following = require('../Page/Following');
const Works = require('../Page/Works');
const Illust = require('../Page/Illust');


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

  pageList() {
	switch (this.type) {
	  case 0:
		//getFollowingIllusts
		this.page.push(new Following(this.id)); //this.followingList =[];
		this.page.push([]); //this.illustsList = {manga:[],illust:{]}; 这里option就可以过滤了。
		this.page.push([]); //this.imgList = {};
	}
  }

  taskOrder() {
	this.pageList();
	let _this = this;
	switch (this.type) {
	  case 0:
		//getFollowingIllusts
		//todo   this.task.push(this.page[0].getfollowingList());
		// let list = await this.page[0].getFollowingList() || [];

		this.task.push([{id:490219,name:"Hiten■三日目A47a"}]);


		/*//getIllustsList
		 let illustsList = {};
		 let illustsListPromiseArray = [];
		 if (list.length < 1) {
		 return '该用户没有关注任何用户';
		 }
		 //根据 关注id的数量建立n个Works对象
		 list.forEach(item => {
		 let work = new Works(item.id, _this.option);
		 _this.page[1].push(work);
		 illustsListPromiseArray.push(work.getIllustsList());
		 });
		 //todo this.task.push(Promise.all(promiseArray))
		 await Promise.all(illustsListPromiseArray).catch(err => err);
		 this.page[1].forEach(work => {
		 this.option.type.forEach(cls => {
		 if (!illustsList[cls]) {
		 illustsList[cls] = [];
		 }
		 illustsList[cls].push(work.illustsList[cls]);
		 })
		 });

		 //getImageUri
		 let imgUriList = [];
		 let imgUriListPromiseArray = [];
		 this.option.type.forEach(item => {
		 illustsList[item].forEach(id => {
		 let illust = new Illust(id, _this.option, item);
		 this.page[2].push(illust);
		 let pro = illust.getIllustUri();
		 if (pro) {
		 imgUriListPromiseArray.push(pro)
		 }
		 })
		 });
		 //todo this.task.push(Promise.all(promiseArray2))
		 await Promise.all(imgUriListPromiseArray).catch(err => err);


		 imgUriList = this.page[2].map(illust => {
		 return illust
		 });

		 console.log(imgUriList);
		 //todo
		 //获取到所有图片的uri之后，陆续存起来。*/
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