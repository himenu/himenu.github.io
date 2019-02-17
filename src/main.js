// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
// Helpers
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import Vuefire from 'vuefire'
import firebase from './service/firebase'
Vue.use(Vuefire)
Vue.use(Vuetify, {
  theme: {    
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
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
  template: '<App/>',
  components: { App }
})
