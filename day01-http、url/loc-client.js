const http = require('http')

let options = {
    host: 'localhost',
    port: 3000,

}
let str = ''
    // 方法一
    // const req = http.request(options)
    // req.on('response', function(res) {
    //     res.setEncoding("utf-8");
    //     res.on("data", function(chunk) {
    //         str += chunk.toString()
    //         console.log(chunk.toString())
    //         console.log(str)
    //     });
    //     console.log('状态码：', res.statusCode);
    // })
    // 方法二
const req = http.request(options, function(res) {
    res.setEncoding("utf-8");
    res.on("data", function(chunk) {
        str += chunk.toString()
        console.log(chunk.toString())
        console.log(str)
    });
    console.log('状态码：', res.statusCode);
})

req.on("error", function(err) {
    console.log(err.message);
});

req.end();