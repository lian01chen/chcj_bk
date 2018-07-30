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
  },{
    path:'*',
    name:'HelloWorld',
    component: HelloWorld,
    meta: {
      title: '首页'
    }
  }]
}

// export default router

export function createRouter() {
  const router = new Router(routeParams)

  /**
   * 进入后触发，已经跳转，没有next方法
   */
  router.afterEach((to) => {
    // 用于区分客户端和服务端的，服务端是没有window，document对象
    if(typeof document !=='undefined'){
      document.title = to.meta.title
      console.log(to,document)
    }
  })
  /**
   * 跳转前，全局前置路由
   */
  // router.beforeEach((to, from, next) => {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(resolve(11), 20)
  //   })
  //   document.title = 'test'
  //   promise.then(res => {
  //     if (res === 11) {
  //       next()
  //     } else {
  //       next()
  //     }
  //   })
  // })
  return router
}
