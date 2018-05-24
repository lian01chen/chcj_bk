class Promise {
  constructor(){
    this.callbacks = []
    this.oncatch = null
  }
  reject(result){
    this.complete('reject',result)
  }
  resolve(result){
    this.complete('resolve',result)
  }
  complete(type,result){
    if(type==='reject' && this.oncatch){
      this.callbacks = []
      this.oncatch(result)
    } else if(this.callbacks[0]) {
      let handlerObj = this.callbacks.shift()
      if(handlerObj[type]){
        handlerObj[type](result)
      }
    }
  }
  then(onsuccess,onfail){
    this.callbacks.push({
      resolve:onsuccess,
      reject:onfail,
    })
    return this
  }
  catch(onfail){
    this.oncatch = onfail
    return this
  }
}

let promise  = new Promise()
fn1().then(function(data){
  console.log(data)
})
.catch(onerror)

function fn1(){
  setTimeout(function(){
    if(Math.random()>0.5){
      promise.resolve('杭州')
    } else {
      promise.reject('fn1 error')
    }
  })
}