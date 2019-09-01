import Vue from 'vue'
import Router from 'vue-router'
import GetCategories from '@/components/GetCategories'
import UpdateCategory from '@/components/UpdateCategory'
import CreateProduct from '@/components/CreateProduct'
import CreateCategory from '@/components/CreateCategory'
import GetProducts from '@/components/GetProducts'
import LoginPage from '@/components/LoginPage'
import Cart from '@/components/Cart'
import Bills from '@/components/Bills'
import Home from '@/components/Home'
import Users from '@/components/Users'
import RegisterPage from '@/components/RegisterPage'
import { Role } from '../helpers/Role'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/categories',
      name: 'GetCategories',
      component: GetCategories,
      meta: {authorize: [Role.Admin]}
    },
    {
      path: '/admin/category/create',
      name: 'CreateCategory',
      component: CreateCategory,
      meta: {authorize: [Role.Admin]}
    },
    {
      path: '/admin/category/update/:id',
      name: 'UpdateCategory',
      component: UpdateCategory,
      props: true,
      meta: {authorize: [Role.Admin]}
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: Users,
      meta: {authorize: [Role.Admin]}
    },
    {
      path: '/product/create',
      name: 'CreateProduct',
      component: CreateProduct,
      meta: {authorize: [Role.Merchant]}
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
      props: true,
      meta: {authorize: [Role.Customer]}
    },
    {
      path: '/bills',
      name: 'Bills',
      component: Bills,
      props: true
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register/:type',
      component: RegisterPage,
      props: true
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login','/register/merchant','/register/customer'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = JSON.parse(localStorage.getItem('user'));
  const { authorize } = to.meta;

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  if (authorize && !authorize.includes(loggedIn.role)) {
    return next('/');
  }
  next();
})
