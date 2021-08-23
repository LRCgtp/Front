import Vue  from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import Login from '../components/login/Login.vue'
import Client from '../components/manager/Client.vue'
import ExceptionPage from '../components/error/ExceptionPage.vue'

Vue.use(VueRouter)
const router= new VueRouter({
  routes: [
    {
      path:"/home",
      component: Home,
      children: [
        {
          path: "views/center",
          component: Client
        }
      ]
  },
  {
    path:"/login",
    component: Login
}
  ]
})
//路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/account/login' || to.path=='/login') next()
  if(window.sessionStorage.getItem("token")==null){
    next('/login')
  }
  next();  
  })

export default router
