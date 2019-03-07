<template>
 <v-app style="position: relative; height: 100vh; oveflow: scroll;  background: url(https://res.cloudinary.com/micqual/image/upload/e_brightness:100,o_11/v1550928960/pattern.jpg)">
     <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card style="box-shadow: none; background: transparent">
 
        <!-- <v-img
          src="https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
          height="300px"
        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>
              <v-btn dark icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">Login</div>
            </v-card-title>
          </v-layout>
        </v-img> -->
<v-flex
        xs12
        sm12
        md12
        style="padding-top: 15px"
        text-xs-center
      >
        <v-avatar
          tile
          :size="70"
          color="transparent"
        >
          <img src="https://res.cloudinary.com/micqual/image/upload/v1550606890/eubglhmr9eupdshbxmgf.jpg" alt="avatar">
        </v-avatar>
      </v-flex>
       <v-flex xs12 sm12 md12  style="text-align: center; padding:0px 15px; padding-top: 10px" >
             <p class="text-lg-center">Welcome to<span style="color: orange; font-weight: bolder"> hiMenu </span>  store</p>
         
            </v-flex>

    
 <v-layout row wrap style="padding: 0px">
    
              <v-flex xs12 sm12 md12  style="text-align: center; padding:0 15px">
            <v-tabs
    grow=""
    color="transparent"
    icons-and-text
  >
    <v-tabs-slider color="primary"></v-tabs-slider>

    <v-tab href="#tab-1">
      Login
      <v-icon>fa-sign-in-alt</v-icon>
    </v-tab>

    <v-tab href="#tab-2">
      Sign Up
      <v-icon>fa-user-circle</v-icon>
    </v-tab>


    <v-tab-item
      value="tab-1"
    >
      <v-card flat>
        <v-card-text>
              <v-form
    ref="loginform"
    v-model="valid"
    lazy-validation
  >
           <v-layout row wrap>
             
          <v-flex xs12 sm12 md6  style="padding:0 10px;">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email address"
                placeholder="Email address"
                required
                 prepend-inner-icon="fa-at"
                outline
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm12 md6  style="padding:0 10px;">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                placeholder=""
                required
                 prepend-inner-icon="fa-key"
                outline
              ></v-text-field>
            </v-flex>
             <v-flex xs12 sm12 md12>
                <v-btn @click="loginWithEmailAndPassword" block round  color="primary" style="padding:15px; height: 55px">
            <v-icon left dark>cloud_upload</v-icon> Login

                </v-btn>
               
    
            <!-- <v-btn block color="secondary" dark>Block Button</v-btn> -->
         
            </v-flex>
           </v-layout>
              </v-form>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item
      value="tab-2"
    >
      <v-card flat>
        <v-card-text>
              <v-form
    ref="registerform"
    v-model="registervalid"
    lazy-validation
  >
           <v-layout row wrap>
        <v-flex xs12 sm12 md6  style="padding:0 10px;" >
              <v-text-field
                v-model="username"
                :rules="nameRules"
                label="Username"
                placeholder="e.g John Doe"
                required
                 prepend-inner-icon="fa-user-edit"
                box
              ></v-text-field>
            </v-flex>
           <v-flex xs12 sm12 md6  style="padding:0 10px;" >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email address"
                placeholder="e.g example@domain.com"
                required
                 prepend-inner-icon="fa-at"
                box
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm12 md6  style="padding:0 10px;">
              <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="Password"
                placeholder=""
                required
                 prepend-inner-icon="fa-key"
                box
              ></v-text-field>
            </v-flex>
             <v-flex xs12 sm12 md6  style="padding:0 10px;">
              <v-text-field
                v-model="confirmPassword"
                :rules="confirmRules"
                label="Confirm Password"
                type="password"
                placeholder=""
                required
                 prepend-inner-icon="fa-key"
                box
              ></v-text-field>
            </v-flex>
             <v-flex xs12 sm12 md12>
                <v-btn @click="createUserWithEmailAndPassword" block round  color="primary" style="padding:15px; height: 55px">
            <v-icon left dark>cloud_upload</v-icon> Register

                </v-btn>
               
    
            <!-- <v-btn block color="secondary" dark>Block Button</v-btn> -->
         
            </v-flex>
           </v-layout>
              </v-form>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
            </v-flex>
            
               <v-flex xs12 sm12 md12  style="text-align: center; padding: 15px">
             <p class="text-lg-center">Or Login with</p>
         
            </v-flex>
              <!-- <v-flex xs12 sm12 md12  style="text-align: center; padding:0 15px">
             <p class="text-lg-center">Login with</p>
         
            </v-flex> -->
      <v-flex xs6 sm6 md6 style="text-align: right; padding: 0 15px">
               <v-btn color="info" @click="LoginFacebook" fab large dark style="    text-transform: lowercase;
    font-size: 200%;
    font-weight: bolder;">
                 f
              <!-- <v-icon>fa-facebook-f</v-icon> -->
            </v-btn>
             <!-- <v-btn block round  color="info" style="padding:15px; height: 55px">
            <v-icon left dark>cloud_upload</v-icon>Facebook

                </v-btn> -->
            </v-flex>
            <v-flex xs6 sm6 md6 style="text-align: left;  padding: 0 15px">
 <v-btn color="error" fab large @click="LoginGoogle" style="   
    font-size: 160%;
    font-weight: bolder;">
              <!-- <v-icon>fa-search</v-icon> -->
              G+
            </v-btn>
             <!-- <v-btn block round  color="primary" style="padding:15px; height: 55px">
            <v-icon left dark>cloud_upload</v-icon> Google+

                </v-btn> -->
            </v-flex>
            <v-flex xs6 sm6 md6 style="text-align: left;  padding: 0 15px">
 <v-btn color="error" fab large @click="LoginWithPhone" id="sign-in-button" style="   
    font-size: 160%;
    font-weight: bolder;">
              <!-- <v-icon>fa-search</v-icon> -->
              P
            </v-btn>
             <!-- <v-btn block round  color="primary" style="padding:15px; height: 55px">
            <v-icon left dark>cloud_upload</v-icon> Google+

                </v-btn> -->
            </v-flex>
            <v-flex  xs6 sm6 md6>
               <div id="recaptcha-container"></div>
            </v-flex>

            
           
         
</v-layout>
   
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
   <v-snackbar
      v-model="openSnack"
      color="red"
      multi-line="multi-line"
      :timeout="6000"
      :vertical="'vertical'"
    >
      {{snackbarMsg}}
      <v-btn
        dark
        flat
        @click="openSnack = false"
      >
        Close
      </v-btn>
    </v-snackbar>
      </v-card>
    </v-flex>
  </v-layout>
 </v-app>
</template>

<script>

 import firebase from 'firebase';
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'


export default {
    mounted(){
      // const currentUser = firebase.auth().currentUser;
      // console.log(currentUser);
      
        // this.LoginGoogle()
    },
    data(){
      return {
registervalid: true,
valid: true,
loading: false,
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password must be less than 10 characters',
        v => (v && v.length <= 10) || ''
      ],
       confirmRules: [
        v => (this.password == v) || 'Passwords don not match'
      ],
      email: '',
      nameRules: [
        v => !!v || 'Username is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      snackbarMsg: '',
      openSnack: false,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false
      }
    },
  computed: {
   ...mapGetters([
           'Load_currentUser'
      // ...
         ]),

  },
methods:{
   ...mapWaitingActions('users', {
      saveUser: 'save_user',
    }),
    LoginWithPhone(){
      var phoneNumber = "+254713591452"
      firebase.auth().useDeviceLanguage();
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': function(response) {
        console.log("Ia am here");
        
      console.log(response);
      
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
            console.log("I AM ALSO HERE");
            // var code = "123456";
            //   confirmationResult.confirm(code).then(function (result) {
            //     // User signed in successfully.
            //     var user = result.user;
            //     console.log(user);
                
            //     // ...
            //   })
            //   .then(function() {
            //         let  user = firebase.auth().currentUser;
            //         console.log(user);
                    
            //         user.updateProfile({displayName: "0713591452", photoURL: 'https://res.cloudinary.com/micqual/image/upload/c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1550606890/eubglhmr9eupdshbxmgf.jpg'});
            //     })
            //     .catch(function (error) {
            //     // User couldn't sign in (bad verification code?)
            //     // ...
            //   });
          console.log(confirmationResult);
          
        })
        
       .catch(function (error) {
          // Error; SMS not sent
          console.log(error);
          
          // ...
        });
    },
  validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      loginWithEmailAndPassword(){
          if (this.$refs.loginform.validate()) {
            this.loading = true
    let email = this.email
        let password = this.password
        let vm = this
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          response => {
            // console.log(response);
            vm.loading = false
            vm.$router.replace('/')
            
          }
        )
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          //  console.log(error);
          
           vm.snackbarMsg =  errorMessage
            vm.openSnack = true
          
          vm.loading = false

        });

          }
        
      },
      createUserWithEmailAndPassword(){
         if (this.$refs.registerform.validate()) {
           this.loading = true
        let email = this.email
        let password = this.password
        let username = this.username
        let vm = this
        firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(function () {
           let user = firebase.auth().currentUser;
            user.sendEmailVerification();
          })
        .then(function() {
          let  user = firebase.auth().currentUser;
          user.updateProfile({displayName: username, photoURL: 'https://res.cloudinary.com/micqual/image/upload/c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1550606890/eubglhmr9eupdshbxmgf.jpg'});
          vm.loading = false
           vm.$router.replace('/')
       })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // console.log(error);
          
           vm.snackbarMsg =  errorMessage

            vm.openSnack = true
          
          vm.loading = false

          // ...
        });
         }
      },
    LoginFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
  let vm = this
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // console.log(user);git
        vm.$router.replace('/')
        // ...
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
         vm.snackbarMsg =  errorMessage

            vm.openSnack = true
        // ...
        });
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    signUp(){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
    },
    signIn(){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
    },
    LoginGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
  let vm = this

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            // console.log(user);
            vm.$router.replace('/')
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // console.log(error);

             vm.snackbarMsg =  errorMessage

            vm.openSnack = true
            
            // ...
            });
    }
}
}
</script>

<style scoped>
p {
    margin-bottom: 0px;
    font-size: 120%;
    font-weight: bold;
}
</style>
