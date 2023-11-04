import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/homepage'
import querypage from '@/components/querypage'
import userpage from '@/components/userpage'

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
    },
    {
      path: '/user',
      name: 'user',
      component: userpage
    }
  ]
})
