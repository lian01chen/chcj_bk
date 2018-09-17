const Layer = require('./layer')
const Route = require('./route')
const http = require('http')

var Router = function () {
  this.stack = [new Layer('*', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('404')
  })]
}

Router.prototype.handles = function (req, res) {
  var self = this,
    method = req.method

  for (var i = 0, len = self.stack.length; i < len; i++) {
    if (self.stack[i].match(req.url) &&
      self.stack[i].route && self.stack[i].route._handles_methods(method)) {
      return self.stack[i].handle_requestss(req, res)
    }
  }

  return self.stack[0].handle_requestss(req, res)
}


Router.prototype.route = function route (path) {
  var route = new Route(path)

  var layer = new Layer(path, function (req, res) {
    route.dispatch(req, res)
  })

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