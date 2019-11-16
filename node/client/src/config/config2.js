//切换环境只要改这句
let isPro = false;

let index = isPro?1:0;
let urlLists = [
    {
      baseHostUrl : "https://testnewm.ydl.com",
      baseHostUrlApi :"https://testapi.ydl.com/api",
      baseHostUrlApi2 : "//testm.ydl.com"
    },
    {
      baseHostUrl : "https://m.ydl.com",
      baseHostUrlApi :"https://api.ydl.com/api",
      baseHostUrlApi2 : "//m.ydl.com"
    }
]

// //部署用的登陆跳转
export let baseHostUrl = urlLists[index].baseHostUrl;
export let baseHostUrlApi = urlLists[index].baseHostUrlApi;
export let baseHostUrlApi2 =  urlLists[index].baseHostUrlApi2;

export let testTalkApi = false;

