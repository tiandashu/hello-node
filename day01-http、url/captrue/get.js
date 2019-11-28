// 抓取思路：抓取网站图片
// 1、发送请求 -》 获得页面 -》 解析页面 -》 下载内容 -》 存储内容

const http = require('http')
const fs = require('fs')
const cheerio = require("cheerio")

// client

let options = {
  // hostname: 'www.meizitu.com',
  hostname: 'news.baidu.com',
  port: 80,
  // path: '/a/5519.html',
  path: '/guonei',
  method: 'GET',
  // headers: {
    
  // }
}
let htmlData = ''
let client = http.request(options, function(res) {
  res.setEncoding("utf-8");
 
  res.on('data',function(chunk){
    htmlData += chunk
  })
  res.on('end',function() {
    let $ = cheerio.load(htmlData)
    var text = $('.title').text() + "999999"
    fs.writeFile("./baidu.txt",text,"utf-8", function(err){
      if(err) {
        return false
      }
      console.log('写入成功了')
    })
  })
  
})

client.on("error",function(err){
  console.log(err.message);
});
client.end()