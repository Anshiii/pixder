/**
 * Created by Anshi on 2017/7/17.
 */
const getPage = require('../middleware/getPage');
const saveFile = require('../middleware/saveFile');

let getFollowIdListFromPage = function ($page) {
  let listFollowing = $page('.members li');
  let listId = [];

  for (let i = 1; i < listFollowing.length; i++) {
	let item = listFollowing.eq(i).find('a');
	listId.push({
	  name: item.data('user_name'),
	  id: item.data('user_id')
	})
  }
  return listId;
};

let homeUrl = 'https://www.pixiv.net';

module.exports = async function () {
  //获取member页
  const $homePage = await getPage(homeUrl);
  let nextPageLink = $homePage('._profile-menu-unit > .menu-item').eq(0).children().eq(0).find('a').attr('href');

  let followPageList = [];
  let followIdList = [];
  const $follwerPage = await getPage(homeUrl + nextPageLink);

  //添加首页的
  followIdList = followIdList.concat(getFollowIdListFromPage($follwerPage));
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
	saveFile(JSON.stringify(list),`${process.cwd()}/data/followIdList.json`)
  })
  .catch(err => console.log(err))
}
