/**
 *  express middleware-log-msg 
 */

var express = require('express')
var app = express()
// express router 到底是什么？
var router = express.Router()
/**
 * 一个中间件就是一个函数，第三个参数固定为next参数，用来切换控制器
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
var myLogger = function (req, res, next) {
  // eslint-disable-next-line
  console.log('LOGGED')
  next()
}
/**
 * 一个增加请求时间的中间件
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(myLogger)
app.use(requestTime)

app.get('/', function (req, res) {
  res.send('Hello World!')
})
/**
 * res.send 和 res.end 有啥区别呢？
 */
app.get('/user/:id', myLogger,
  function (req, res, next) {
    console.log('ID:', req.params.id)
    next('route') // TOOD 这个next('route')为啥只能在req.methods()路由中使用
  },
  function (req, res, next) {
    res.send('User Info')
  })

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})

// 以下部分是路由层的中间件使用,其中路由层使用有两个方式：1. router.use(),2. router.METHOD()
// 其中METHOD是req.METHODS中的方法的小写。
// var middleWareDiffUser = function (req, res, next) {
//   if (req.params.id === 0) {
//     console.log('special')
//     next()
//   } else {
//     console.log('normal')
//     res.end('user id :', req.params.id)
//   }
// }
// router.use(function (req, res, next) {
//   console.log(1111)
//   next()
// })
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
// mount the router on the app
app.use('/', router)

app.listen(3000)