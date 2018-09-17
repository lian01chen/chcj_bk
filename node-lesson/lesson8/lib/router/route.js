const Layer = require('./layer')
const http = require('http')

function Route (path) {
  this.path = path
  this.stack = []
  this.methods = {}
}

/**
 * 处理请求方法
 * @param method
 * @return {boolean}
 * @private
 */
Route.prototype._handles_methods = function (method) {
  var name = method.toLowerCase()
  return Boolean(this.methods[name])
}
/**
 * handle route get
 * 只实现了一个get ，其他方法没有实现，实现方法类似
 * @param fn
 * @return {Route}
 */
http.METHODS.forEach(function (method) {
  method = method.toLowerCase()
  Route.prototype[method] = function (fn) {
    var layer = new Layer('/', fn)
    layer.method = method

    this.methods[method] = true
    this.stack.push(layer)

    return this
  }
})

/**
 * handle request
 * 内部逻辑跳转
 * @param req
 * @param res
 * @return {*|void}
 */
Route.prototype.dispatch = function (req, res, done) {
  let self = this
    , method = req.method.toLowerCase()
    , idx = 0
    , stack = self.stack

  function next (err) {
    // next
    if (err && err === 'route') {
      return done()
    }

    // next to end
    if (err && err === 'router') {
      return done(err)
    }

    //
    if (idx >= stack.length) {
      return done(err)
    }

    let layer = stack[idx++]
    if (method !== layer.method) {
      return next(err)
    }

    if (err) {
      layer.handle_errors(err,req,res,next)
    } else {
      layer.handle_requestss(req, res, next)
    }
  }

  // for (let i = 0, len = self.stack.length; i < len; i++) {
  //   if (method === self.stack[i].method) {
  //     return self.stack[i].handle_requestss(req, res)
  //   }
  // }
  next()
}
exports = module.exports = Route