var cheerio = require("cheerio");
var http = require("http");
var fs = require("fs");

var options="http://www.sysu.edu.cn/2012/cn/jgsz/yx/index.htm";
var htmlData=""
var req=http.request(options,function(res){
    res.on("data",function(chunk){
        htmlData+=chunk;
    });
    res.on("end",function(){
        var $=cheerio.load(htmlData);
        var textcontent=$("tr").text();
        fs.writeFile("./school.txt",textcontent,"utf-8",function(err, data) {
          if(err){
            return false
          }else{
            console.log('写入成功了')
          }
        })
    });
});
req.end();