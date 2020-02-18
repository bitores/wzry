//导入依赖包
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const superagent = require("superagent");
var charset = require("superagent-charset");
charset(superagent); //设置字符
const cheerio = require("cheerio");

superagent
  .get(`https://www.xiazaiba.com/gonglue/41760.html`)
  // .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36')
  .charset('gbk')
  .end(async (error, response) => {
    //获取页面文档数据
    var content = response.text;
    //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
    var $ = cheerio.load(content, { decodeEntities: false });

    var result = [];
    $(".ess-cnt div p").each((i, el) => {
      const ele = $(el).text();
      console.log(ele)

      result.push(ele);
    })

    fs.appendFile("wzry-issue.json", JSON.stringify(result, null, 2), "utf-8", (error) => {
      //监听错误，如正常输出，则打印null

    });
  });


//
//导入依赖包

// superagent
//   .get(`http://www.87g.com/wzry/61508.html?t=15128816`)
//   .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36')
//   .end(async (error, response) => {
//     //获取页面文档数据
//     var content = response.text;
//     //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
//     var $ = cheerio.load(content, { decodeEntities: false });

//     const result = [];

//     const alls = $("body").find("tbody a")
//     const len = alls.length;
//     let count = 0; // 处理计数
//     alls.each((i, el) => {
//       const href = $(el).attr("href");
//       const item = {};

//       superagent(`${href}?t=1512881603`)
//         .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36')
//         .end((error, response) => {
//           //获取页面文档数据
//           var content = response.text;
//           //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
//           var $ = cheerio.load(content, { decodeEntities: false });


//           const tds = $(".cont tbody").find('tr').last().find('td');
//           item.issue = tds.first().text();
//           item.ans = tds.last().text();
//           // item.url = href;

//           if (!item.ans.includes("下载")) {
//             result.push(item)
//           }

//           count++;

//           if (len == count) {
//             console.log("---------===--------");

//             // //将数组输出到json文件里  刷新目录 即可看到当前文件夹多出一个boss.json文件(打开boss.json文件，ctrl+A全选之后 ctrl+K，再Ctrl+F即可将json文件自动排版)
//             fs.appendFile("wzry-issues2.json", JSON.stringify(result, null, 2), "utf-8", (error) => {
//               //监听错误，如正常输出，则打印null

//             });
//           }
//         });
//     });
//   });
