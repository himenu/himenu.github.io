<template>
 <v-app class="hide-overflow" style="position: relative;">
           
 <v-toolbar
      absolute
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      dark
      color="primary"
    >
      <v-btn icon flat @click="$router.push('/menu/'+$route.params.menu_id+'/categories')">
          <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- <v-btn icon flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn> -->
      <v-toolbar-title>{{ $route.params.cat_id }}</v-toolbar-title>
   
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = true">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>    
     <v-card id="scrolling-techniques" class="scroll-y" style="height: 100vh;box-shadow: none; background: #f2f2f2; padding-top: 10vh">
      <v-container style="padding: 0px;" fluid grid-list-lg>
          <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card :raised="false" style="box-shadow: none; background: #f2f2f2; box-shadow: none;  border-radius: 20px; padding: 20px">

        <v-layout row wrap>
          <!-- <pre>
        {{ items }}

          </pre> -->
           <v-flex xs12 style="padding:0 10px;" v-if="items.length < 1"> 
  <!-- <vue-content-loading :width="300" :height="100">
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="15" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="10" />
  </vue-content-loading> -->
  <vcl-facebook secondary="#FFC107" primary="#fb8c00"></vcl-facebook>
               </v-flex>
          <v-flex xs12 v-for="(item, key) in items" :key="item.name" style="" >
            <v-card v-if="item.hasOwnProperty('name')" @click="$router.push('/menu/'+$route.params.menu_id+'/'+$route.params.cat_id+'/view/'+key)" v-ripple style="box-shadow: none; border-radius: 10px; margin-top: 5px; padding: 15px">
              <v-layout >
                <v-flex xs3>
                  <v-img
                    :src="item.photo_url"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs9>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ item.name }}</div>
                      <div>{{ item.description }}</div>
                      <div class="headline"><b>Kes {{ item.price }}/=</b></div>

                    </div>
                  </v-card-title>
                </v-flex>
                
              </v-layout>
            </v-card>
          </v-flex>
          

        
        </v-layout>
   
         <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
              style="margin-top: 20px"
            
              @click="$router.push('newitem')"
            >
              <!-- @click="addMenuItem" -->
              <v-icon>add</v-icon>
            </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
           <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete {{ $route.params.cat_id }}?</v-card-title>

        <v-card-text>
         The operation will delete all items under {{$route.params.cat_id}}!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          

          <v-btn
            color="red"
            flat="flat"
            @click="removeCategory"
          >
            Delete anyway
          </v-btn>
          
          <v-btn
            color="green darken-1"
      class="white--text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
</template>

<script> 
 import { find } from 'lodash'
 import firebase from '../service/firebase'
 import { VclFacebook } from 'vue-content-loading';

export default {
    data () {
      return {
        store_items: null,
        items:[],
           dialog: false,
      }
    },
      components: {
    VclFacebook
  },
     computed: {
     activeItems: function() {
       return this.items.filter(function(u) {
         return u.hasOwnProperty('name')
     })
     }
   },
    mounted(){
      let items = firebase.database.ref('global_menus').child(this.$route.params.menu_id).child('categories').child(this.$route.params.cat_id+"/")
      // console.log(obj);
      
      let vm = this
        items.on("value", function(snapshot, prevChildKey) {
                // vm.menu = newPost
                var curr_items = snapshot.val();
                vm.items = curr_items
                // vm.store_items = curr_items
                console.log(curr_items);
                
              });
    },
    methods:{
      addMenuItem(){
        let random = Math.floor(Math.random() * 100 + 1);
        let price = random * 10;
         
      },
       removeCategory(){
          let obj = firebase.database.ref('global_menus/' + this.$route.params.menu_id);
         obj.child('categories').child(this.$route.params.cat_id).remove()
         this.$router.go(-1)
         this.dialog = false
      }
    }
  }
</script>

<style>

</style>
