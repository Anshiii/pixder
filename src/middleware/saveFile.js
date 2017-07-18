/**
 * Created by Anshi on 2017/7/17.
 */
const fs = require('fs');
const isJson = require('./isJson')


module.exports = function (data, filePath) {
  if (isJson(data)) {
	//存json
	fs.writeFile(filePath, data, (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
  } else {
	//存文件
	//@A:新建一块可写入的流（内存），将res.body的内容从管道中一点点写进去。
	const dest = fs.createWriteStream(filePath);
	data.body.pipe(dest);
  }
}

