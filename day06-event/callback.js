const fs = require('fs')

function getJson(cb) {
  fs.readFile('./package.json', function(err, data) {
    if(err) {
      console.log(err)
      return false
    }else{
      cb(data)
    }
  })
}
getJson(function(data){
  console.log(data)
})
