<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
  
      <v-list dense>
        <template v-for="(item,index) in items">
        
           <v-list-tile :key="item.text" @click="$router.push('/'+item.url)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
           <!-- <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider> -->
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">HiMenu</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
         <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
     <v-list class="pa-1" style="background: transparent" 
       slot="activator">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="Load_currentUser.photoURL">
          </v-list-tile-avatar>
        </v-list-tile>
     </v-list>
      

      <v-card>
         <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="Load_currentUser.photoURL">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ Load_currentUser.displayName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


     

      
      </v-card>
    </v-menu>
     <!-- <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn> -->
     <v-btn
     @click="SignOut"
        icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
     
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="./logo.png"
            alt="HiMenu"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md style="padding: 0px">
        <v-layout row wrap>
         
             <v-flex xs12 sm12 >
               <router-view></router-view>
             </v-flex>
        </v-layout>
      </v-container>
    </v-content>
   
  </v-app>
</template>

<script>
import firebase from "firebase";
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
    data: () => ({
      dialog: false,
      drawer: null,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      items: [
       { icon: 'contacts', text: 'Dashboard', url: 'home' },
        { icon: 'contacts', text: 'My Hotel Menus', url: 'list' },
       
        { icon: 'settings', text: 'Bulk SMS', url: 'bulksms' },

        { icon: 'settings', text: 'HiOrders', url: 'list'},
        { icon: 'chat_bubble', text: 'Send feedback', url: 'home' },
        { icon: 'help', text: 'Help', url: 'list' },
      ]
    }),
    props: {
      source: String
    },
    methods: {
      SignOut(){
        let vm = this
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          vm.$router.replace("/login");
        }, function(error) {
          // An error happened.
          alert("Oops, error! try again")
        });
      }
    }
  }
</script>