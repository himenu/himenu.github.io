import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/components/Upload'
import Menus from '@/components/Menus'
import MenuItems from '@/components/MenuItems'
import MenuHome from '@/components/MenuHome'
import NewMenuItem from '@/components/NewMenuItem'
import NewMenu from '@/components/NewMenu'
import Account from '@/components/Account'
import HomeView from '@/components/HomeView'
import Categories from '@/components/Categories'
import CategoryHome from '@/components/CategoryHome'
import CategoryList from '@/components/CategoryList'
import MenuList from '@/components/MenuList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/menu/:menu_id',
      name: 'menu',
      component: MenuHome,
      redirect: 'menu/:menu_id/categories',
      children: [
        {
          path: 'categories',
          name: 'categories',
          component: CategoryList,
        },
        {
            path: ':cat_id',
            name: 'categoryhome',
            component: CategoryHome,
            redirect: ':cat_id/list',
            children:[
              {
                path: 'newitem',
                name: 'newitem',
                component: NewMenu
              },
              {
                path: 'list',
                name: 'itemlist',
                component: MenuItems
              },
            ]
        },
      ]
    },
    {
      path: '/',
      name: 'menus',
      component: Menus,
      redirect: 'list',
      children: [
        
        {
          path: 'newmenu',
          name: 'newmenu',
          component: NewMenu
        },
        {
          path: 'list',
          name: 'menulist',
          component: MenuList
        },
      ]
    },
  ]
})
