//定义一个发布者
let pub = {
  publish: function () {
    dep.notify()
  }
}
// 定义三个订阅者
let sub1 = {
  update: function () {
    console.log(1)
  }
}
let sub2 = {
  update: function () {
    console.log(2)
  }
}
let sub3 = {
  update: function () {
    console.log(3)
  }
}

//一个主题对象
function Dep() {
  this.subs = [sub1, sub2, sub3]
}

Dep.prototype.notify = function () {
  this.subs.forEach(sub => {
    sub.update()
  })
}

let dep = new Dep()
pub.publish()