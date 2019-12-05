// 抓取思路：抓取网站图片
// 1、发送请求 -》 获得页面 -》 解析页面 -》 下载内容 -》 存储内容

const http = require('http')
const https = require('https')
const fs = require('fs')
const saveImg = require('./src/saveImg')

// options
const douban = require('./options/douban')
const keke = require('./options/keke')
const meizitu = require('./options/meizitu')
const baidu = require('./options/baidu')
const zhihu = require('./options/zhihu')

let {options, staticPath} = zhihu
let htmlData = ''
let client = https.request(options, function (res) {
  // res.setEncoding("utf-8");
  res.on('data', function (chunk) {
    htmlData += chunk
  })

  res.on('end', function () {
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = htmlData.match(imgReg);

    fs.unlink('./logs/log.text', function(err){
      if(err) {
        console.log('清除日志失败')
        return false
      }
      console.log('清除日志成功')
    })


    for (var i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg);
      //获取图片地址
      // console.log('图片地址' + (i + 1) + '：' + src[1]);
      fs.appendFile('./logs/log.text', src[1] + '\n', function (err) {
        if (err) {
          console.log('日志错误', err)
          return false;
        }
        // console.log('日志打印成功')
      })

      if (src[1].indexOf('data:') ==  -1) {
        saveImg(src[1], `./download/${staticPath}/`, `${i}.png`)
      } 
    }
  })

})

client.on("error", function (err) {
  console.log('clienterror:', err.message);
});

client.end(function(){
  console.warn('页面抓取完成了')
})
