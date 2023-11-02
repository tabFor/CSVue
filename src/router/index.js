import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/homepage'
import querypage from '@/components/querypage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HelloWorld
    },
    {
      path: '/query',
      name: 'Layout',
      component: querypage
    }
  ]
})
