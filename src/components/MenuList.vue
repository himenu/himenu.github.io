<template>
     <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card :raised="false" style="box-shadow: none; border-radius: 20px; padding: 40px">

        <v-list two-line subheader>

          <v-subheader inset>All Menus</v-subheader>
            <!-- v-for="item in items2" -->

          <v-list-tile
            v-for="(menu) in this.$root.menus" class="image-card"
            :key="menu.code"
            @click="displayCategories(menu['.key'])"
            avatar
            v-ripple
          >
            <v-list-tile-avatar>
                <img :src="menu.thumb_logo">
              </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ menu.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ menu.slogan }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
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
export default {
  
    data () {
      return {
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
    methods: {
      displayCategories(key){
        this.$router.push('/menu/'+key+'/categories')
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
