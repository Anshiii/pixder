/**
 * Created by Anshi on 2017/7/17.
 */
let getFollowIdListFromPage = function ($page) {
  let listFollowing = $page('.members li').find('input');
  let listId = [];

  for (let i = 1; i < listFollowing.length; i++) {
	listId.push(listFollowing.eq(i).val())
  }
  return listId;
};

module.exports = {
  getFollowingIdList: async function () {
	let homeUrl = 'https://www.pixiv.net';
	//获取member页
	const $homePage = await getPage(homeUrl);
	let nextPageLink = $homePage('._profile-menu-unit > .menu-item').eq(0).children().eq(0).find('a').attr('href');

	//获取关注用户的id列表
	let followPageList = [];
	let followIdList = [];
	const $follwerPage = await getPage(homeUrl + nextPageLink);
	//添加首页的
	followPageList = followPageList.concat(getFollowIdListFromPage($follwerPage));
	let pageNum = $follwerPage('._pager-complex').eq(0).find('a');
	for (let i = 0; i < pageNum.length - 1; i++) {
	  followPageList.push(getPage(`https://www.pixiv.net/bookmark.php${pageNum.eq(i).attr('href')}`))
	}
	Promise.all(followPageList)
	.then(pages => {
	  pages.forEach((item) => {
		followIdList = followIdList.concat(getFollowIdListFromPage(item));
	  });
	  return followIdList
	})
	.then(list => {
	  //将follow的id存起来，放在josn数组里。
	  fs.writeFile('./data/followIdList.json', JSON.stringify(list), (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	  });
	})
	.catch(err => console.log(err))
  }
}