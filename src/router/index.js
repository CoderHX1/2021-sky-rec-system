import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main
    }

  ]
})
// 挂载
/*router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next()放行   next(' /login')强制跳转       
  if (to.path === '/') return next()
  const tokenStr = localStorage.getItem('key')
 
  //const tokenStr = window.sessionStorage.getItem("token")
  if (tokenStr != 0) return next("/")
  next()

})*/

export default router

