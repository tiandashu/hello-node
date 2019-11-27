const fs = require('fs')

// 适合操作大文件
// 以流的方式写入文件，如果不存在会新建
let writeStream = fs.createWriteStream('output.text')

let str = 'this is input text'
for(let i = 0; i <= 100; i++ ){
  writeStream.write(str + i + '\n', 'utf-8')
}

writeStream.end()

writeStream.on('finish', function( ) {
  console.log('finish')
})

writeStream.on('error', function( ) {
  console.log('error')
})