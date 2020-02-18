//导入依赖包
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const superagent = require("superagent");
const cheerio = require("cheerio");

superagent
  .get(`http://db.18183.com/wzry`)
  .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36')
  .end(async (error, response) => {
    //获取页面文档数据
    var content = response.text;
    //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
    var $ = cheerio.load(content, { decodeEntities: false });

    const result = [];

    const alls = $(".section.hero-result-box").find("li")
    const len = alls.length;
    let count = 0; // 处理计数
    alls.each((i, el) => {
      const ele = $(el);
      const item = {};
      item.index = i + 1;
      item.tit = ele.find('.mod-iconitem-tit').text();
      item.icon = ele.find('img').attr("data-original");
      item.htmlUrl = ele.find("a").attr("href");
      item.category = ele.attr("data-category");
      item.type = ele.attr("data-type");
      item.position = ele.attr("data-position");
      item.id = ele.attr("data-id");
      // console.log(item)

      result.push(item)

      superagent(`http://db.18183.com${item.htmlUrl}`)
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36')
        .end((error, response) => {
          //获取页面文档数据
          var content = response.text;
          //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
          var $ = cheerio.load(content, { decodeEntities: false });

          $(".hero-otherinfo-box").find(".otherinfo-datapanel li").each((j, el) => {
            const ele = $(el);
            const obj = ele.text().split("：");
            console.log(j, obj)

            item[obj[0]] = obj[1];
          });

          item.equipment = [];
          $(".equipment-collocation-box").find(".collocation-box").each((j, el) => {
            const ele = $(el);
            item.equipment.push({
              detail: ele.find(".analysis p").text(),
              list: ele.find('.mod-iconlist li.mod-iconitem').map((k, tem) => {
                return {
                  name: $(tem).find("p").text(),
                  icon: $(tem).find("img").attr("data-original"),

                }
              }).get()
            })
          })

          item.relation = [];
          $(".relation-hero-box").find(".relation-hero-item").each((j, el) => {
            const ele = $(el);

            item.relation.push({
              name: ele.find('.title p').text(),
              list: ele.find('li.mod-iconitem').map((k, iconItem) => {
                return $(iconItem).find("p").text()
              }).get()
            })
          })





          count++;


          console.log(len, count, item.relation)
          if (len == count) {
            console.log("---------===--------");

            // //将数组输出到json文件里  刷新目录 即可看到当前文件夹多出一个boss.json文件(打开boss.json文件，ctrl+A全选之后 ctrl+K，再Ctrl+F即可将json文件自动排版)
            fs.appendFile("wzry.json", JSON.stringify(result, null, 2), "utf-8", (error) => {
              //监听错误，如正常输出，则打印null


              // if (error == null) {
              //   // console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)");
              //   let url = $("#pt_next").attr("href");
              //   console.log(url)
              //   if (url) {
              //     deep(url)
              //   }
              // }


            });
          }
        });
    });




  });

// superagent
//   .get("https://wap.xbiquge6.com/81_81272/252892_2.html")
//   .end((error, response) => {
//     //获取页面文档数据
//     var content = response.text;
//     //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
//     var $ = cheerio.load(content, { decodeEntities: false });
//     //定义一个空数组，用来接收数据
//     var result = [];
//     //分析文档结构  先获取每个li 再遍历里面的内容(此时每个li里面就存放着我们想要获取的数据)

//     // console.log()


//     // $(".a").each((index, value) => {
//     //   //地址和类型为一行显示，需要用到字符串截取
//     //   //地址
//     //   let address = $(value).find(".info-primary").children().eq(1).html();
//     //   //类型
//     //   let type = $(value).find(".info-company p").html();
//     //   //解码
//     //   address = unescape(address.replace(/&#x/g, '%u').replace(/;/g, ''));
//     //   type = unescape(type.replace(/&#x/g, '%u').replace(/;/g, ''))
//     //   //字符串截取
//     //   let addressArr = address.split('<em class="vline"></em>');
//     //   let typeArr = type.split('<em class="vline"></em>');
//     //   //将获取的数据以对象的形式添加到数组中
//     //   result.push({
//     //     title: $(value).find(".name .job-title").text(),
//     //     money: $(value).find(".name .red").text(),
//     //     address: addressArr,
//     //     company: $(value).find(".info-company a").text(),
//     //     type: typeArr,
//     //     position: $(value).find(".info-publis .name").text(),
//     //     txImg: $(value).find(".info-publis img").attr("src"),
//     //     time: $(value).find(".info-publis p").text()
//     //   });
//     //   // console.log(typeof $(value).find(".info-primary").children().eq(1).html());
//     // });
//     //将数组转换成字符串
//     // result = JSON.stringify(result);
//     result = $("#chaptercontent").html();
//     //将数组输出到json文件里  刷新目录 即可看到当前文件夹多出一个boss.json文件(打开boss.json文件，ctrl+A全选之后 ctrl+K，再Ctrl+F即可将json文件自动排版)
//     fs.writeFile("boss.html", result, "utf-8", (error) => {
//       //监听错误，如正常输出，则打印null
//       if (error == null) {
//         console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)");
//       }
//     });
//   });