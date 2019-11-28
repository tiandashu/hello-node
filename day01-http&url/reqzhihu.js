var cheerio = require("cheerio");
var http = require("http");
var fs = require("fs");

var options = "http://www.zhihu.com/question/41314707";
var htmlData = ""
var req = http.request(options, function(res) {
    res.on("data", function(chunk) {
        htmlData += chunk;
    });
    res.on("end", function() {
        console.log(htmlData.toString())
        var $ = cheerio.load(htmlData);
        var textcontent = $("tr").text();
        fs.writeFile("./school.txt", textcontent, "utf-8", function(err) {

        })
    });
});
req.end();