const http  = require('http') 
var url = require('url')
var items = []
const server = http.createServer((req,res)=>{
  switch (req.method){
    case 'POST':
      var item = ''
      // req.setEncoding('utf8')
      req.on('data',function(chunk){
        item += chunk
      })
      req.on('end',function(){
        items.push(item)
        res.end('OK\n')
      })
      break
    case 'GET':
      // items.forEach((item,i)=>{
      //   res.write(i+') ' + item + '\n')
      // })
      var body = items.map((item,i)=>{
        return i + ')' + item
      }).join('\n')
      res.setHeader('Content-Length',Buffer.byteLength(body))
      res.end(body)
      break
    case 'DELETE': // TODO 怎么用curl删除一条数据
      var path = require('url').parse(req.url).pathname
      var i = parseInt(path.slice(1),10)
      if(isNaN(i)){
        res.statusCode = 400
        res.end('Invalid item id')
      }else if(!items[i]){
        res.statusCode = 404
        res.end('Item not found')
      } else{
        items.splice(i,1)
        res.end('OK\n')
      }
      break
  }
  
})
server.listen(3000)
