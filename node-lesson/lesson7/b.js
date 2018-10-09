var http = require('http')
var count = 0
var server = http.createServer((req, res)=>{
  let path = require('url').parse(req.url).pathname
  if(path === '/favicon.ico')return ///浏览器会默认请求一次favicon.ico，否则会每次增加2
  count++
  res.write('access '+count+'times')
  res.end()
})

server.listen(3000)
