const fs = require('fs')

// 读取文件
fs.readFile('./logs/log1.text', function( err, data ) {
  if( err ) {
    console.log( err )
    return false
  } else {
    console.log( `读取文件内容数据` )
    // data是二进制内容, 可以通过toString() 或者拼接字符串直接转成字符串
    console.log( data ) // <Buffer 74 68 69 73 20 69 73 20 61 20 6c 6f 67 31 20 0a 74 68 69 73 20 69 73 20 61 20 6c 6f 67 32 20 0a>
  }
})

// 读取文件夹
fs.readdir('./logs', function( err, data ) {
  if( err ) {
    console.log( err )
    return false
  } else {
    console.log( `读取文件夹` )
    console.log( data )
    data.forEach( item => {
      fs.readFile('./logs/'+item, function( err, data ) {
        if( err ) {
          console.log( err )
          return false
        } else {
          console.log( `读取文件内容数据` )
          // data是二进制内容, 可以通过toString() 或者拼接字符串直接转成字符串
          console.log( data ) // <Buffer 74 68 69 73 20 69 73 20 61 20 6c 6f 67 31 20 0a 74 68 69 73 20 69 73 20 61 20 6c 6f 67 32 20 0a>
        }
      })
    })
  }
})

// 重命名
// 可以用来移动文件
fs.rename('./demos/index.html', './logs/index11.html', function( err ) {
  if( err ) {
    console.log( err )
    return false
  } else {
    console.log( '重命名成功')
  }
})