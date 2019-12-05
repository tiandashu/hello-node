const url = require('url')
const fs = require('fs')
const path = require('path')
const mimeType = require('../../assets/mime.json')

function router(req, res, staticPath) {

  let pathname = url.parse(req.url).pathname
  // 获取文件后缀名
  let extname = path.extname(pathname)
  let mime = mimeType[extname] || 'text/html'
  res.writeHeader(200, {
    "Content-Type": `${mime};charset='utf-8'`
  })
  if (pathname != '/favicon.ico') {
    fs.readFile(`${staticPath}/${pathname}`, function(err, data) {
      if(err) {
        console.log('err:',err)
        return false
      }
      res.write(data)
      res.end()
    })
  }

}

module.exports = router