// 抓取思路：抓取网站图片
// 1、发送请求 -》 获得页面 -》 解析页面 -》 下载内容 -》 存储内容

const http = require('http')
const fs = require('fs')
const cheerio = require("cheerio")

// options
const douban = require('./options/douban')
const keke = require('./options/keke')
const meizitu = require('./options/meizitu')
const baidu = require('./options/baidu')

let options = meizitu
let htmlData = ''
let client = http.request(options, function (res) {
  res.setEncoding("utf-8");

  res.on('data', function (chunk) {
    htmlData += chunk
  })
  res.on('end', function () {
    let $ = cheerio.load(htmlData)
    console.log(htmlData.toString())
    let text = ''
    fs.stat('./down', function (err, stats) {
      if (err) {
        console.log(err)
        return false
      }
      if ( stats.isDirectory() ) {
        fs.writeFile("./down/baidu.txt", text, "utf-8", function (err) {
          if (err) {
            return false
          }
          console.log('写入成功了')
        })
      }
      if (stats.isFile()) {
        fs.mkdir('./down', function (err) {
          if (err) {
            console.log(err)
            return false
          }
          fs.writeFile("./down/baidu.txt", text, "utf-8", function (err) {
            if (err) {
              return false
            }
            console.log('写入成功了')
          })

        })
      }
    })


  })

})

client.on("error", function (err) {
  console.log('error', err.message);
});
client.end()
