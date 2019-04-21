<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
  
      <v-list dense>
        <template v-for="(item,index) in items">
        
           <v-list-tile :key="item.text" @click="$router.push('/menu/'+$route.params.menu_id+'/'+item.url)">
            <v-list-tile-action>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
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
           <v-list-tile  @click="$router.push('/')">
            <v-list-tile-action>
              <v-icon color="amber">fa fa-arrow-alt-circle-left</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Go To Menus
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 80px">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
        <span class="hidden-sm-and-down">HiMenu</span>
   
         <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="menus"
          :search-input.sync="search"
          cache-items
          class="mx-2"
          flat
          hide-no-data
          item-text="name"
          item-value="code"
          hide-details
          label="Select Menu Here?"
          solo
        >
          <template v-slot:item="data">
            <template>
              <v-list-tile-avatar>
                <img :src="data.item.thumb_logo">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.code"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      <v-spacer></v-spacer>
         <!-- <v-menu
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
    </v-menu> -->
     <!-- <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn> -->
       <!-- @click="SignOut" -->
     <!-- <v-btn
        @click=""
        icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn> -->
      <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>

            <v-list subheader>
          <v-subheader>Menu Actions</v-subheader>
          <v-list-tile
            avatar
            @click="$router.push('/menu/'+$route.params.menu_id+'/update')"
          >
            <v-list-tile-action>
              <v-icon color="primary">fa fa-edit</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Update Menu</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <!-- <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon> -->
              <v-icon color="light-grey">fa fa-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
           <v-list-tile
            avatar
            @click="downloadQR()"
          >
            <v-list-tile-action>
              <v-icon color="light-blue">fa fa-qrcode</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Download QRCode</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <!-- <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon> -->
              <v-icon color="light-grey">fa fa-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
           <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="Load_currentUser.photoURL">
          </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Sign Out</v-list-tile-title>
            </v-list-tile-content>
              <v-list-tile-action>
              <!-- <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon> -->
              <v-icon color="light-grey">fa fa-chevron-right</v-icon>
            </v-list-tile-action>
        </v-list-tile>
        </v-list>
          </v-menu>
<!--      
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="./logo.png"
            alt="HiMenu"
          >
        </v-avatar>
      </v-btn> -->
    </v-toolbar>
    
    <v-content>
      
               <router-view></router-view>
            
    </v-content>
   
  </v-app>
</template>

<script>
import fb from "firebase";

import firebase from "../service/firebase";
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'

  export default {
      computed: {
   ...mapGetters([
           'Load_currentUser'
      // ...
         ]),
         filteredList() {
      let vm = this;
      let user = fb.auth().currentUser;

      return _.filter(this.$root.menus, function(menu) {
        return menu.uid === user.uid;
      });
    }

  },
    data: () => ({
      dialog: false,
      drawer: null,
      fav: true,
      menu: false,
      current_menu: null,
      message: false,
      hints: true,
         menus: [],
          select: null,
    search: null,
      loading: false,
      items: [
       { icon: 'fa fa-th-large', color: "light-blue", text: 'Dashboard', url: 'dashboard' },
        { icon: 'fa fa-sitemap', color: "primary", text: 'Categories', url: 'categories' },
       
        { icon: 'fa fa-sms', color: "light-green", text: 'Bulk SMS', url: 'bulk' },
        { icon: 'fa fa-user-tag', color: "amber", text: 'Customers', url: 'contacts' },

        { icon: 'fa fa-tags',color: "red", text: 'HiOrders', url: 'list'},
        { icon: 'settings', text: 'HiDeliveries', url: 'list'},
        { icon: 'chat_bubble', text: 'Send feedback', url: 'home' },
        { icon: 'help', text: 'Help', url: 'list' },
      ]
    }),
    props: {
      source: String
    },
    watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select(val) {
      console.log("==========HERE YADA YDA===============");

      console.log(val);
      if (val != null) {  
        // console.log("YADA YADA");
        this.$router.push('/menu/'+val+'/dashboard')
        
      
    }
    }
  },
    mounted(){
      let vm = this
       let menu = firebase.database.ref(
      "global_menus/" + this.$route.params.menu_id
    );
     menu.on("value", function(snapshot, prevChildKey) {
      var newMenu = snapshot.val();
      vm.current_menu = newMenu;
      // console.log(newPost);
    });
    },
    methods: {
      querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      // setTimeout(() => {
      this.menus = this.filteredList.filter(e => {
        return (
          (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
        );
      });
      this.loading = false;
      // }, 500)
    },
      SignOut(){
        let vm = this
        fb.auth().signOut().then(function() {
          // Sign-out successful.
          vm.$router.replace("/login");
        }, function(error) {
          // An error happened.
          alert("Oops, error! try again")
        });
      },
      downloadQR() {
         let vm = this
      window.open(
        vm.current_menu.QRcode,
        "_blank" // <- This is what makes it open in a new window.
      );
    },
    }
  }
</script>