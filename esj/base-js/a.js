
/**
 * 给数组原型上增加一个删除重复元素的方法
 */
Array.prototype.distinct = function () {
  let newArr = []
  this.forEach(item => {
    if (newArr.indexOf(item) === -1) {
      newArr.push(item)
    }
  })
  return newArr
}
/**
 * 可以使用es6语法中的set实现数组去重复
 * @param {*} arr 
 */
function distinct(arr){
  return Array.from(new Set(arr))
}

/**
 * 模拟对象但调用
 * todo 这个还有带你问题，到底怎么模拟对象的引用呢？
 * 实现如下功能
    var object = {
      b: { c: 4 }, d: [{ e: 5 }, { e: 6 }]
    };
    console.log(parse(object, ‘b.c’) == 4) //true
    console.log(parse(object, ‘d[0].e’) == 5) //true
    console.log(parse(object, ‘d.0.e’) == 5) //true
    console.log(parse(object, ‘d[1].e’) == 6) //true
    console.log(parse(object, ‘d.1.e’) == 6) //true
    console.log(parse(object, ‘f’) == ‘undefined’) //true
 */
var object = {
  b: { c: 4 }, d: [{ e: 5 }, { e: 6 }]
 }

 function parse (obj,key){
   let newKey = key.replace(/\[/g,'.').replace(/\]/g,'')
   newKey.split('.').map((item)=>obj=obj[item.trim()])
  return obj || 'undefined'
 }

/**
 * 通过动态添加script标签引用js资源
 * @param {*} url 
 * @param {*} callback 
 */
 function loadjs(url, callback){
  var script = document.createElement ("script");
  callback = callback || function(){};
  script.type = "text/javascript";
  if(script.readyState){
      script.onreadystatechange = function(){
          if(script.readyState == "loaded" || script.readyState == "complete"){
              script.onreadystatechange = null;
              callback();
          }
      };
  } else {
      script.onload = function(){
          callback();
      };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
/**
 * 动态调价css
 * @param {*} url 
 */
function loadcss(url){
  var cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.rev = "stylesheet";
  cssLink.type = "text/css";
  cssLink.media = "screen";
  cssLink.href = url;
  document.getElementsByTagName("head")[0].appendChild(cssLink);
}