function Layer (path, fn) {
  this.handle = fn
  this.name = fn.name || '<anonymous>'
  this.path = path
}

/**
 * 负责调用路由绑定的处理逻辑，增加next参数，并且增加异常捕获功能
 * @param req
 * @param res
 */
Layer.prototype.handle_requestss = function (req, res, next) {
  var fn = this.handle
  try{
    fn(req,res,next)
  }catch (e) {
    next(e)
  }
}

/**
 * 匹配路由
 * @param path
 * @return {boolean}
 */
Layer.prototype.match = function (path) {
  if (path === this.path || path === '*') {
    return true
  }
  return false
}

/**
 * 错误处理
 * @param error
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
Layer.prototype.handle_errors = function(error,req,res,next){
  // this.handle ? TODO handle 是实例化函数时传入fn
  let fn = this.handle
  // 如果函数参数不是标准的4个参数，返回错误
  if(fn.length !==4){
    return next(error)
  }

  try{
    fn(error,req,res,next)
  }catch(e){
    next(e)
  }

}

exports = module.exports = Layer