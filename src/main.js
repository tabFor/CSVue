// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Chat from 'vue-beautiful-chat'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Chat)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from,next) => {
  // ...
  // 返回 false 以取消导航
  if (to.name === 'login'&&from.name!=='user') {
    return false;
  }
  else {
    next();
  }
})