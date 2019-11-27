const fs = require('fs')

// 判断文件类型
fs.stat('./demos', ( err, stats ) => {
  if( err ) {
    console.log(err)
    return false
  } else {
    console.log(`文件类型${stats}`)
    console.log(`文件夹${stats.isDirectory()}`)
    console.log(`文件${stats.isFile()}`)
  }

})

// 创建目录
// 参数：
// - path：创建的目录路径
// - mode：目录权限（读写），默认0777
// - callback：
// fs.mkdir('logs', (err) => {
//   if(err) {
//     console.log(err)
//     return false
//   } else {
//     console.log(`创建目录成功了`)
//   }
// })


// 写入文件
fs.writeFile('logs/log1.text', 'this is a log1 \n', function( err ) {
  if( err ) {
    console.log( err )
    return false
  } else {
    console.log( `写入文件成功！` )
  }
})

// 追加文件
fs.appendFile('logs/log1.text', 'this is a log2 \n', function( err ) {
  if( err ) {
    console.log( err )
    return false
  } else {
    console.log( `追加文件成功！` )
  }
})

