const fs = require('fs')

let read = fs.createReadStream('input.txt')
let write = fs.createWriteStream('outputpipe.txt')

read.pipe(write)