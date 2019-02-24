<template>
     <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card :raised="false" style="box-shadow: none; background: #f2f2f2; box-shadow: none;  border-radius: 20px; padding: 20px">

        <v-layout row wrap>
          <!-- <pre>
        {{ items }}

          </pre> -->
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
</template>

<script> 
 import { find } from 'lodash'
 import firebase from '../service/firebase'
export default {
    data () {
      return {
        store_items: null,
        items:[]
      }
    },
     computed: {
     activeItems: function() {
       return this.items.filter(function(u) {
         return u.hasOwnProperty('name')
     })
     }
   },
    mounted(){
      let items = firebase.database.ref('menus').child(this.$route.params.menu_id).child('categories').child(this.$route.params.cat_id+"/")
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
         
      }
    }
  }
</script>

<style>

</style>
