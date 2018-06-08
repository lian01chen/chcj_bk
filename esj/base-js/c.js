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