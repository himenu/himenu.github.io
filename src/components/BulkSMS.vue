<template>
    <v-container grid-list-md >
        <v-layout row wrap>
             <v-toolbar color="grey" dark>

      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>Select Menu</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile
            v-for="item in filteredList"
            :key="item.name"
            @click=""
          >
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

    </v-toolbar>
            <v-flex xs12 sm12 md8 style="padding-top: 20px">
          <v-flex xs12>
              <p>Customer contact list</p>
        <v-textarea
          box
          name="input-7-4"
          label="Solo textarea"
           counter="100"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
          <v-btn color="primary white--text">
                Send message
              </v-btn>
      </v-flex>
       
              <contacts-list></contacts-list>

          </v-flex>
             <v-flex xs12 sm12 md4 style="padding-top: 20px">
           
                <v-card>
     <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search Customer here"
        class="hidden-sm-and-down"
      ></v-text-field>

              <v-btn color="primary white--text">
                Add New Contact

              </v-btn>
<v-btn color="success white--text">
                Excel (xls,csv)

              </v-btn>
        <v-list two-line subheader>
          <v-subheader inset>Customers</v-subheader>

          <v-list-tile
            v-for="item in items1"
            :key="item.title"
            avatar
            @click=""
          >
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          
        </v-list>
      </v-card>
             
             </v-flex>
               
        </v-layout>
      </v-container>
</template>

<script>
import ContactTableVue from "./ContactTable.vue";
import firebase from "firebase";

export default {
 components: {
          "contacts-list": ContactTableVue
      },
      computed: {
           filteredList() {
       let vm = this
       let user = firebase.auth().currentUser;

      return _.filter(this.$root.menus, function(menu) {
        return (menu.uid === user.uid)
      });

    }
      },
       data: () => ({
      items: [
        'All', 'Family', 'Friends', 'Coworkers'
      ],
          items1: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Guest #1', subtitle: '0713591423' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Guest #2', subtitle: '0712323232' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Guest #3', subtitle: '0712323232' }
        ],
    })
}
</script>

<style>

</style>
