import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/homepage'
import querypage from '@/components/querypage'
import userpage from '@/components/userpage'
import dialogpage from '@/components/dialogpage'
import layout from '@/components/layout'
import login from '@/components/login'
import signin from '@/components/signin'
import signsetting from '@/components/signsetting'
import forget from '@/components/forgetpwd'
import forgetset from '@/components/forgetset'
import changepwd from '@/components/changepwd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
        login:login
      }
  },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [
          {
            path: '/layout/home',
            name: 'homepage',
            component: HelloWorld
          },
          {
            path: '/layout/query',
            name: 'query',
            component: querypage
          },
          {
            path: '/layout/user',
            name: 'user',
            component: userpage
          },
          {
            path: '/layout/dialog',
            name: 'dialog',
            component: dialogpage
          }

      ]
    },
    {
      path: '/signin',
      name: 'signin',
      components: {
        login:signin
      }
    },
    {
      path: '/signsetting',
      name: 'signsetting',
      components: { login:signsetting }
    },
    {
      path: '/forget',
      name: 'forget',
      components: { login: forget }
    },
    {
      path: '/forgetset',
      name: 'forgetset',
      components: { login: forgetset }
    },
    {
      path: '/changepwd',
      name: 'changepwd',
      components: { login: changepwd }
    }
  ]
})
