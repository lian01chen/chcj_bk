var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')
var root = __dirname

var server = http.createServer((req, res)=>{
  let url = parse(req.url)
  let path = join(root,url.pathname) // 在这里拿到了请求文件的绝对路径
  // 提前校验被访问是否存在
  fs.stat(path,(err,stat)=>{
    if(err){
      err === 'ENOENT' ? res.statusCode = 404 && res.end('Not Fund'):res.statusCode = 500 && res.end('Internal Server Error')
    } else{
      res.setHeader('Content-Length', stat.size)
      let file = fs.createReadStream(path)
      file.pipe(res)
      file.on('error',error=>{
        res.statusCode = 500
        res.end('Internal Server Error')
      })
    }
  })
})
server.listen(3000)
