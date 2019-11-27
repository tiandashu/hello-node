const http = require('http')
const url = require('url')

http.createServer(function(req, res) {
  let href = url.parse( req.url )
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  console.log(req.url)
  
  res.write(req.url)
  res.write(href.pathname)
  res.end("哈哈哈哈，我买了一个iPhone8s898888")
}).listen(3000)

console.log('node服务已经启动：http://localhost:3000')