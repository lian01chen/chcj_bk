import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Flex from '../views/Flex.vue'

Vue.use(Router)

const routeParams = {
  mode: 'history',
  routes: [{
    path: '/home',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: {
      title: '首页'
    }
  }, {
    path: '/flex',
    name: 'Flex',
    component: Flex,
    meta: {title: 'flex test'}
  }
  ]
}
const router = new Router(routeParams)

/**
 * 进入后触发，已经跳转，没有next方法
 */
router.afterEach((to) => {
  document.title = to.meta.title
})
/**
 * 跳转前，全局前置路由
 */
router.beforeEach((to, from, next) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(resolve(11), 20)
  })
  promise.then(res => {
    if (res === 11) {
      next()
    } else {
      next()
    }
  })
})

export default router

