const http = require('http')

const server = new http.Server();
// http.Server提供的事件有：
// request：当客户端请求到来时，该事件被触发，提供两个参数req和res，表示请求和响应信息，是最常用的事件
// connection：当TCP连接建立时，该事件被触发，提供一个参数socket，是net.Socket的实例
// close：当服务器关闭时，触发事件（注意不是在用户断开连接时）

server.on('request', function (req, res) {
  res.writeHead(200, {
    "content-type": "text/plain"
  });
  res.write("hello nodejs");
  res.end();
})

server.on('connection')

server.listen(3001)
console.log('http://localhost:3001')