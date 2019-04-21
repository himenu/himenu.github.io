<template>
  <v-app class="hide-overflow white-bg" style="position: relative;">
    
    <v-toolbar absolute scroll-off-screen scroll-target="#scrolling-techniques">
      <v-btn icon flat @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <!-- <v-btn icon flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
      </v-btn>-->
      <v-toolbar-title>BulkSMS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" class="white--text">
        <v-icon left dark>money</v-icon>credit: <b>Kes {{ credit}}</b>
      </v-btn>
    </v-toolbar>
    <v-card id="scrolling-techniques" class="scroll-y" style="height: 100vh;box-shadow: none;padding-top: 8vh">
      <v-container style="padding: 0px;" fluid grid-list-lg>
        <v-layout row>
          <v-flex xs12 sm12 md12>
            <v-flex xs12 v-if="current_menu" style="background: #f2f2f2; padding: 20px">
              <div v-if="current_menu.hasOwnProperty('account_bal')">
                <div v-if="current_menu.account_bal < (contacts.length * 2.5)">
                 
                                 <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Low on credit!  <b>(Kes{{ current_menu.account_bal }})</b></div>
                  <span>Your are running low on credit. Please Credit your account to continue using this service.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn color="light-blue" dark>Recharge Now!</v-btn>
              </v-card-actions>
            </v-card>
                </div>
                <div v-else>
                  <p>Send Text message to contact list</p>
                  <v-form ref="messageForm" v-model="valid" lazy-validation>
                    <v-textarea
                      solo
                      v-model="text"
                      name="input-7-4"
                      label="Enter Message"
                      counter="100"
                      :rules="nameRules"
                      placeholder="Enter message here..."
                    ></v-textarea>
                    <v-btn color="primary white--text" @click="validate">Send message

                       <v-icon right dark>fa fa-sms</v-icon>
                    </v-btn>
                  </v-form>
                  <v-subheader>Messages Sent</v-subheader>
                  <!-- <v-btn color="primary white--text" @click="$router.push('menu')">View contact list</v-btn> -->
                  <!-- <pre>
                {{ messages }}
                  </pre>-->
                  <!-- <message-list :contacts="messages"></message-list> -->
                  <v-list two-line subheader v-if="messages" style="background: transparent">
                    <v-flex xs12 style="padding:0 10px;" v-if="messages.length < 1">
                      <vcl-twitch secondary="#FFC107" primary="#fb8c00"></vcl-twitch>
                    </v-flex>
                    <div v-for="(message, index) in messages" :key="index">
                      <!-- <pre>
                      {{ message }}
                      </pre>-->
                      <v-list-tile
                        style="background: #fff; margin-top: 5px; border-radius: 15px"
                        @click="$router.push(message.msg)"
                        v-if="message.hasOwnProperty('msg')"
                        avatar
                        v-ripple
                      >
                        <v-list-tile-avatar>
                          <v-icon class="success white--text">fa fa-sms</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title>{{ message.msg }}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                          <v-btn icon ripple>
                            <v-icon color="blue lighten-1">fa fa-check-double</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </div>
                  </v-list>
                </div>
              </div>
              <div v-else>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline"><b>SetUp HiOffers Account</b></div>
                  <span>Please Credit your account to access this service.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn color="light-blue" dark>Credit amount now!</v-btn>
              </v-card-actions>
            </v-card>
              </div>
            </v-flex>
            <!-- <v-flex v-else-if="current_menu.account_bal > 100"></v-flex> -->
           
             <v-flex xs12 v-else>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Please Select Menu to continue</div>
                  
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-app>

  <!-- <v-container grid-list-md>
    <v-toolbar style="box-shadow: none">
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="menus"
        :search-input.sync="search"
        cache-items
        class="mx-3"
        flat
        hide-no-data
        item-text="name"
        item-value="code"
        hide-details
        label="Select Menu Here?"
        solo
      ></v-autocomplete>

      <v-spacer></v-spacer>
     
    </v-toolbar>
    <v-layout row wrap style="padding: 20px; background: #fff">
   
      
    </v-layout>
  </v-container>-->
</template>

<script>
import MessageTable from "./MessageTable.vue";
import fb from "firebase";

import { VclTwitch } from "vue-content-loading";
import firebase from "../service/firebase";
import axios from "axios";
export default {
  components: {
    "message-list": MessageTable,
    VclTwitch
  },
  mounted() {
    let menu_code = this.$route.params.menu_id
     let menuDetails = firebase.database.ref("global_menus/" + menu_code);

        let msgs = firebase.database
          .ref("global_menus/" + menu_code)
          .child("messages");
        // console.log(obj);
        let vm = this;

        menuDetails.on("value", function(snapshot, prevChildKey) {
          // vm.menu = newPost
          var menuDetail = snapshot.val();
          vm.current_menu = menuDetail;
          if(vm.current_menu.hasOwnProperty('account_bal')){
            vm.credit = vm.current_menu.account_bal
          }else{
            vm.credit = 0
          }
          console.log(menuDetail);
        });
        msgs.on("value", function(snapshot, prevChildKey) {
          // vm.menu = newPost
          var newMessages = snapshot.val();
          vm.messages = newMessages;
          console.log(newMessages);
        });
    

    // await this.menus

    // this.search = this.menus[0].name
  },
  computed: {
    filteredList() {
      let vm = this;
      let user = fb.auth().currentUser;

      return _.filter(this.$root.menus, function(menu) {
        return menu.uid === user.uid;
      });
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select(val) {
      console.log("==========HERE YADA YDA===============");

      console.log(val);
      if (val != null) {
      
    }
    }
  },
  
  data: () => ({
    select: null,
    search: null,
    menus: [],
    valid: true,
    text: "",
    credit: 0,
    current_menu: null,
    contacts: ["+253713591452"],
    nameRules: [
      v => !!v || "Text Message is required",
      v => (v && v.length <= 100) || "Message must be less than 100 characters"
    ],
    messages: [
      {
        id: "1",
        date: "today",
        msg: "Hello",
        status: "success"
      }
    ],
    loading: false,
    items: ["All", "Family", "Friends", "Coworkers"]
  }),
  methods: {
    validate() {
      console.log(this.text);

      if (this.$refs.messageForm.validate()) {
        console.log("Send the message here");
        this.sendSMS("", "", "", this.contacts);
      }
    },
    sendSMS(message, apikey, username, contacts) {
      let vm = this
//      var data = new FormData();
// data.append("username", "michaelngugin");
// data.append("apikey", "084fd00d9e4d867100870c0957fc49da18c6d15edc6ce94b536ba1e67bb2dfc3");
// data.append("numbers", "+254713591452,+254716467318");
// data.append("message", "Say hi to your new menu! Welcome aboard https://sayhimenu.com");

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("POST", "https://api.sayhimenu.com/sms");
// xhr.setRequestHeader("cache-control", "no-cache");
// xhr.setRequestHeader("postman-token", "ce0780af-0779-63dd-e315-fcebbd617e37");

// xhr.send(data);

      // let data_json = {
      //   grant_type: "client_credentials",
      //   client_id: 3,
      //   client_secret: "3TRw6P5JsvXKyPtFW9joETguqZddRiVn0ANOaWRa",
      //   scope: "*",
      //   username: "mike@mail.com",
      //   password: "password"
      // };
      // axios({
      //   method: "POST",
      //   url: "https://api.sayhimenu.com/api/v1/oauth/token",
      //   withCredentials: true,
      //   crossdomain: true,
      //   data: data_json,
      //   headers: {
      //     "Access-Control-Allow-Origin": "*"
      //   }
      // })
      //   .then(function(response) {
      //     localStorage.setItem("bearer_token", response.data.access_token);
      //     // console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log("Post Error : " + error);
      //   });
      //   const auth = {
      //     headers: {
      //       "Accept": "application/json"
      //     },
      //   };
      //   let data_json = {
      //   grant_type: "client_credentials",
      //   client_id: 3,
      //   client_secret: "3TRw6P5JsvXKyPtFW9joETguqZddRiVn0ANOaWRa",
      //   scope: "*",
      //   username: "mike@mail.com",
      //   password: "password"
      // };

      // axios({
      //   method: "post",
      //   url: "https://api.sayhimenu.com/api/v1/oauth/token",
      //   withCredentials: true,
      //   crossdomain: true,
      //   data: data_json,
      //   headers: {
      //     // "Access-Control-Allow-Origin": "*",
      //     "Accept": "application/json"
      //   }
      // })
      //   .then(function(response) {
      //     localStorage.setItem('bearer_token', response.data.access_token)
      //     // console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log("Post Error : " + error);
      //   });
      // let data_json = {
      //   username: "michaelngugin",
      //   apikey:
      //     "084fd00d9e4d867100870c0957fc49da18c6d15edc6ce94b536ba1e67bb2dfc3",
      //   numbers: "+254713591452,+254716467318",
      //   message: this.text + "HiMenu Code: " +this.current_menu.dynamic_link
      // };

      // axios({
      //   method: "post",
      //   url: "https://api.sayhimenu.com/sms",
      //   data: data_json,
      // })
      //   .then(function(response) {
      //     // console.log("Header With Authentication :" + response);
      //     let transactionCost = 2.5 * contacts.length;
      //       vm.credit -= transactionCost;
      //       // Initialize a service e.g. SMS
      //       // menus = JSON.parse(localStorage.getItem('menus'))
      //       //  localStorage.setItem('menus', JSON.stringify(cachedMenus))
      //       let menu = firebase.database
      //         .ref("global_menus/" + vm.select)

      //       menu.update({
      //         account_bal: vm.credit
      //       })
      //         // .child("messages");

      //       let obj = firebase.database
      //         .ref("global_menus/" + vm.select)
      //         .child("messages");

      //       obj.push({
      //         date: -1 * new Date().getTime(),
      //         msg: vm.text,
      //         status: "success"
      //       });
      //   vm.text = "";

      //   })
      //   .catch(function(error) {
      //     console.log("Post Error : " + error);
      //     alert("Something went wrong")
      //   });
    },
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
    }
  }
};
</script>

<style>
</style>
