/**
 * Created by Anshi on 2017/7/28.
 */

/*爬取一个用户，用一个子进程*/

const {execFile} = require('child_process');
const Router = require('./router')

// let router = new Router(void(0), void(0), 0);

let router = {};

router.usList = [{id: 490219, name: "Hiten■三日目A47a"}]
Promise.resolve()
.then(() => router.usList.forEach(item => {
	  const child = execFile('node', ['fstest.js',item.id,JSON.stringify({type:['illust']})], (error, stdout, stderr) => {
		if (error) {
		  throw error;
		}
		console.log(stdout);
	  })
	}
)).catch(err => err);