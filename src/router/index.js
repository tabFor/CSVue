import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/homepage";
import querypage from "@/components/querypage";
import userpage from "@/components/userpage";
import dialogpage from "@/components/dialogpage";
import layout from "@/components/layout";
import login from "@/components/login";
import signin from "@/components/signin";
import signsetting from "@/components/signsetting";
import forget from "@/components/forgetpwd";
import forgetset from "@/components/forgetset";
import changepwd from "@/components/changepwd";
import adforgetset from "@/views/adminforgetset";
import adforgetpwd from "@/views/adminforgetpwd";
import hellopage from "@/components/hellopage";
import Main from "@/views/home";
import User from "@/views/user";
import Law from "@/views/law";
import show from "@/views/showLaw";
import advice from "@/views/adminAdvice";
import adminlogin from "@/views/adminlogin";
import adsignin from "@/views/adminregister";
import adsignsetting from "@/views/adminsignsetting";
import admininfo from "@/views/info";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "hello",
      components: { login: hellopage }
    },
    {
      path: "/admin",
      name: "admin",
      components: { layout: Main },
      children: [
        {
          path: "/admin/user",
          component: User
        },
        {
          path: "/admin/show",
          name: "showpage",
          component: show
        },
        {
          path: "/admin/law",
          component: Law
        },
        {
          path: "/admin/advice",
          component: advice
        },
        {
          path: "/admin/info",
          component: admininfo
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      components: {
        login: login
      }
    },
    {
      path: "/adminlogin",
      name: "adlogin",
      components: {
        adlogin: adminlogin
      }
    },
    {
      path: "/layout",
      name: "layout",
      components: {
        layout: layout
      },
      children: [
        {
          path: "/layout/home",
          name: "homepage",
          component: HelloWorld
        },
        {
          path: "/layout/query",
          name: "query",
          component: querypage
        },
        {
          path: "/layout/user",
          name: "user",
          component: userpage
        },
        {
          path: "/layout/dialog",
          name: "dialog",
          component: dialogpage
        }
      ]
    },
    {
      path: "/signin",
      name: "signin",
      components: {
        login: signin
      }
    },
    {
      path: "/signsetting",
      name: "signsetting",
      components: { login: signsetting }
    },
    {
      path: "/adminsignin",
      name: "adminsignin",
      components: {
        adlogin: adsignin
      }
    },
    {
      path: "/adminsignsetting",
      name: "adminsignsetting",
      components: { adlogin: adsignsetting }
    },
    {
      path: "/forget",
      name: "forget",
      components: { login: forget }
    },
    {
      path: "/forgetset",
      name: "forgetset",
      components: { login: forgetset }
    },
    {
      path: "/adminforget",
      name: "adforget",
      components: { adlogin: adforgetpwd }
    },
    {
      path: "/adminforgetset",
      name: "adforgetset",
      components: { adlogin: adforgetset }
    },
    {
      path: "/changepwd",
      name: "changepwd",
      components: { login: changepwd }
    }
  ]

});
const pathsBeforeLogin = ['/adminlogin', '/adminregister', '/', '/adminsignin', '/adminsignsetting', "/adminforget", "/adminforgetset", "/forget", "/forgetset", "/signin", "/login"];
const pathsForNormalUser = ["/changepwd", '/layout/home', '/layout/query', '/layout/dialog', '/layout/user'];
const pathsForAdminUser = ['/admin/user', '/admin/law', '/admin/advice'];

router.beforeEach((to, from, next) => {
  // 获取token
  const userType = sessionStorage.getItem('userType');
  const isLogged = sessionStorage.getItem('isLogedin') || false;
  // if (pathsBeforeLogin.includes(to.path) || isLoggedin) {
  //   next()
  // } else {
  //   next({ name: 'hello' })
  // }  
  if (!isLogged) {
    // 未登录状态下的导航守卫逻辑
    if (pathsBeforeLogin.includes(to.path)) {
      // 允许登录前可跳转的路径
      next();
    } else {
      console.log('未登录')
      // 非法路径，重定向到根路径
      next('/');
    }
  } else {

    // 已登录状态下的导航守卫逻辑
    if (userType === 'normal' && pathsForNormalUser.includes(to.path)) {
      // 普通用户可跳转的路径
      next();
    } else if (userType === 'admin' && pathsForAdminUser.includes(to.path)) {
      // 管理员用户可跳转的路径
      next();
    } else if (userType === 'normal') {
      console.log('非法路径')
      // 非法路径，重定向到根路径
      next('/layout/home');
    } else {
      console.log('非法路径')
      // 非法路径，重定向到根路径
      next('/admin/advice');
    }
  }
})

export default router;

