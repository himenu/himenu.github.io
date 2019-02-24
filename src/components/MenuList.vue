<template>
     <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card :raised="false" style="box-shadow: none; border-radius: 20px; height: 88vh; padding: 15px">

        <v-list two-line subheader>

          <v-subheader inset>All Menus</v-subheader>
            <!-- v-for="item in items2" -->
            <!-- <pre>
              {{ filteredList }}
            </pre> -->
<div  v-for="(menu, index) in filteredList" class="image-card"
            :key="index">
 <v-list-tile
          style="background: #f2f2f2; border-radius: 2px; margin-top: 5px;"
           
            @click="displayCategories(menu['.key'])"
            avatar
            v-ripple
            v-if="menu.hasOwnProperty('name')"
          >
            <v-list-tile-avatar tile>
                <img :src="menu.thumb_logo" :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`" >
                
              </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ menu.name }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="menu.hasOwnProperty('categories')" v-text="compileJson(menu.categories)">


              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">chevron_right</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
</div>
         
        </v-list>
   
         <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
              style="margin-top: 20px"
              @click="$router.push('newmenu')"
            >
              <v-icon>add</v-icon>
            </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'
 import firebase from 'firebase';

import { find } from 'lodash'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'

export default {

    computed: {
   ...mapGetters([
           'Load_currentUser'
      // ...
         ]),

  },
    data () {
      return {
        uid: '',
        items: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
        ],
        items2: [
          { icon: 'call_to_action', iconClass: 'blue white--text', title: 'Urban Eatery Westlands (Delta Towers)', subtitle: 'Deliciuous cuisine that leave you finger licking' },
          { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Mama Nyama (Delta Towers)', subtitle: 'One stop hotel for all matters meat' }
        ]
      }
    },
   
    computed: {
     filteredList() {
       let vm = this
       let user = firebase.auth().currentUser;
      let menus = this.$root.menus
       if (navigator.onLine) {
          this.saveMenusToCache()
        } else {
          menus = JSON.parse(localStorage.getItem('menus'))
        }

      return menus.filter(menu => {
        // console.log(menu.uid  );
        // console.log(user);
        

        // return true
        
        if (menu.hasOwnProperty('uid')) {
          return menu.uid === user.uid
        }else{
          return false
        }
      })
    }

    
    },
   mounted(){
      this.saveMenusToCache()
    },
    methods: {
      displayCategories(key){
        this.$router.push('/menu/'+key+'/categories')
      },
      saveMenusToCache () {
        this.$root.$firebaseRefs.menus.orderByChild('created_at').once('value', (snap) => {
          let cachedMenus = []
          snap.forEach((menusnap) => {
            let cachedMenu = menusnap.val()
            cachedMenu['.key'] = menusnap.key
            cachedMenus.push(cachedMenu)
          })
          localStorage.setItem('menus', JSON.stringify(cachedMenus))
        })
      },
      compileJson(categories){
        let category = ""
        _.forIn(categories, function(value, key) {
          // console.log(key, value);
          category += key+ " . "
      });
        return category
      }
    }
  }
</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
