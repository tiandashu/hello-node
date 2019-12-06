var paths = [
  ["好身材", "/question/297715922/answer/520615441"],
  ["好身材2", "/question/328457531/answer/733560542"],
  ["好身材3", "/question/297715922/answer/710626693"],
  ["大长腿", "/question/285321190/answer/657375937"],
  ["女朋友", "/question/313825759"],
  ["现实美", "/question/29289467/answer/72898476"],
]
let index = 5

var options = {
  hostname: 'www.zhihu.com',
  port: 443,
  path: paths[index][1],
}

module.exports = {
  options,
  staticPath: paths[index][0]
}