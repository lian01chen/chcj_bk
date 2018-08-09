// store modules
import * as  types  from '../types'
export default {
  namespaced:true,
  state: () => ({
    count: 0,
    text:'state-foo'
  }),
  actions: {
    incAction({commit}){
      commit('INC_COUNTS')
    }
  },
  mutations: {
    [types.INC_COUNTS]: state => {
      state.foo.count++
    }
  }
}