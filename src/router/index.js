import Vue from 'vue'
import Router from 'vue-router'
import CreateProduct from '@/components/CreateProduct'
import GetProducts from '@/components/GetProducts'
import LoginPage from '@/components/LoginPage'
import Cart from '@/components/Cart'
import Bills from '@/components/Bills'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CreateProduct',
      component: CreateProduct
    },
    {
      path: '/category/:id',
      name: 'GetProducts',
      component: GetProducts,
      props: true
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      props: true
    },
    {
      path: '/bills',
      name: 'Bills',
      component: Bills,
      props: true
    },
    {
      path: '/login',
      component: LoginPage
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
