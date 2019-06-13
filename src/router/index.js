import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Resource from '@/components/Resource'
import Lab from '@/components/Lab'
import Asklab from '@/components/Asklab'
import Activity from '@/components/Activity'
import Login from '@/components/Login'
import NewLogin from '@/components/NewLogin'
import Message from '@/components/Message'
import Detail from '@/components/Detail'
import User from '@/components/User'
  import UserInfo from '@/components/UserInfo'
  import UserAct from '@/components/UserAct'
  import UserAsk from '@/components/UserAsk'
  import UserApp from '@/components/UserApp'
  import UserRecord from '@/components/UserRecord'
Vue.use(Router)
const router = new Router({
  // linkActiveClass:'is-active',
  linkActiveClass: 'is-active',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      redirect:'/home'
      // component: HelloWorld
    },
    {
    	path:"/home",
    	name:'Home',
    	component:HelloWorld
    },
    {
    	path:"/resource",
    	name:'Resource',
    	component:Resource
    },
    {
    	path:"/lab",
      name:'Lab',
    	component:Lab
    },
    {
    	path:"/asklab",
      name:'Asklab',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    	component:Asklab
    },
    {
    	path:"/acticity",
    	name:'Activity',
    	component:Activity
    },
    {
    	path:"/login",
    	name:'Login',
    	component:NewLogin
    },
    {
    	path:"/message",
    	name:'Message',
    	component:Message
    },
    {
    	path:"/detail",
    	name:'Detail',
    	component:Detail
    },
    {
    	path:"/user",
      // name:'User',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:User,
      children:[
        { path: '', 
        component: UserInfo
        },
        {
          path: 'info',
          component: UserInfo
        },
        {
          path: 'act',
          component: UserAct
        },
        {
          path: 'ask',
          component: UserAsk
        },
        {
          path: 'record',
          component: UserRecord
        },
        {
          path: 'app',
          component: UserApp
        }
      ]
    },
    {
    	path:"*",
    	component:HelloWorld
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (store.state.isLogin) {  // 通过vuex state获取当前的token是否存在
//           next();
//       }
//       else {
//           next({
//               path: '/login',
//              // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })

export default router
