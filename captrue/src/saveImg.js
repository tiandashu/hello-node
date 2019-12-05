const https = require('https')
const fs = require('fs')


//保存图片到本地
function saveImg(url, path, imgName) {
  https.get(url, function (res) {

    var imgData = '';
    res.setEncoding('binary');
    res.on('data', function (chunk) {
      imgData += chunk;
    })

    res.on('end', function () {
      fs.stat(path, function (err, stats) {
        if (err) {
          fs.mkdir(path, function (err) {
            if (err) {
              return false
            }
            fs.writeFile(`${path}${imgName}`, imgData, 'binary', function (err) {
              // console.log('保存图片成功首次' + path + imgName)
            })
          })
          return false
        }
        // 如果存在该目录直接写入图片
        if (stats.isDirectory()) {
          fs.writeFile(`${path}${imgName}`, imgData, 'binary', function (err) {
            // console.log('保存图片成功' + path + imgName)
          })
        }

      })

    })
  })

}

module.exports = saveImg