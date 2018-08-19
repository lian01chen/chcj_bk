/**
 * 实现数字千分位分割
 * @param num
 * @returns {*}
 */
function formatNum(num = 0) {
  if (isNaN(num)) return num
  let numArr = num.toString().split('.')
  let float = numArr[1] || null
  let intRev = numArr[0].split('').reverse()
  let strArr = []
  for (let i = 0; i < intRev.length; i++) {
    strArr.push(intRev[i])
    if ((i + 1) % 3 == 0 && (i + 1) !== intRev.length) {
      strArr.push(',')
    }
  }
  return float ? strArr.reverse().concat(['.'],float).join('') : strArr.reverse().join('')
}

/**
 * 防抖，在resize，scroll等事件时可以使用
 * @param fn
 * @param wait
 * @returns {Function}
 */
function debounce(fn,wait){
  var timeout = null
  return function (){
    if(timeout !== null){
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn,wait)
  }
}
function handle(){
  console.log(Math.random())
}
window.addEventListener('scroll',debounce(handle,2000))

/**
 * 函数节流
 * @param func
 * @param delay
 * @returns {Function}
 */
function throttle (func,delay){
  var timer = null
  return function (){
    if(!timer){
      timer = setTimeout(function(){
        func()
        timer = null
      },delay)
    }
  }
}
function handle(){
  console.log(Math.random())
}
// window.addEventListener('scroll',throttle(handle,1000))
// 绑定的是throttle()执行，所以也就是绑定的throttle方法return出来的方法，这样
// 可以利用闭包使用timer
window.addEventListener('scroll',throttle(handle,1000))


/**
 * 单例，只能有一个实例
 */
let Single = function(name){
  this.name = name
}
Single.prototype.getName = function(){
  return this.name
}

let getSingleInstance = (function(name){
  var instance = null
  return function(name){
    if(!instance){
      instance = new Single(name)
    }
    return instance
  } 
})()

//
for(let i = 0;i<4;i++){
  const v = i
  console.log('for->',i,'v-->',v)
}
//这个是有作用域的，在for之外，if,for都会造成块级作用域
console.log(i,v)


let arr = [1,1,2,3,4,4,5,6,6]
/**
 * 方法一，使用set数据结构实现
 * 去除数组中的重复元素
 * @param {arr} array 
 */
function deleteDuOne(array){ 
  return Array.from(new Set(array))
}
/**
 * 利用一遍遍历的方式实现有序数组的去重
 * @param {arr} array 
 */
function deleteDuTwo(array){
  let arr = []
  let item = null
  array.forEach(element => {
    if(item !== element){
      arr.push(element)
      item = element
    }
  })
  return arr
}
/**
 * 利用array中indexOf的api来实现
 * @param {arr} array 
 */
function deleteDuThree(array){
  let arr = []
  array.forEach(item=>{
    if(arr.indexOf(item)===-1){
      arr.push(item)
    }
  })
  return arr
}