const Layer = require('./layer')
const Route = require('./route')

function Router (){
  // this.stack = [{
  //   path:'*'
  //   ,method:'*'
  //   ,handle:function(req,res){
  //     res.writeHead(200,{'Content-Type':'text/plain'})
  //     res.end('404')
  //   }
  // }]
  this.stack=[new Layer('*', function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('404')
  })]
}
Router.prototype.get = function(path,fn){
  let route = this.route(path)
  route.get(fn)
  return this
  // this.stack.push({
  //   path
  //   ,method:'GET'
  //   ,handle:fn
  // })
  // this.stack.push(new Layer(path,fn))
}

Router.prototype.handle = function(req,res){
  let self = this
    ,method = req.method

  for(var i=1,len=this.stack.length;i<len;i++){
    // if((req.url === this.stack[i].path || this.stack[i].path === '*') &&
    //     (req.method === this.stack[i].method || this.stack[i].method === '*')){
    //   return this.stack[i].handle && this.stack[i].handle(req,res)
    // }
    if(self.stack[i].match(req.url) &&
      self.stack[i].route && self.stack[i].route._handles_method(method)){
      return self.stack[i].handle_request(req,res)
    }
  }
  return self.stack[0].handle_request(req,res)
}

Router.prototype.route = function(path){
  let route = new Route(path)
  var layer = new Layer(path,function(req,res){
    route.dispatch(req,res)
  })
  layer.route = route
  this.stack.push(layer)
  return route
}

exports = module.exports = Router