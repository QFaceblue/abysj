// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//import axios from 'axios'
import vueResource from 'vue-resource'
Vue.use(vueResource);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入自己编写的全局的css和滑动验证的js文件
import '../static/global/global.css'
import '../static/global/gt.js'
Vue.config.productionTip = false
import store from './vuex/store.js'
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {  // 判断该路由是否需要登录权限
      if (store.state.isLogin) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              //query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

//Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
