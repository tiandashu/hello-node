// 抓取思路：抓取网站图片
// 1、发送请求 -》 获得页面 -》 解析页面 -》 下载内容 -》 存储内容

const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const cheerio = require("cheerio")
const mimeTypes = require('../../assets/mime.json')


// server
let server = http.createServer(function(req, res){
  
  let pathname = url.parse(req.url).pathname
  if(pathname == '/') {
    pathname = '/index.html'
  }
  let mimeType = mimeTypes[path.extname(pathname)]

  if(pathname !== './favicon.ico') {
    res.writeHead(200, {
      "Content-Type": `${mimeType};charset='utf-8'`
    })
    
    res.write('index page')
    res.end()
  }

})
server.listen(4000)
console.log('http://localhost:4000')

// client
let htmlData = ''
let options = {
  host: 'www.meizitu.com',
  port: 80,
  path: '/a/5519.html',
  method: 'GET',
  headers: {
    
  }
}
let client = http.request(options, function(res) {
  res.on('data',function(chunk){
    htmlData += chunk
  })
  res.on('end',function() {
    console.log('end')
  })
  
})

client.end()