const Layer = require('./layer')
const Route = require('./route')
const http = require('http')

var Router = function () {
  this.stack = []
}

Router.prototype.handles = function (req, res,done) {
  var self = this,
    method = req.method
    , idx = 0
    , stack = self.stack

  // for (var i = 0, len = self.stack.length; i < len; i++) {
  //   if (self.stack[i].match(req.url) &&
  //     self.stack[i].route && self.stack[i].route._handles_methods(method)) {
  //     return self.stack[i].handle_requestss(req, res)
  //   }
  // }
  //
  // return self.stack[0].handle_requestss(req, res)
  function next(err){
    let layerError = (err==='route'?null:err)
    if(layerError === 'router'){
      return done(null)
    }
    if(idx >= stack.length || layerError){
      return done(layerError)
    }
    let layer = stack[idx++]
    if(layer.match(req.url) && layer.route && layer.route._handles_methods(method)){
      return layer.handle_requestss(req,res,next)
    }else{
      next(layerError)
    }
  }
  next()
}


Router.prototype.route = function route (path) {
  var route = new Route(path)

  var layer = new Layer(path, route.dispatch.bind(route))

  layer.route = route

  this.stack.push(layer)

  return route
}


// Router.prototype.get = function(path, fn) {
//   var route = this.route(path)
//   route.get(fn)
//
//   return this
// }
http.METHODS.forEach(function (method) {
  method = method.toLowerCase()
  Router.prototype[method] = function (path, fn) {
    var route = this.route(path)
    route[method].call(route, fn)

    return this
  }
})
exports = module.exports = Router