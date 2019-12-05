// 抓取思路：抓取网站图片
// 1、发送请求 -》 获得页面 -》 解析页面 -》 下载内容 -》 存储内容

const http = require('http')
const https = require('https')
const fs = require('fs')

// options
const douban = require('./options/douban')
const keke = require('./options/keke')
const meizitu = require('./options/meizitu')
const baidu = require('./options/baidu')
const zhihu = require('./options/zhihu')

let options = zhihu
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
    // let base64 = item.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
    //         let dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，

    for (var i = 0; i < arr.length; i++) {
      var src = arr[i].match(srcReg);
      //获取图片地址
      // console.log('图片地址' + (i + 1) + '：' + src[1]);
      if(src[1].indexOf('http')>-1){
        saveImg(src[1], `./download/${i}.png`)
      }
      
    }

    // fs.stat('./download', function (err, stats) {
    //   // 如果没有该文件就创建
    //   if (err) {
    //     fs.mkdir('./download', function (err) {
    //       if (err) {
    //         return false
    //       }
    //       fs.writeFile("./download/baidu.txt", arr, "utf-8", function (err) {
    //         if (err) {
    //           return false
    //         }
    //       })
    //     })
    //     return false
    //   }
    //   // 如果有download文件夹就直接写入
    //   if (stats.isDirectory()) {
    //     fs.writeFile("./download/baidu.txt", arr, "utf-8", function (err) {
    //       if (err) {
    //         return false
    //       }
    //     })
    //   }

    // })

  })

})
//保存图片到本地
function saveImg(url, path) {
  console.log(url, path)
  try {
    https.get(url, function (req, res) {
      var imgData = '';
      req.setEncoding('binary');
      req.on('data', function (chunk) {
        imgData += chunk;
      })
      req.on('end', function () {
        fs.writeFile(path, imgData, 'binary', function (err) {
          console.log('保存图片成功' + path)
        })
      })
    })
  }
  catch (err) {

  }

}

client.on("error", function (err) {
  console.log('clienterror:', err.message);
});
client.end()
