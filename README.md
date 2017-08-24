
# pixider 
一个用于将 pixiv.net 的图片下载并保存到本地的小爬虫工具。
默认的任务是爬取个人关注画师的插画投稿类作品，并保存在项目下的 Data 目录。


## 使用
不好意思...暂时只写了个半自动的  
需要先自行登录，将主页响应的cookie写在 `config/config.js` 的配置里。 
 
```
let cookie = COOKIES.cookie;  //input your cookies here
```

## 运行
注：为避免访问过于频繁，限制了同时间 http 请求数，默认的最大值为5。

```
npm run app.js
```
>node 7.6+




## Api
 * [x] getFollowingIllusts(id,option)
 获取关注的用户的投稿作品  
 * [ ] getImageFromRank(option)  
 获取插画排行榜上的投稿作品，默认为当时的排行榜。
 * [ ] getImageByKeyWord(key，option) //未完成  
 获取搜索关键词返回的作品，默认只返回前50项。
 * Option<pre>
  {
  rate:Number,		     //返回大于该分数的图片
  time:String/Array, 	//格式如'20170707'如果参数为字符串，则默认为该从日期至今的作品，如果为数组，则为数组内两个日期之间的作品
  day:String,		   //仅获取该日期的数据
  type:['illust','manga','ugoira']      //限定爬取的图片类型，插画，漫画，动图。默认为插画。
  }
</pre>

##待完成的功能
比起莫名的优化，不如多完善项目吧 孩子...  

* [ ]  进程中断后，重启进程能从之前进度开始/判断已下载项目重来

##个人心得
重构了2次，但是哪怕是现在的代码，阅读起来还是不那么直接明了；
虽然用上了 promise + async/wait ,也亏这个项目，对 Event loop 算是有了更深层次的理解。
还想装逼用多进程...还需了解异步的优点到底是什么...
