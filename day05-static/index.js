const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const getMime = require('./model/getMime')


http.createServer(function (req, res) {

  // 根据不同的pathname 响应不同的内容
  let pathname = url.parse(req.url).pathname

  if(pathname == '/') {
    pathname = '/index.html'
  }
  
  // 获取文件的后缀名，设置对应的content-type
  var extname = path.extname(pathname)
  res.writeHead(200, {
    "Content-Type": `${getMime(extname)};charset='utf-8'`
  })

  if (pathname !== '/favicon.ico') {

    fs.readFile(`static${pathname}`, function (err, data) {
      if (err) {
        console.log(err)
        res.end('404')
        return false
      } else {
        res.write(data)
        res.end()
      }
    })

  }

}).listen(3000)

console.log(`程序启动了：http://localhost:3000`)

// nodejs 是没有web 容器的，要部署静态站点需要自己实现
// res响应对应的资源，需要设置对应的 `Content-Type`