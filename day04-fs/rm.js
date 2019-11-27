const fs = require('fs')

// 删除文件
fs.unlink('kmkk.js', function( err ) {
  if ( err ) {
    console.log( err )
    return false
  } else {
    console.log( '删除文件' )
  }
})


// 删除文件夹
// 最好在删除之前再确认一下
fs.rmdir('kkk', function( err ) {
  if ( err ) {
    console.log( err )
    return false
  } else {
    console.log( '删除文件夹' )
  }
})