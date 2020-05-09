const http = require('http')
const url = require('url')
const ejs = require('ejs')
const client = require('./src/client')


http.createServer(function(req, res) {
  let pathname = url.parse(req.url, true).pathname
  res.writeHead(200, {
    "Content-Type": "text/html;charset='utf-8"
  })
  client(function(data){
    ejs.renderFile('./views/zhihu.ejs', {
      title: 'zhihu',
      imgList: data
    }, function(err, data) {
      if(err){
        console.log(err)
        return false
      }
      res.write(data)
      res.end()
    })
  })

}).listen(3001, function(err){
  if(err){
    console.log(err)
    return false
  }
  console.log('http://localhost:3001')
})