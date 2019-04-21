<template>
 <v-app>
  
    <v-toolbar v-if="currentUser" :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app fixed style="box-shadow: none">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
         <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="./logo.png" alt="HiMenu">
        </v-avatar>
      </v-btn>
        <span class="hidden-sm-and-down">HiMenu</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <v-list class="pa-1" style="background: transparent" slot="activator">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="currentUser.photoURL">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>

        <v-card>
          <v-list class="pa-1">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="currentUser.photoURL">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ currentUser.displayName}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
      <!-- <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>-->
      <!-- @click="SignOut" -->
      <v-btn icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>

     
    </v-toolbar>
    <v-content style="padding: 0px; background: #fff">
      <v-container grid-list-md style="padding-top: 10vh; background: #fff">
        <v-layout row wrap>
          <v-flex xs12 sm12>
<v-layout row style="background: #fff">
    <v-flex xs12 sm12 >
      <v-card :raised="false" style="box-shadow: none; border-radius: 0px; height: 100%; padding: 30px">
        
<v-layout row wrap>
       <v-flex xs12 sm12 md12  style="padding:0 10px;"> 
         <v-subheader class="headline">My Menus</v-subheader>

               </v-flex>
               <v-flex xs12 sm12 md12  style="padding:0 10px;"> 
<v-form>
    <v-container>
      <v-text-field v-model="search">
        <template slot="label">
          Search a <strong>himenu</strong> here, use <strong>Code</strong> or <strong>Name</strong> of hotel? <v-icon style="vertical-align: middle">find_in_page</v-icon>
        </template>
      </v-text-field>
      <input type="hidden" id="testing-code" v-show="false" :value="testingCode">
    </v-container>
  </v-form>
               </v-flex>
               <!-- <pre>
                 {{filteredList}}
               </pre> -->

               <v-flex xs12 sm12 md4  style="padding:0 10px;" v-if="filteredList.length < 1"> 
  <!-- <vue-content-loading :width="300" :height="100">
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="15" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="10" />
  </vue-content-loading> -->
  <vcl-twitch secondary="#FFC107" primary="#fb8c00"></vcl-twitch>
               </v-flex>

  <v-flex  xs12 sm12 md4  style="padding:10px;" v-for="(menu, index) in filteredList" class="image-card"
            :key="index"> 
            <v-hover  v-if="searching">
    <v-card 
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
    >
      <v-img
        :aspect-ratio="16/9"
        :src="menu.coverPhoto" :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
      >
      
      <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            {{ menu.code }}
          </div>
        </v-expand-transition>
      </v-img>
       
      <v-card-title>
          <v-btn
          absolute
          color="transparent"
          class="white--text"
          fab
          large
          left
          top
          style="margin-top: 45%; box-shadow: none"
        >
              <img
              style="width: 74px"
               :src="menu.thumb_logo" :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                alt="Avatar"
              >
        </v-btn>
            <!-- <v-btn
          absolute
          color="pink"
          class="white--text"
          fab
          large
          right
          top
          style="margin-top: 10%;"
          @click="copyLink(menu)"
        >
            <v-icon>link</v-icon>
        </v-btn> -->
        <div style="max-width: 80%">
          <span style="    
                font-size: 17px;
                line-height: 32px;
                font-weight: bold;">
                {{ menu.name }}
                </span>
            <div class="d-flex">
            <v-rating
              :value="menu.rating ? menu.rating : 1"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>
                {{ menu.rating ? menu.rating : 1 }}
                </span>
              <span>
                 ({{ menu.reviews ? menu.reviews : 1 }} reviews) 
                 </span>
            </div>
          </div>
          <div class="d-flex">
        
            <div class="ml-2 grey--text text--darken-2">
              <span v-if="menu.hasOwnProperty('categories')" v-text="compileJson(menu.categories)"></span>
            </div>
          </div>
        </div>

        <v-spacer></v-spacer>
        <v-btn icon class="mr-0" @click="displayCategories(menu['.key'])">
            <v-icon color="grey lighten-1">
              chevron_right
              </v-icon>
        </v-btn>
      </v-card-title>
      
    </v-card>
  </v-hover>
            </v-flex>
            <v-snackbar
              v-model="openSnack"
              :color="snackbarColor"
              multi-line="multi-line"
              :timeout="6000"
              :vertical="'vertical'"
            >
            {{snackbarMsg}}
            <v-btn dark flat @click="openSnack = false">
              Close
            </v-btn>
          </v-snackbar>
</v-layout>
 <!-- <v-btn
              dark
              fab
              top
              right
              fixed
              bottom
              color="primary"
              style="bottom: 20px"
            >
              <v-icon>link</v-icon>
            </v-btn> -->
</v-card>
    </v-flex>
    <v-fab-transition>
      <v-btn
        dark
        fab
        fixed
        bottom
        color="pink"
        right
        @click="$router.push('newmenu')"

      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-layout>

     <!-- <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card :raised="false" style="box-shadow: none; border-radius: 20px; height: 88vh; padding: 15px">
        
        <v-list two-line subheader>

          <v-subheader inset>All Menus</v-subheader>
      
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
  </v-layout> -->
  </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import _ from 'lodash'
 import firebase from 'firebase';
 import { VclTwitch } from 'vue-content-loading';
const axios = require('axios');
import { find } from 'lodash'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'

export default {
  components: {
    VclTwitch
  },

    computed: {
   ...mapGetters([
      // ...
         ]),

  },
    data () {
      return {
        uid: '',
        search: '',
        testingCode: "1234",
        searching: true,
        allMenus: [],
        currentUser: null,
         select: null,
         dialog: false,
        fav: true,
        menu: false,
        message: false,
        hints: true,
      snackbarColor: "error",
      snackbarMsg: "",
      openSnack: false,
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
    props: {
    source: String
  },
  mounted(){
  },
    computed: {
     filteredList() {
       let vm = this
       let user = firebase.auth().currentUser;
       this.currentUser = user
       this.searching = false
       setTimeout(()=> {
         this.searching = true
       }, 200)

      //  if (navigator.onLine) {
      //     this.saveMenusToCache()
      //   } else {
      //     menus = JSON.parse(localStorage.getItem('menus'))
      //   }
      // let filteredMenu = this.allMenus.filter(menu => {
      // console.log(menu.uid  );
      // console.log(user);
      // return true
      //   if (menu.hasOwnProperty('uid')) {
      //     // return (menu.uid === user.uid)
      //     return menu.name.toLowerCase().includes(this.search.toLowerCase())
      //   }else{
      //     return false
      //   }
      // })
      // return this.$root.menus

      return _.filter(this.$root.menus, function(menu) {
        return menu.name.toLowerCase().includes(vm.search.toLowerCase()) && (menu.uid === user.uid)
      });

    }

    
    },
   mounted(){
      // this.saveMenusToCache()
    //  this.allMenus = 
    },
    methods: {
       SignOut() {
      let vm = this;
      firebase
        .auth()
        .signOut()
        .then(
          function() {
            // Sign-out successful.
            vm.$router.replace("/login");
          },
          function(error) {
            // An error happened.
            alert("Oops, error! try again");
          }
        );
    },
      displayCategories(key){
        this.$router.push('/menu/'+key+'/dashboard')
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
      copyLink(menu){
        let that = this

        let categories = this.compileJson(menu.categories)

        console.log(menu);
        
       
          /* unselect the range */
         axios 
         .post("https://api.rebrandly.com/v1/links", {
           destination: encodeURI('https://sayhimenu.com?code='+menu.code+'&name='+menu.name+'&description='+categories+'&logo='+menu.thumb_logo),
            domain: { fullName: "rebrand.ly" },
            
                },{ headers: {
              "Content-Type": "application/json",
              "apikey": "f71342f97c2f4d9fbcbeef78a4a282de"
            }
                } 
            )
                .then(response => {
                  console.log(response);
                    that.$clipboard("https://"+response.data.shortUrl);


                    that.snackbarMsg = "https://"+response.data.shortUrl + " Copied to clipboard";
                    that.snackbarColor = "info"
                    that.openSnack = true;


                  
                })
                .catch(error => {
                  console.log(error);
                  that.snackbarMsg = "Could not copy to clipboard!";
                    that.snackbarColor = "error"
                    that.openSnack = true;
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
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .6;
  position: absolute;
  width: 100%;
}
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
