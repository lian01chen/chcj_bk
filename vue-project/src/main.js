// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import Focus from './directive/focus'
import { createStore }  from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.directive('focus',Focus)

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: {App},
//   template: '<App/>'
// })
export function createApp(ssrContext) {
  let router = createRouter()
  let store =  createStore()
  sync(store,router)
  const app = new Vue({
    router,
    store,
    ssrContext,
    render:h=>h(App)
  })
  return { app, router, store }
}