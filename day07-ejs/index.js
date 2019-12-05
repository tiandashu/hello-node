const http = require('http')
const router = require('./src/router')
// 静态资源服务器


http.createServer(function(req, res) {
  // 路由模块
  router(req, res, 'static')

}).listen(3000, function(err){
  if(err) {
    console.log(err)
    return false
  } else {
    console.log('启动成功了')
  }
})