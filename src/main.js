// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import Chat from "vue-beautiful-chat";
import axios from "axios";
import VueSession from "vue-session"; 
Vue.use(VueSession);
Vue.prototype.$ajax = axios;
axios.defaults.baseURL = 'http://192.168.95.114:8081';
//这是用来测试的一句话

// axios.defaults.withCredentials = true

// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   let email = this.$session.get("email"); // 从session中获取email
//   config.headers['Email'] = email; // 将email添加到请求头中
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   console.log(error);
//   return Promise.reject(error);
// });

// axios.defaults.headers.common['email'] = '123456@qq.com'
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(Chat);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
axios.defaults.headers.common['email'] = Vue.prototype.$session.get("email");

// router.beforeEach((to, from,next) => {
//   // ...
//   // 返回 false 以取消导航
//   if ((to.name === 'login'||to.name==='signsetting')&&(from.name!=='user'&&from.name!=='signin')) {
//     return false;
//   }
//   else {
//     next();
//   }
// })
// 每次进行路由跳转时都会执行
// router.beforeEach(function(to,from,next){
//   // 注意写在此处起不到禁用返回的功能，因为这是在跳转前执行，路由还能拿到跳转之前的上一页数据
//   next();
// })

// // 进行路由跳转后执行
// router.afterEach(function(to,from){
//   // 跳转后清除一下上一页的数据
//   history.pushState(null, null, location.href);
//   next();
// })
// let backlen = 1;
// 			window.history.go(- backlen);
// 			this.$router.replace('/', () => {
// 				window.location.reload()
// 			})
