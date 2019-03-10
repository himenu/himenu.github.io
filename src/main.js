// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import store from './store';
// Helpers

import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import Vuefire from 'vuefire'
import firebase from './service/firebase'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuefire)
Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {    
    primary:"#ee8900", // #E53935
    secondary: colors.red.darken1, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  firebase: {
    menus: firebase.database.ref('menus').orderByChild('created_at')
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
