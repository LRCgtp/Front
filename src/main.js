import Vue from 'vue'
import App from './App.vue'
import router from './router/routers.js'
import IView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/gloabel.css'
import axios from 'axios';


/**
 * @description 全局注册应用配置
 */
Vue.prototype.axios = axios;
//axios请求拦截器
axios.interceptors.request.use(
  config => {
    if (window.sessionStorage.getItem("token") !=null) {
      config.headers.Authorization = "bearer " + window.sessionStorage.getItem("token");
    }
    return config
  })
  //axios响应拦截器
  axios.interceptors.response.use(
    success => {
      console.log("相应数据"+success)
      /*
      if(success.response.status == '401') {
        debugger
          window.location.href='/login'
      }else if(success.response.status='500'){
        debugger
        window.location.href='/500'
      }
      */
      return success
    },error => {
      //对响应数据错误做操作
      console.log("错误数据响应"+error.response.error)
      /*
      if(error.response.status == '401') {
        debugger
          window.location.href='/login'
      }else if(error.response.status='500'){
        debugger
        window.location.href='/500'
      }
      */
      return Promise.reject(error);
  }); 
  
Vue.use(axios)
Vue.use(IView)

new Vue({
  router, 
  el: '#app',
  render: h => h(App)
})
