<template>
    <div>
         <v-app class="hide-overflow" style="position: relative;">
              <v-toolbar
      absolute
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      dark
      color="primary"
    >
      <v-btn icon flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      <v-toolbar-title>{{ $route.params.cat_id }}</v-toolbar-title>
   
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
     <v-card id="scrolling-techniques" class="scroll-y" style="height: 100vh;box-shadow: none; background: #f2f2f2; padding-top: 10vh">
      <v-container style="padding: 0px;" fluid grid-list-lg>
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
export default {
    data () {
      return {
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

</style>
