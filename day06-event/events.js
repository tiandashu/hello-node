const events = require('events')

const EventEmitter = new events.EventEmitter()

EventEmitter.on('eat', function(data) {
  console.log(data)
})

setTimeout(()=>{
  EventEmitter.emit('eat', 'apple')
},3000)

// 类似浏览器中的事件监听模型,或者jq中的on - trigger
