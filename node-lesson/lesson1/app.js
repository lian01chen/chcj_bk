var express = require('express')
var app = express() // 调用express实例，不带参数调用时，会返回一个express实例，将这个变量赋予app 变量

// app 本身有很多方法，包括get,post,put/patch,delete,在这里我们调用get方法，给'/'路径指定一个handler函数
// handler函数中，req，和res分别是请求的request和response对象
// req 对象包含了浏览器传来的各种信息，比如：query，body，headers等
// res 对象，我们一般不从res对象里面取信息，而是通过它来定制我们向浏览器输出的信息，比如header。这里调用它的send方法，向浏览器输出一个字符串
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 定义好app的行为之后，让它监听本地的3000端口，它有一个回调函数，会在listen成功后执行。
app.listen(3000, function () {
  // cli log msg
  console.log('app is listening at port 3000')
})