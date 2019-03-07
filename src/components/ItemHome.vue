<template>
  <v-layout row  style="height: 100vh; background: #fff; padding-top: 5vh">
    <v-flex xs12 sm6 offset-sm3>
        
 <v-toolbar
      absolute
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      dark
      color="primary"
    >
      <!-- <v-btn icon flat @click="$router.push('/menu/'+$route.params.menu_id+'/categories')">
          <v-icon>arrow_back</v-icon>
      </v-btn> -->
      <v-btn icon flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      <v-toolbar-title>{{ itemForm.itemName }}</v-toolbar-title>
   
      <v-spacer></v-spacer>
      <v-btn icon @click="dialogDelete = true">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>    
     
      <v-card :raised="false" style="box-shadow: none; padding: 40px">
        <div></div>
  
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap style="padding-top: 20px">
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="itemForm.itemName"
                :rules="nameRules"
                label="Food/Meal Name"
                placeholder="e.g Coffee or Tea"
                required
                box
              ></v-text-field>
            </v-flex>
            
            <v-flex xs12 sm12 md12>
              <v-textarea
                box
                v-model="itemForm.itemDescription"
                name="input-7-4"
                label="Description"
                placeholder
                value
              ></v-textarea>
            </v-flex>
            <v-flex xs12 sm12 md12>
                   <v-text-field
                   v-model="itemForm.itemPrice"
                :rules="nameRules"
          label="Food/Meal Price"
        placeholder="e.g 2000"
        type="number"
          prefix="Kes"
          required
                box
        ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <file-pond
                name="file"
                ref="pond"
                label-idle="<sup>*</sup>Drag & Drop item photo here or <span class='filepond--label-action'> Browse </span>"
                allow-multiple="false"
                accepted-file-types="image/jpeg, image/png"
                v-bind:files="myFiles"
                @processfile="handleProcessSuccess"
                v-on:init="handleFilePondInit"
              />
            </v-flex>
          </v-layout>


          <v-btn :disabled="!valid && dialog"  color="success" @click="validate"  :loading="dialog">Add new Meal
<v-icon left dark>cloud_upload</v-icon>

          </v-btn>

          <v-btn color="error" @click="reset">Reset</v-btn>
           <v-dialog
      v-model="dialogDelete"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete {{ itemForm.itemName }}?</v-card-title>

        <v-card-text>
         The operation will delete {{ itemForm.itemName }}!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          

          <v-btn
            color="red"
            flat="flat"
            @click="removeItem"
          >
            Delete anyway
          </v-btn>
          
          <v-btn
            color="green darken-1"
      class="white--text"
            @click="dialogDelete = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
// Import FilePond styles
import "filepond/dist/filepond.min.css";
const axios = require('axios');
 import { find } from 'lodash'
 import firebase from '../service/firebase'

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
    FilePond
  },
  watch: {
    dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
      }
    
  },
  data: () => ({
      item: null,
    valid: true,
    sendingFirebase: false,
    dialog: false,
    dialogDelete: false,
    itemForm: {
        itemName: 'Item',
        itemDescription: "",
        photo_url: "http://res.cloudinary.com/micqual/image/upload/v1550605880/r9qzym7evq7e2qw2odqh.png",
        thumb_url: "http://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v1550605880/r9qzym7evq7e2qw2odqh.png",
        itemPrice: '',
    },
    nameRules: [
      v => !!v || "Name is required"
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    myFiles: [],
    cloudinary: {
      uploadPreset: "n6mgm8sq",
      apiKey: "Rx89lOR04EUUysYn2WF_LamWCgc",
      cloudName: "micqual"
    },
    select: null,
  }),
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },
  mounted () {
     let item = firebase.database.ref('menus/' + this.$route.params.menu_id).child('categories').child(this.$route.params.cat_id).child(this.$route.params.item_id)
      let vm = this
       item.on("child_added", function(snapshot, prevChildKey) {
        // vm.menu = newPost
         var item = snapshot.val();
        // vm.item = item
             vm.itemForm.photo_url = item.photo_url
              vm.itemForm.thumb_url = item.thumb_url
              vm.itemForm.itemName = item.name
              vm.itemForm.itemDescription = item.description
              vm.itemForm.itemPrice = item.price
            //   vm.myFiles.push(item.photo_url)
        
      });
       item.on("value", function(snapshot, prevChildKey) {
        // vm.menu = newPost
         var item = snapshot.val();
        // vm.item = item
              vm.itemForm.photo_url = item.photo_url
              vm.itemForm.thumb_url = item.thumb_url
              vm.itemForm.itemName = item.name
              vm.itemForm.itemDescription = item.description
              vm.itemForm.itemPrice = item.price
        console.log(item);
        
      });
    },
  methods: {
    removeItem(){
       let obj = firebase.database.ref('menus/' + this.$route.params.menu_id);
         obj.child('categories').child(this.$route.params.cat_id).child(this.$route.params.item_id).remove()
         this.$router.go(-1)
         this.dialogDelete = false
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log(this.itemForm);
        
        
        firebase.database.ref('menus').child(this.$route.params.menu_id).child('categories').child(this.$route.params.cat_id).child(this.$route.params.item_id).update(
         {
              'name': this.itemForm.itemName,
              'description': this.itemForm.itemDescription,
              'price':this.itemForm.itemPrice,
              'thumb_url': this.itemForm.thumb_url,
              'photo_url': this.itemForm.photo_url,
              'quantity': 1,
              'created_at': -1 * new Date().getTime(),
            }
       ).then(this.$router.push('/menu/'+this.$route.params.menu_id+'/'+this.$route.params.cat_id+'/list'))
    //     vm.menuForm.menuQRcode = res.data.url
    //    firebase.database.ref('menus').child(vm.menuForm.menuCode).set(
    //      {
              
    //           'created_at': -1 * new Date().getTime(),
    //         }
    //    ).then(this.$router.push('/'))
        
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
      this.itemForm.photo_url = cloudinaryResp.url
      this.itemForm.thumb_url = `https://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v${cloudinaryResp.version}/${cloudinaryResp.public_id}.${cloudinaryResp.format}`

    },
  }
};
</script>

<style>
.v-image__image .v-image__image--cover {
  background-size: contain !important;
}
.v-image__image--cover {
  /* background-size: contain; */
  /* top: 10px; */
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
