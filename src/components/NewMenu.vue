<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-toolbar card prominent>
        <v-btn icon color="cyan" flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="body-2 grey--text">Create an new Menu</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <v-btn icon class="hidden-xs-only">
              <v-icon>search</v-icon>
        </v-btn>-->
      </v-toolbar>
      <v-card :raised="false" style="box-shadow: none; padding: 40px">
        <div></div>
  <!-- <pre>
    {{ Load_currentUser }}
  </pre> -->
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap style="padding-top: 20px">
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="menuName"
                :rules="nameRules"
                label="Restaraunt/Hotel/Grocery Fullname"
                placeholder="e.g Edlina Hotel and restaurant"
                required
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
                <v-toolbar
      dense
    >
        <div class="pac-card" id="pac-card">
  
                    <div id="pac-container">
  
                     
                        <!-- <input id="pac-input" class="form-control" ref="source" type="text" placeholder="Enter pick up point"> -->
                      <v-text-field id="pac-input"
                      v-model="menuForm.menuLocation"
                      ref="source"
                                placeholder="Enter a location here"
                              ></v-text-field>
                       
  
                    </div>
  
                  </div>

      <v-btn icon @click="initializeMaps">
        <v-icon>my_location</v-icon>
      </v-btn>
    </v-toolbar>
              <!-- <v-text-field
                v-model="menuForm.menuLocation"
                :rules="nameRules"
                label="Hotel Location"
                placeholder="e.g Westalnds, Nairobi"
                required
                prepend-icon="place"
                outline
              ></v-text-field>
               <v-btn  color="primary" fab small dark>
              <v-icon>edit</v-icon>
            </v-btn> -->
            </v-flex>
           
            <v-flex xs12 sm12 md12>
              <v-textarea
                outline
                :rules="nameRules"
                v-model="menuForm.menuSlogan"
                name="input-7-4"
                label="Restaraunt description/Slogan"
                placeholder
                value
              ></v-textarea>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <file-pond
                name="file"
                ref="pond"
                label-idle="<sup>*</sup>Drag & Drop Your Retaraunt logo here or <span class='filepond--label-action'> Browse </span>"
                allow-multiple="false"
                accepted-file-types="image/jpeg, image/png"
                v-bind:files="myFiles"
                @processfile="handleProcessSuccess"
                v-on:init="handleFilePondInit"
              />
            </v-flex>
            <v-flex xs12 sm12 md6>
              <file-pond
                name="file"
                ref="pond"
                label-idle="<sup>*</sup>Drag & Drop Your Retaraunt Cover Photo here or <span class='filepond--label-action'> Browse </span>"
                allow-multiple="false"
                accepted-file-types="image/jpeg, image/png"
                v-bind:files="myCover"
                @processfile="handleProcessSuccessCover"
                v-on:init="handleFilePondInit"
              />
            </v-flex>
            <v-flex xs12 sm12 md6 style="text-align: center">
                Your hiMenu Code
              <div
                style="
    text-align: center;
    padding: 40px;
    font-size: 300%;
    font-style: normal;
    background: #f2f2f2;
    font-weight: bolder;
    border-radius: 10px;
"
              >{{menuForm.menuCode }}</div>
            </v-flex>
            <v-flex xs12 sm12 md6 style="text-align: center">
              <qrcode-vue :value="value" :size="size" level="H" foreground="#fa4112"></qrcode-vue>
                 
              <v-hover v-show="false">
                <v-card
                  slot-scope="{ hover }"
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    v-if="dataImage"
                    :src="dataImage"
                    height="200px"
                    style="background-size: contain !important; top: 10px"
                  >
                  
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >HIMENU</div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="pt-4" style="position: relative; ">
                    <v-btn
                      absolute
                      color="orange"
                      class="white--text"
                      :disabled="dataImage == null"
                      fab
                      large
                      right
                      top
                    >
                      <v-icon>arrow_downward</v-icon>
                    </v-btn>
                    <div class="font-weight-light grey--text title mb-2">Generated QRCODE</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="By creating your menu, you allow hiMenu to share it publicly. Do you agree?"
            required
          ></v-checkbox>

          <v-btn :disabled="!valid && dialog"  color="success" @click="validate"  :loading="dialog">Publish My hiMenu
<v-icon left dark>cloud_upload</v-icon>

          </v-btn>

          <v-btn color="error" @click="reset">Reset</v-btn>
 <v-dialog
      v-model="dialog"
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
     <v-dialog v-model="mapdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="mapdialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Set Hotel Location using Pin</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="mapdialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
         <v-toolbar
         style="margin-top: 10px; position: absolute; z-index: 2"
      dense
      floating
    >
    <v-btn icon @click="mapdialog = false">
        <v-icon>arrow_back</v-icon>
      </v-btn>
        <div class="pac-card" id="pac-card">
  
                    <div id="pac-container" >
  
                     
                      <v-text-field id="pac-input2"
                      v-model="menuForm.menuLocation"
                      ref="source"
                                placeholder="Enter a location here"
                              ></v-text-field>
                       
  
                    </div>
  
                  </div>

      
     
    </v-toolbar>
     
       

     
      <div id="mapmy"></div>
  
   
      </v-card>

    </v-dialog>
          <!-- <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
          </v-btn>-->
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// Import Vue FilePond
import vueFilePond, { setOptions } from "vue-filepond";
import QrcodeVue from "qrcode.vue";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
const axios = require('axios');
 import { find } from 'lodash'
 import firebase from '../service/firebase'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import GoogleMapsLoader from "google-maps";

import getLocation from "./utils/GeoLocation";

import styles from "./utils/styles";
// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
GoogleMapsLoader.KEY = "AIzaSyBwNhtFQMlUzChkztqeQ3dI9Xz4CNEWEP0";
GoogleMapsLoader.LIBRARIES = ["geometry", "places"];
GoogleMapsLoader.REGION = "KE";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  components: {
    FilePond,
    QrcodeVue
  },
  
  watch: {
    dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      },
    menuName: function(val) {
      console.log(val);
      if (val != "" && val.length < 2) {
        
        var countdown = function(value,vm) {
            let random = Math.floor(Math.random() * 899 + 100);
            let code = val.charAt(0).toUpperCase() + random;
              if (value == 1) {
                 let menu = firebase.database.ref('menus/' + code);
                    menu.on("value", function(snapshot, prevChildKey) {
                      var newMenu = snapshot.val();
                      let found = false;
                      // vm.menu = newMenu
                      console.log(newMenu);
                      console.log(code)
                      
                      if(newMenu == null){
                        value = code
                      }
                    
                      
                    });
                      return countdown(value,vm);

              } else {
                  return value;
              }
          };
        
        console.log("===============");
        
        console.log();
        this.menuForm.menuCode = countdown(1,this)

        this.value = this.menuForm.menuCode;
        console.log(this.value);
        
        
      }
    }

  },
  data: () => ({
    mapdialog: false,
    value: "https://example.com/",
    size: 250,
    valid: true,
    sendingFirebase: false,
    name: "",
    code: "",
    dialog: false,
    dataImage: null,
    menuName: "",
    menuForm: {
        menuCode: '',
        menuSlogan: "",
        menuCoverUrl: "https://res.cloudinary.com/micqual/image/upload/v1550411486/download.jpg",
        menuLogoUrl: "https://res.cloudinary.com/micqual/image/upload/v1550411381/Group_14.png",
        menuLocation: "",
        menuQRcode: '',
        thumb_menuCoverUrl: "https://res.cloudinary.com/micqual/image/upload/w_400,h_300/v1550411486/download.jpg",
        thumb_menuLogoUrl: "https://res.cloudinary.com/micqual/image/upload/w_200,h_200/v1550411381/Group_14.png"
    },
    nameRules: [
      v => !!v || "Name is required"
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    myFiles: [],
    pin_src: null,
    sourceMarker: null,
    sourcePop: null,
    location_details: "",
    place_id: '',
     sourcePoint: null,
       mymap: null, 
       pin_src: null,
    myCover: [],
    cloudinary: {
      uploadPreset: "n6mgm8sq",
      apiKey: "Rx89lOR04EUUysYn2WF_LamWCgc",
      cloudName: "micqual"
    },
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),
  computed: {
     ...mapGetters([
           'Load_currentUser'
      // ...
         ]),
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },
  mounted(){
    
  },
  created(){
    let self = this
GoogleMapsLoader.load(google => {
     var autocomplete = new google.maps.places.Autocomplete(
          document.getElementById("pac-input")
        );

        autocomplete.addListener("place_changed", () => {
          let place = autocomplete.getPlace();

         console.log("===============SOURCE=====================");

         console.log(place);


          self.setPlace(place);
        });

     

        
});
    
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {

        var image = document
          .getElementById("myCanvas")
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        // console.log(image);
        this.dataImage = image;
        //   this.snackbar = true
        console.log(this.menuForm);
         const formData = new FormData()
      formData.append('file', this.dataImage);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded');
      // For debug purpose only
      // Inspects the content of formData
       this.dialog = true

      let vm = this
     
      axios.post(this.clUrl, formData).then(res => {
        console.log(res);
        vm.menuForm.menuQRcode = res.data.url
       firebase.database.ref('menus').child(vm.menuForm.menuCode).set(
         {
              'name': vm.menuName,
              'code': vm.menuForm.menuCode,
              'slogan': vm.menuForm.menuSlogan,
              'location': vm.menuForm.menuLocation,
              'QRcode': vm.menuForm.menuQRcode,
              'logoUrl': vm.menuForm.menuLogoUrl,
              'coverPhoto': vm.menuForm.menuCoverUrl,
              'thumb_logo': vm.menuForm.thumb_menuLogoUrl,
              'thumb_cover': vm.menuForm.thumb_menuCoverUrl,
              'menuLatLng': vm.sourcePoint,
              'created_at': -1 * new Date().getTime(),
              "uid": vm.Load_currentUser.uid
            }
       ).then(this.$router.push('/'))
        //     this.dialog = false

        // vm.$root.$firebaseRefs.menus.push(
        //     {
        //       'name': vm.menuName,
        //       'code': vm.menuForm.menuCode,
        //       'slogan': vm.menuForm.menuSlogan,
        //       'location': vm.menuForm.menuLocation,
        //       'QRcode': vm.menuForm.menuQRcode,
        //       'logoUrl': vm.menuForm.menuLogoUrl,
        //       'coverPhoto': vm.menuForm.menuCoverUrl,
        //       'thumb_logo': vm.menuForm.thumb_menuLogoUrl,
        //       'thumb_cover': vm.menuForm.thumb_menuCoverUrl,
        //       'created_at': -1 * new Date().getTime(),
        //     })
        //     .then(this.$router.push('/'))

      })
      }

    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    initializeMaps(){
      this.mapdialog = true
       GoogleMapsLoader.load(google => {
      getLocation(location => {
        let geocoder = new google.maps.Geocoder();

        const self = this;

        let position = {
          lat: location.coords.latitude,

          lng: location.coords.longitude
        }; //End Position

        // let username = this.currentUser.name

        // let user_details = {

        //     location: position,

        //     timestamp: today.toISOString()

        // }

        // var userRef = firebase.database().ref(`users/${this.name}`);

        // userRef.update({user_details});

        geocoder.geocode(
          {
            location: position
          },

          function(results, status) {
            if (status === "OK") {
              if (results[0]) {
                //    console.log('=================MY LOCATION HERE===================');

                //    console.log(results[0]);

                //    console.log('====================================');

                self.location_details = results[0].formatted_address; //Set the initial location deatils

                // self.trip.source = results[0].formatted_address;
                self.menuForm.menuLocation = results[0].formatted_address;

                // self.$refs.source.value = results[0].formatted_address;

                self.setPlace(results[0]);

                self.place_id = results[0].place_id;

                self.sourcePoint = {
                  latitude: results[0].geometry.location.lat(),

                  longitude: results[0].geometry.location.lng()
                };
              } else {
                window.alert("No results found"); //TODO handle this later on
              }
            } else {
              window.alert("Geocoder failed due to: " + status); //TODO also handle this later
            }
          }
        ); //End geocode for the very first time

        this.pin_src = position;

        let map = new google.maps.Map(document.getElementById("mapmy"), {
          zoom: 15,

          center: position,

          styles: styles.silver
        }); //End Map

        //Source marker

        // var input = document.getElementById('pac-input');

        var autocomplete = new google.maps.places.Autocomplete(
          document.getElementById("pac-input")
        );

        autocomplete.addListener("place_changed", () => {
          let place = autocomplete.getPlace();

         console.log("===============SOURCE=====================");

         console.log(place);

         console.log("====================================");

          self.setPlace(place);
        });

        var autocomplete2 = new google.maps.places.Autocomplete(
          document.getElementById("pac-input2")
        );

        autocomplete2.addListener("place_changed", () => {
          let place = autocomplete2.getPlace();

        //  console.log("===============SOURCE=====================");

         // console.log(place);

        //  console.log("====================================");

          self.setPlace(place);
        });
        

       

        // console.log('=====================My auto Complete===============');

        // console.log(autocomplete);

        // console.log('====================================');

        // autocomplete.bindTo('bounds', map);

        this.mymap = map;

        let myLocmarker = new google.maps.Marker({
          flat: true,

          icon: {
            path: google.maps.SymbolPath.CIRCLE,

            scale: 8,

            fillOpacity: 0.8,

            strokeColor: "gold",

            strokeWeight: 5
          },

          map: this.mymap,

          optimized: false,

          position: position,

          title: "location",

          visible: true
        }); //end Marker Icon Location Image

        // var Popup = this.createPopUpClass(); //Create the popup class here

        // let popup = new Popup(
        //   new google.maps.LatLng(position.lat, position.lng),

        //   document.getElementById("loc_pop")
        // ); //Add a popup for the current location

        // popup.setMap(map); //Add the popup to the map

        // myLocmarker.addListener("click", function() {
        //   // infowindow.open(map, myLocmarker);
        // }); //This method is yet to be used, man i have alot on my plate

        let pin = new google.maps.Marker({
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,

            scale: 5,

            fillOpacity: 0.8,

            strokeColor: "gold",

            strokeWeight: 1
          },

          map: map,

          position: map.getCenter(),

          title: "Pin"
        });

        map.addListener("dragend", e => {
          let pos = {
            lat: map.getCenter().lat(),

            lng: map.getCenter().lng()
          };

          geocoder.geocode(
            {
              location: pos
            },

            function(results, status) {
              if (status === "OK") {
                if (results[0]) {
                  console.log('================GOECODED MESSAGE====================');

                  console.log(results[0]);

                  console.log('====================================');

                  self.location_details = results[0].formatted_address;
                  self.menuForm.menuLocation =  results[0].formatted_address;
                  // self.location_data = results[0];
                } else {
                  window.alert("No results found"); //TODO handle this later on
                }
              } else {
                window.alert("Geocoder failed due to: " + status); //TODO also handle this later
              }
            }
          );
        });

        map.addListener("drag", function(e) {
          // this.pin_dest = map.getCenter();

          let pos = {
            lat: map.getCenter().lat(),

            lng: map.getCenter().lng()
          };

          // console.log('==================fgfgfgfg==================');

          // console.log(JSON.stringify(map.getCenter()));

          // console.log('====================================');

          pin.setPosition(map.getCenter()); //Updates the pin location to the center of map

          // self.pin_dest = pos;

          // console.log('====================================');

          // console.log(map.getCenter());

          // console.log(self.pin_dest);
          // console.log('====================================');
        }); //End the map listener
      }); //End getLocation
    }); //End GooglemapsLoader

    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");
      setOptions({
        server: {
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort
          ) => {
            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);
            formData.append("upload_preset", this.cloudinary.uploadPreset);
            formData.append("tags", "gs-vue,gs-vue-uploaded");

            console.log(formData);
            for (var pair of formData.entries()) {
              console.log(pair[0] + ", " + pair[1]);
            }

            // return true;

            const request = new XMLHttpRequest();
            request.open("POST", this.clUrl);

            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = e => {
              progress(e.lengthComputable, e.loaded, e.total);
            };

            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = function() {
              if (request.status >= 200 && request.status < 300) {
                // the load method accepts either a string (id) or an object
                load(request.responseText);
              } else {
                // Can call the error method if something is wrong, should exit after
                error("oh no");
              }
            };

            request.send(formData);

            // Should expose an abort method so the request can be cancelled
            return {
              abort: () => {
                // This function is entered if the user has tapped the cancel button
                request.abort();

                // Let FilePond know the request has been cancelled
                abort();
              }
            };
          }
        }
      });

      // FilePond instance methods are available on `this.$refs.pond`
    },
    handleProcessSuccess(error, file) {
      console.log("Processed logo");
      let cloudinaryResp = JSON.parse(file.serverId);
      console.log(cloudinaryResp);
      this.menuForm.menuLogoUrl = cloudinaryResp.url
      this.menuForm.thumb_menuLogoUrl = `https://res.cloudinary.com/micqual/image/upload/w_200,h_200/v${cloudinaryResp.version}/${cloudinaryResp.public_id}.${cloudinaryResp.format}`

    },
    handleProcessSuccessCover(error, file) {
      console.log("Processed Cover");
      let cloudinaryResp = JSON.parse(file.serverId);
      console.log(cloudinaryResp);
      this.menuForm.menuCoverUrl = cloudinaryResp.url
      this.menuForm.thumb_menuCoverUrl = `https://res.cloudinary.com/micqual/image/upload/w_400,h_300/v${cloudinaryResp.version}/${cloudinaryResp.public_id}.${cloudinaryResp.format}`
      // 
    //   
    //   {public_id: "cvxjosardnmchrzqtaae", version: 1550412059,
    },
    createPopUpClass() {
      var Popup;

      Popup = function(position, content) {
        this.position = position;

        content.classList.add("popup-bubble-content");

        var pixelOffset = document.createElement("div");

        pixelOffset.classList.add("popup-bubble-anchor");

        pixelOffset.appendChild(content);

        this.anchor = document.createElement("div");

        this.anchor.classList.add("popup-tip-anchor");

        this.anchor.appendChild(pixelOffset);

        // Optionally stop clicks, etc., from bubbling up to the map.

        this.stopEventPropagation();
      };

      // NOTE: google.maps.OverlayView is only defined once the Maps API has

      // loaded. That is why Popup is defined inside initMap().

      Popup.prototype = Object.create(google.maps.OverlayView.prototype);

      /** Called when the popup is added to the map. */

      Popup.prototype.onAdd = function() {
        this.getPanes().floatPane.appendChild(this.anchor);
      };

      /** Called when the popup is removed from the map. */

      Popup.prototype.onRemove = function() {
        if (this.anchor.parentElement) {
          this.anchor.parentElement.removeChild(this.anchor);
        }
      };

      /** Called when the popup needs to draw itself. */

      Popup.prototype.draw = function() {
        var divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position
        );

        // Hide the popup when it is far out of view.

        var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
            ? "block"
            : "none";

        if (display === "block") {
          this.anchor.style.left = divPosition.x + "px";

          this.anchor.style.top = divPosition.y + "px";
        }

        if (this.anchor.style.display !== display) {
          this.anchor.style.display = display;
        }
      };

      /** Stops clicks/drags from bubbling up to the map. */

      Popup.prototype.stopEventPropagation = function() {
        var anchor = this.anchor;

        anchor.style.cursor = "auto";

        [
          "click",

          "dblclick",

          "contextmenu",

          "wheel",

          "mousedown",

          "touchstart",

          "pointerdown"
        ].forEach(function(event) {
          anchor.addEventListener(event, function(e) {
            e.stopPropagation();
          });
        });
      };

      return Popup;
    },
     setPlace(place) {
      // this.trip.source = this.$refs.source.value;

      if (this.sourceMarker != null) {
        this.sourceMarker.setMap(null);
      }

      // console.log("====================================");

      // console.log(this.$refs.source.value);

      // console.log("====================================");

      let position = {
        lat: place.geometry.location.lat(),

        lng: place.geometry.location.lng()
      };

      // let Popup = this.createPopUpClass();

      // this.sourcePop = new Popup(
      //   new google.maps.LatLng(position.lat, position.lng),

      //   document.getElementById("loc_pop")
      // ); //Add a popup for the current location

      // this.sourcePop.setMap(this.mymap); //Add the popup to the map

      this.sourceMarker = new google.maps.Marker({
        flat: true,

        icon: {
          path: google.maps.SymbolPath.CIRCLE,

          scale: 8,

          fillOpacity: 0.8,

          strokeColor: "gold",

          strokeWeight: 5
        },

        map: this.mymap,

        optimized: false,

        position: position,

        visible: true
      }); //end Marker Icon Location Image

      if(this.mymap != null){
      this.mymap.setCenter(position);
      }

      this.place_id = place.place_id;

      this.sourcePoint = {
        latitude: place.geometry.location.lat(),

        longitude: place.geometry.location.lng()
      };

    },

  }
};
</script>

<style>
.v-image__image .v-image__image--cover {
  background-size: contain !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

#mapmy {
  position: absolute;

  width: 100%;

  height: 100vh;
}

/* your custom CSS \*/

@-moz-keyframes pulsate {
  from {
    -moz-transform: scale(0.25);

    opacity: 1;
  }

  95% {
    -moz-transform: scale(1.3);

    opacity: 0;
  }

  to {
    -moz-transform: scale(0.3);

    opacity: 0;
  }
}

@-webkit-keyframes pulsate {
  from {
    -webkit-transform: scale(0.25);

    opacity: 1;
  }

  95% {
    -webkit-transform: scale(1.3);

    opacity: 0;
  }

  to {
    -webkit-transform: scale(0.3);

    opacity: 0;
  }
}

/* get the container that's just outside the marker image, 
  
      		which just happens to have our Marker title in it */

#mapmy div.gmnoprint[title="location"] {
  -moz-animation: pulsate 1.5s ease-in-out infinite;

  -webkit-animation: pulsate 1.5s ease-in-out infinite;

  border: 100px solid rgb(251, 255, 8);

  /* make a circle */

  -moz-border-radius: 50%;

  -webkit-border-radius: 50%;

  border-radius: 50%;

  /* multiply the shadows, inside and outside the circle */

  -moz-box-shadow: inset 0 0 5px rgb(221, 255, 0),
    inset 0 0 5px rgb(243, 255, 19), inset 0 0 5px gold, 0 0 5px gold,
    0 0 5px gold, 0 0 5px gold;

  -webkit-box-shadow: inset 0 0 5px rgb(221, 255, 0),
    inset 0 0 5px rgb(221, 255, 0), inset 0 0 5px gold, 0 0 5px gold,
    0 0 5px gold, 0 0 5px gold;

  box-shadow: inset 0 0 5px rgb(229, 255, 0), inset 0 0 5px rgb(221, 255, 0),
    inset 0 0 5px gold, 0 0 5px gold, 0 0 5px gold, 0 0 5px gold;

  /* set the ring's new dimension and re-center it */

  height: 11px !important;

  margin: -90px 0 0 -90px;

  width: 51px !important;
}

/* hide the superfluous marker image since it would expand and shrink with its containing element */
.popup-tip-anchor {
  height: 0;

  position: absolute;
}

/* The bubble is anchored above the tip. */

.popup-bubble-anchor {
  position: absolute;

  width: 100%;

  bottom: 8px;

  left: 0;
}

/* Draw the tip. */

.popup-bubble-anchor::after {
  content: "";

  position: absolute;

  top: 0;

  left: 0;

  /* Center the tip horizontally. */

  transform: translate(-50%, 0);

  /* The tip is a https://css-tricks.com/snippets/css/css-triangle/ */

  width: 0;

  height: 0;
}

/* The popup bubble itself. */

.popup-bubble-content {
  position: absolute;

  top: 0;

  left: 0;

  transform: translate(-50%, -100%);
}

#location-card {
      position: absolute;
     
    z-index: 1;
    left: 35%;
    width: 30%;
}
.pin-lock {
  position: absolute;

  height: 60px;

  left: 53.1%;

  top: 46%;

  padding-left: 60px;
}

.loc_pin {
  position: absolute;

  height: 50px;

  left: 0%;

  top: 0%;

  width: 200px;

  /* border-radius: 50%; */

  /* background: #000000; */

  border-left: 8px groove black;

  /* opacity: .8; */

  text-align: center;

  padding: px;

  margin: -55px 1px 0px -140px;
}

.loc_pin2 {
  position: absolute;

  height: 50px;

  left: 0%;

  top: 0%;

  width: 200px;

  /* border-radius: 50%; */

  /* background: #000000; */

  border-left: 8px groove gold;

  /* opacity: .8; */

  text-align: center;

  padding: px;

  margin: -55px 1px 0px -140px;
}

.pin {
  position: absolute;

  height: 60px;

  left: 0%;

  top: 0%;

  width: 60px;

  /* border-radius: 50%; */

  background: #000000;

  /* border: 2px solid gold; */

  opacity: 0.8;

  text-align: center;

  padding: 6px;
}

/*	#mapmy_canvas div[style*="987654"][title] img {*/

#mapmy div.gmnoprint[title="location"] img {
  display: none;
}

/* compensate for iPhone and Android devices with high DPI, add iPad media query */

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (device-width: 768px) {
  #mapmy div.gmnoprint[title="location"] {
    margin: -10px 0 0 -10px;
  }
  #location-card {
      position: absolute;
    z-index: 1;
    left: 5%;
    width: 90%;
}
}

.donepicker {
  text-align: center;

  max-width: 95% !important;

  width: 100%;

  position: fixed;

  bottom: 0px;

  z-index: 1;
}
</style>
