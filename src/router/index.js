import Vue from 'vue'
import firebase from 'firebase';
import Router from 'vue-router'
import Upload from '@/components/Upload'
import Menus from '@/components/Menus'
import MenuItems from '@/components/MenuItems'
import MenuHome from '@/components/MenuHome'
import NewMenuitem from '@/components/NewMenuitem'
import NewMenu from '@/components/NewMenu'
import Account from '@/components/Account'
import HomeView from '@/components/HomeView'
import Categories from '@/components/Categories'
import CategoryHome from '@/components/CategoryHome'
import CategoryList from '@/components/CategoryList'
import MenuList from '@/components/MenuList'
import Login from '@/components/Login'
import ItemHome from  '@/components/ItemHome'
import LoginHome from  '@/components/LoginHome'
import Phone from  '@/components/Phone'
import Code from  '@/components/Code'
import Dashboard from  '@/components/Dashboard'
import BulkSMS from  '@/components/BulkSMS'
import UpdateMenu from  '@/components/UpdateMenu'
import ContactList from  '@/components/ContactList'
import BulkHome from  '@/components/BulkHome'
Vue.use(Router)

const router =  new Router({
  // mode: 'history',
  routes: [
    
    
    {
      path: '/login',
      component: Login,
      name: 'login',
      redirect: 'login/def',
      children: [
        {
          path: 'def',
          name: 'def',
          component: LoginHome
        },
        {
          path: 'phone',
          name: 'phone',
          component: Phone
        },
        {
          path: 'code',
          name: 'code',
          component: Code
        },
      ]
    },
    {
      path: '/',
      name: 'menus',
      component: Menus,
      redirect: 'all',
      children: [
        {
          path: 'newmenu',
          name: 'newmenu',
          component: NewMenu
        },
        {
          path: 'all',
          name: 'menulist',
          component: MenuList
        },

        {
          path: 'menu/:menu_id',
          name: 'menu',
          component: MenuHome,
          redirect: 'menu/:menu_id/dashboard',
          children: [
            {
              path: 'categories',
              name: 'categories',
              component: CategoryList,
            },
            {
                path: 'category/:cat_id',
                name: 'categoryhome',
                component: CategoryHome,
                redirect: 'category/:cat_id/list',
                children:[
                  {
                    path: 'newitem',
                    name: 'newitem',
                    component: NewMenuitem
                  },
                  {
                    path: 'view/:item_id',
                    name: 'item',
                    component: ItemHome
                  },
                  {
                    path: 'list',
                    name: 'itemlist',
                    component: MenuItems
                  },
                ]
            },
            {
              path: 'update',
              name: 'update',
              component: UpdateMenu
            },
            {
              path: 'dashboard',
              name: 'dashboard',
              component: Dashboard
            },
            {
              path: 'bulk',
              name: 'bulk',
              component: BulkHome,
              redirect: 'bulk/sms',
              children: [
                {
                  path: 'sms',
                  name: 'sms',
                  component: BulkSMS
                },
                
              ]
            },
            {
              path: 'contacts',
              name: 'contacts',
              component: ContactList
            },
          ]
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  console.log(currentUser);
  next()
  
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next('home');
  // else next();
});

export default router;