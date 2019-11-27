var http = require('http')
var fs = require('fs')
var cheerio = require('cheerio')

var firstUrl = 'http://www.jianshu.com/';
result = [
  /*{
  chapterTitle:'', 标题
  chapterAuthor:'',作者
  chapterSee:'',阅读量
  chapterHerf:'',文章链接
  chapterContent:'',文章内容
  chapterImg:[] 文章图片
  }*/
]
function getPromise(url) {
  return new Promise(function (resolve, reject) {
    http.get(url, function (req, res) {
      var html = '';
      req.on('data', function (chunk) {
        html += chunk;
      })
      req.on('end', function () {
        resolve(html)
      })
    }).on('error', function () {
      reject();
      console.log('请求出错！');
    })
  })
}
getPromise(firstUrl)
  .then(function (page) {
    fitterFirst(page)
    //console.log(result)
    var PromiseArr = [];
    result.forEach(function (value, index) {
      PromiseArr.push(getPromise(value.chapterHerf))
    })
    Promise
      .all(PromiseArr)
      .then(function (pages) {
        pages.forEach(function (value, index) {
          //console.log(result[index])
          fitterChapter(value, result[index])
        })
        //console.log(result)
        //保存网页的标题以及文章
        saveFile(result)
      })
  })



function fitterFirst(data) {  //第一次请求
  var $ = cheerio.load(data);
  var parent = $('.note-list li');
  parent.each(function (item) {
    var json = {
      chapterTitle: $(this).find('a.title').text(),
      chapterAuthor: $(this).find('a.nickname').text(),
      chapterSee: $(this).find('.collection-tag').next().text().trim(),
      chapterHerf: 'http://www.jianshu.com' + $(this).find('a.title').attr('href'),
      chapterContent: '',
      chapterImg: []
    }
    result.push(json)
  })
}
function fitterChapter(data, obj) {
  var $ = cheerio.load(data);
  obj.chapterContent = $('.show-content').text().trim();
  var parent = $('.show-content img');
  parent.each(function (item) {
    obj.chapterImg.push($(this).prop('data-original-src'))
  })
}
//保存资源
function saveFile(obj) {
  fs.mkdir('upload', function (err) {
    if (err) console.log('该文件目录已存在!');
    obj.forEach(function (value, index) {
      var mkdirFile = fitterStr(value.chapterTitle) + '_By' + value.chapterAuthor;
      fs.exists('./upload/' + mkdirFile, function (res) {
        if (res) {
          console.log('###该文件夹' + mkdirFile + '已经存在执行下一条记录')
          console.log('-----------------------')
        } else {
          fs.mkdir('./upload/' + mkdirFile, function (err) {
            console.log('创建' + mkdirFile + '文件夹成功');
            console.log('-----------------------')
            fs.mkdir('./upload/' + mkdirFile + '/uploadImg', function () {
              fs.writeFile('./upload/' + mkdirFile + '/' + mkdirFile + '.txt', value.chapterContent, function () {

              })
              if (value.chapterImg[0] != null) {
                var i = 0;
                value.chapterImg.forEach(function (value2) {
                  saveImg(value2, './upload/' + mkdirFile + '/uploadImg/' + mkdirFile + '【' + i + '】.jpg')
                  i++;
                })
              }
            })
          })
        }
      })

    })
  })
}
function fitterStr(str) {
  if (str.indexOf('|') >= 0) {
    return str.split('|').join('&');
  } else if (str.indexOf(':') >= 0) {
    return str.split(':').join('&');
  } else if (str.indexOf('?') >= 0) {
    return str.split('?').join('&');
  }
  return str;
}
function saveImg(url, path) {
  http.get('http:' + url, function (req, res) {
    var imgData = '';
    req.setEncoding('binary');
    req.on('data', function (chunk) {
      imgData += chunk;
    })
    req.on('end', function () {
      fs.writeFile(path, imgData, 'binary', function (err) {
        console.log('保存图片成功' + path)
      })
    })
  })
}