const mime = require('../../assets/mime.json')
console.log(mime)

module.exports = function(extname) {
  return mime[extname]
}