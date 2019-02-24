<template>
<v-layout row style="background: #f2f2f2">
    <v-flex xs12 sm6 offset-sm3>
      <v-card style="box-shadow: none;">
        
        <v-img
        v-if="menu"
          :src="menu.coverPhoto"
          :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
          height="300px"
        >
         <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
          <v-layout
            column
            fill-height
          >
            <v-card-title >
              <v-btn dark fab color="primary" @click="$router.push('/list')">
                <v-icon dark="">chevron_left</v-icon>
              </v-btn>
 <!-- <v-btn fab dark large color="cyan">
      <v-icon dark>edit</v-icon>
    </v-btn> -->
              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title primary-title style="background: rgba(0, 0, 0, 0.6); padding: 25px; line-height: 3">
          <div >
            <div class="title white--text">{{ menu.name }}</div>
            <span class="white--text">{{ menu.slogan }}</span>
          </div>
        </v-card-title>
          </v-layout>
        </v-img>
  <v-card :raised="false" style="box-shadow: none; border-radius: 20px; padding: 40px">

         
        <v-list two-line subheader  v-if="categories">

          <v-subheader inset>All Categories</v-subheader>
          <div  v-for="category in categories"
            :key="category.name">
      <v-list-tile
           
            @click="$router.push(category.name)"
            v-if="category.hasOwnProperty('name')"
            avatar
               v-ripple
          >
            <v-list-tile-avatar>
              <v-icon class="amber white--text">call_to_action</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ category.name }}</v-list-tile-title>
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
              @click="dialog = true"
            >
              <v-icon>add</v-icon>
            </v-btn>
              <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title
          class="headline orange lighten-2"
          primary-title
        >
          New Category
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap style="padding: 0px">
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="categoryName"
                :rules="nameRules"
                label="Category Name"
                placeholder="e.g Breakfast or Lunch"
                required
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
 </v-form>
        </v-card-text>
 
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="addCategories"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-card>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
 import { find } from 'lodash'
 import firebase from '../service/firebase'

export default {
    data () {
      return {
        menu: null,
        categories: null,
        valid: true,
        categoryName: '',
        dialog: false,
        nameRules: [
      v => !!v || "Name is required"
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
        items: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
        ],
        items2: [
          { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Breakfast', subtitle: 'Hot Drinks' },
          { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Lunch', subtitle: 'Rich cocktails' }
        ]
      }
    },
    mounted () {
      // this.menu = find(this.$root.menus, (menu) => menu['.key'] === this.$route.params.menu_id)
      let menu = firebase.database.ref('menus/' + this.$route.params.menu_id)
      let categories = firebase.database.ref('menus/' + this.$route.params.menu_id).child('categories')
      // console.log(obj);
      let vm = this
      menu.on("value", function(snapshot, prevChildKey) {
        var newMenu = snapshot.val();
        vm.menu = newMenu
        // console.log(newPost);
        
      });
       categories.on("value", function(snapshot, prevChildKey) {
        // vm.menu = newPost
         var newCategory = snapshot.val();
        vm.categories = newCategory
        console.log(newCategory);
        
      });
      //  categories.on("child_added", function(snapshot, prevChildKey) {
      //   // vm.menu = newPost
      //    var newCategory = snapshot.val();
      //   vm.categories = newCategory
      //   console.log(newCategory);
        
      // });
    },
    methods: {
      addCategories(){
           if (this.$refs.form.validate()) {
         let obj = firebase.database.ref('menus/' + this.$route.params.menu_id);
         obj.child('categories').child(this.categoryName).set({
              name: this.categoryName,
            })
            this.dialog = false
           }
      }
    }

  }
</script>

<style>
.v-image__image--cover {
  background-size: cover;
}
</style>
