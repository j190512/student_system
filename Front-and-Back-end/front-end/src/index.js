import Vue from 'vue'
import app from './app.vue'
import routes from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import './styles/global.styl'
import store from './store'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter({
  // mode:'history',
  routes
})
//全局函数---避免刷新页面vuex数据丢失
import {
  getStudents
} from "./api/api";

function init() {
  // console.log("init")
  getStudents()
    .then(response => {
      if (response.data.code != "101") {
        store.commit("initData", response.data);
        return;
      }
      ElementUI.Message({
        type: "error",
        message: "请稍后尝试!"
      });
      return;
    })
    .catch((err) => {
      // console.log(err)
      ElementUI.Message({
        type: "error",
        message: "请稍后尝试!"
      });
    });
}
Vue.prototype.$init = init()

// 解决重复点击导航路由报错 element ui 的 el-menu-item 
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('admin')
  }
  if (!sessionStorage.getItem('admin') && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: (h) => h(app)
}).$mount('#root')