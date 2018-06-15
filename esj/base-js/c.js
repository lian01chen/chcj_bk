/**
 * 查看页面中使用了哪些标签
 * @returns {Array}
 */
function countTag() {
  let tags = document.querySelectorAll('*')
  let tagList = Array.prototype.slice.call(tags)
  let arr = []
  tagList.forEach(item => {
    if (item.nodeType === 1 && arr.indexOf(item.nodeName) === -1) {
      arr.push(item.nodeName)
    }
  })
  return arr
}

// 伪数组转数组
function toArray(a, b) {
  console.log(...arguments, Array.prototype.slice.call(arguments))
}

function sum(num) {
  if (num <= 0) {
    return 1
  } else {
    return num + arguments.callee(num - 1)
  }
}

/**
 * promise.race 模拟接口超时，fetch不提供超时处理 
 */
let quels = 'http://10.198.194.172/vip-loan-admin-webapp/main/getUserInfo.htm?_=1528954838825'
function request(url, params, timeout) {
  let abortFn = null
  let fetchPromise = fetch(url, params)
  let abortPromise = new Promise(function (resolve, reject) {
    abortFn = function () {
      reject({
        reject: true,
        url: url,
        params: params
      })
    }
  })

  if (fetch.timeout) {
    return fetchPromise
  }

  let abortablePromise = Promise.race([
    fetchPromise,
    abortPromise
  ])
  setTimeout(() => {
    abortFn()
  }, timeout || 30000)

  return abortablePromise
}
request(quels, {}, 20)

/**
 * 循环、setTimeout与闭包
 */
for (var i = 1; i < 5; i++) {
  (function (num) {
    setTimeout(() => {
      console.log(num)
    }, num * 1000)
  })(i)
}

/**
 * 组合继承
 * @param {*} name 
 */
function Parent(name){
  this.name = name
  this.books = [1,2,3,4]
}
Parent.prototype.getAge = function(){
  console.log(this.age)
}

function Child (name ,time ){
  //构造器继承
  Parent.call(this,name)
  this.time = time
}
//类式继承
Child.prototype = new Parent()

let c1 = new Child('aa',12)
let c2 = new Child('bb',13)

