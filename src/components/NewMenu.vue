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
              <v-text-field
                v-model="menuForm.menuLocation"
                :rules="nameRules"
                label="Hotel Location"
                placeholder="e.g Westalnds, Nairobi"
                required
                prepend-icon="place"
                outline
              ></v-text-field>
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
              <qrcode-vue :value="value" :size="size" level="H" foreground="#fa4112" v-show="false"></qrcode-vue>
              <v-hover>
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

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
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
        thumb_menuCoverUrl: "https://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v1550411486/download.jpg",
        thumb_menuLogoUrl: "https://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v1550411381/Group_14.png"
    },
    nameRules: [
      v => !!v || "Name is required"
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    myFiles: [],
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
      this.menuForm.thumb_menuLogoUrl = `https://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v${cloudinaryResp.version}/${cloudinaryResp.public_id}.${cloudinaryResp.format}`

    },
    handleProcessSuccessCover(error, file) {
      console.log("Processed Cover");
      let cloudinaryResp = JSON.parse(file.serverId);
      console.log(cloudinaryResp);
      this.menuForm.menuCoverUrl = cloudinaryResp.url
      this.menuForm.thumb_menuCoverUrl = `https://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v${cloudinaryResp.version}/${cloudinaryResp.public_id}.${cloudinaryResp.format}`
      // 
    //   
    //   {public_id: "cvxjosardnmchrzqtaae", version: 1550412059,
    }
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
</style>
