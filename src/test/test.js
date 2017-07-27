
/*url
const {URL, URLSearchParams} = require('url');


this.baseUrl = "https://www.pixiv.net/member_illust.php";
this.type = ["illust","asv"];
this.id = 123;
this.firstPage = [];
this.type.forEach(item => {
  let url = new URL(this.baseUrl);
  const myURL = new URL('https://example.org/?abc=123');


  url.search = new URLSearchParams({
	type: item,
	id: this.id
  });
  this.firstPage.push(url.href)
});
console.log(this.firstPage);*/



/*
class Test{
  constructor(){
    this.id = 1;

    this.a();
    console.log(233)
  }

  async a(){
    let _this = this;
    await new Promise(res =>{
      setTimeout(() =>{
        res(2000)
		_this.id = 2000;
	  },2000)
	})
  }
}

let a = new Test();
console.log(a.id)

setTimeout(() =>{
  console.log(a.id)
},3000)*/

var numbers = [1, 5, 10, 15];
var doubles = numbers.map(function(x) {
  if(x>8){
	return x * 2;
  }
});
console.log(doubles);