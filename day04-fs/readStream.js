const fs = require('fs')

// 适合操作大文件
let readStream = fs.createReadStream('input.text')

let str = ''
readStream.on('data', function( chunk ) {
  str += chunk
})

readStream.on('end', function( chunk ) {
  console.log('end')
  console.log(str)
})

readStream.on('error', function( chunk ) {
  console.log('error')
})