var CheckObject = function () {
  this.checkName = function () {
  }
  this.checkEmail = function () {
  }
  this.checkPassword = function () {
  }
}
var CheckObject = function () {}
CheckObject.prototype = {
  checkName: function () {
    console.log('checkName')
    return this
  },
  checkEmail: function () {
    console.log('checkEmail')
    return this
  },
  checkPassword: function () {
    console.log('checkPassword')
    return this
  }
}
let a = new CheckObject()
a.__proto__ === CheckObject.prototype  // true

Function.prototype.addMethod = function(name,fn){
  this[name] = fn
  return this
}