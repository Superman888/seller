// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//注册vueRouter script src='../vue-router.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//注册VueResource script src='../vue-VueResource.js'
import VueResource from 'vue-resource';
Vue.use(VueResource);

//组件
import goods from "./components/goods/goods.vue"
import ratings from "./components/ratings/ratings.vue"
import seller from "./components/seller/seller.vue"

Vue.config.productionTip = false

//定义组件的路由
const routes = [
{ path:'',redirect:'/goods'},
{ path:'/goods',component:goods},
{ path:'/ratings',component:ratings},
{ path:'/seller',component:seller}
]
const router= new VueRouter({
   routes,
   linkActiveClass: 'active'
})

/* eslint-disable no-new */
// 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
