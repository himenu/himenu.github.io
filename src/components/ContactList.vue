<template>
 <v-app class="hide-overflow white-bg" style="position: relative;">
           
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
      <!-- <v-btn icon flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn> -->
      <v-toolbar-title>Customer List</v-toolbar-title>
   
      <v-spacer></v-spacer>
     
    </v-toolbar>    
     <v-card id="scrolling-techniques" class="scroll-y" style="height: 100vh;box-shadow: none; padding-top: 10vh">
      <v-container style="padding: 0px;" fluid grid-list-lg>
          <v-layout row>
    <v-flex xs12 sm12>
      <v-card :raised="false" style="box-shadow: none; box-shadow: none;  border-radius: 20px; padding: 20px">

         
<v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search Customer here"
            class="hidden-sm-and-down"
          ></v-text-field>

          <v-btn color="primary white--text">Add New Contact</v-btn>
          <v-btn color="success white--text">Excel (xls,csv)</v-btn>

           <contacts-list></contacts-list>

          <!-- <v-list two-line subheader style="background: #f2f2f2">
            <v-subheader inset>Customers</v-subheader>

            <v-list-tile v-for="item in items1" :key="item.title" avatar @click>
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
          </v-list> -->


      </v-card>
    </v-flex>
          </v-layout>
      </v-container>
     </v-card>
 </v-app>


</template>

<script>

import ContactTableVue from "./ContactTable.vue";
export default {
     components: {
    "contacts-list": ContactTableVue
  },
data(){
    return {
        items1: [
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Guest #1",
        subtitle: "0713591423"
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Guest #2",
        subtitle: "0712323232"
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Guest #3",
        subtitle: "0712323232"
      }
    ]
    }
}
}
</script>

<style>
.white-bg {
    background: #ffffff;
}
</style>
