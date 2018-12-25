/**
 * 更新制定url中的某个参数，如果没有该参数则添加参数
 * @param url
 * @param arg
 * @param val
 **/
function addStamp(url, arg, val){
  let pattern = arg+'=([^&]*)'
  let reg = new RegExp('('+pattern+')','g')
  let replaceText = arg+'='+val
  return url.match(pattern) ?
    url.replace(reg, replaceText) :
    (url.match('[?]') ?
      url+'&'+replaceText :
      url+'?'+replaceText)
}

/**
 * 一定间隔之后再访问页面会自动更新时间戳
 * @param seconds
 */
function setReload(seconds){
  if((Date.now() - localStorage.getItem(document.title))  > seconds*1000){
    location.href = addStamp(location.href,'_',Date.now())
    // 这样保证间隔seconds秒之后肯定会刷新链接
    localStorage.setItem(document.title,Date.now())
  }
}

setReload(3)