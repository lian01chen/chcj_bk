import Vue from 'vue'
import Vuex from 'vuex'

let state = {

}
let getters = {

}

let actions = {

}

let mutations = {

}

// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// }
Vue.use(Vuex)
export function createStore() {
  return new Vuex.store({
    state,
    getters,
    actions,
    mutations,
  })
}