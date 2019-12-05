var paths = [
  ["好身材", "/question/297715922/answer/520615441"],
  ["好身材2", "/question/328457531/answer/733560542"],
  ["大长腿", "/question/285321190/answer/657375937"],
  
]
console.log(paths[1])
var options = {
  hostname: 'www.zhihu.com',
  port: 443,
  path: paths[1][1],
}

module.exports = {
  options,
  staticPath: paths[1][0]
}