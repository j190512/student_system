import Vue from 'vue'
import app from './app.vue'
import routes from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import './styles/global.styl'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter({
    routes
})

// 解决重复点击导航路由报错 element ui 的 el-menu-item 
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

new Vue({
    router,
    render: (h)=>h(app)
}).$mount('#root')