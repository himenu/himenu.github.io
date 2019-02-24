<template>
    <div>
         <v-app class="hide-overflow" style="position: relative;">
           
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
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

     
    </v-navigation-drawer>
              <v-toolbar
      absolute
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      dark
      color="primary"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>My Menus</v-toolbar-title>
   
      <v-spacer></v-spacer>
     
         <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
     <v-list class="pa-1" style="background: transparent" 
       slot="activator">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="Load_currentUser.photoURL">
          </v-list-tile-avatar>
        </v-list-tile>
     </v-list>
       <!-- <v-btn
       slot="activator"
        icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->

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
    </v-toolbar>
     <v-card id="scrolling-techniques" class="scroll-y" style="height: 100vh;box-shadow: none; background: #f2f2f2; padding-top: 10vh">
      <v-container style="padding: 0px;" fluid grid-list-lg>
        <!-- {{Load_currentUser}} -->
         <router-view></router-view>
         
      </v-container>
       <!-- <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
            >
              <v-icon>add</v-icon>
            </v-btn> -->
     </v-card>
         </v-app>
    </div>
</template>


<style>

</style>

<script>
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
      menu: false,
        drawer: null,
        items: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
        ],
        items2: [
          { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
          { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
        ]
      }
    }
  }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
