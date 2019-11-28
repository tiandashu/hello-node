var http = require("http");
// options常用的参数有
// host、port（默认为80）、method（默认为GET）、
// path（请求的相对于根的路径，默认是“/”， 其中querystring应该包含在其中，例如/search?query=byvoid）
// headers（请求头内容）

var options = {
    hostname: "www.baidu.com",
    port: 80
}

var req = http.request(options, function(res) {
    res.setEncoding("utf-8");
    res.on("data", function(chunk) {
        console.log(chunk.toString())
    });

    // console.log('状态码', res.statusCode);
});
req.on("error", function(err) {
    console.log(err.message);
});
req.end();