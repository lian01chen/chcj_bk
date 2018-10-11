/**
 * 读取一个文件，然后将内容写入到另外一个文件
 */
var http = require('http')
var fs = require('fs')
var server = http.createServer((req, res)=>{
  fs.readFile('b.js','utf8',(err,data)=>{
    if(err) throw err 
    fs.writeFileSync('d.js',data,{encodeing:'utf8',flag:'w+'},error=>{
      if(error) throw error
    })
    res.end()
  })
})

server.listen(3000)
