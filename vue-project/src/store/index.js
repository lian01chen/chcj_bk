import Vue from 'vue'
import Vuex from 'vuex'

let state = {
  items:{}
}
let getters = {

}

let actions = {
  fetchItem ( {commit}, id){
    return new Promise(( resolve,reject)=>{
      resolve(1)
    }).then(item=>{
      commit('setItem',{id,item})
    }).catch(()=>{
      throw new Error()
    })
  }
}

let mutations = {
  setItem(state,{id,item}){
    Vue.set(state,'items',`${id}-${item}`)
  }
}

// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// }
Vue.use(Vuex)
export default function () {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
  })
}