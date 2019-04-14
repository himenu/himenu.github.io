<template>
  <v-layout row style="">
    <v-flex xs12 sm12>
      <v-card style="box-shadow: none;">
        <v-img
          v-if="menu"
          :src="menu.coverPhoto"
          :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
          height="300px"
        >
          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
          <v-layout column fill-height>
            <v-card-title>
              <v-btn dark fab color="primary" @click="$router.push('/list')">
                <v-icon dark>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                fab
                dark
                color="pink"
                icon
                class="mr-3"
                @click="$router.push('/view/'+$route.params.menu_id)"
              >
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn color="orange" dark @click="downloadQR(menu.QRcode)">
                <v-icon dark>backup</v-icon>Download QRcode
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title
              primary-title
              style="background: rgba(0, 0, 0, 0.6); padding: 25px; line-height: 3"
            >
              <div>
                <div class="title white--text">{{ menu.name }}</div>
                <span class="white--text">{{ menu.slogan }}</span>
              </div>
            </v-card-title>
          </v-layout>
        </v-img>
        <v-card :raised="false" style="box-shadow: none; border-radius: 0px; padding: 0px">
          <v-tabs centered dark color="orange" icons-and-text>
            <v-tab href="#tab-1">
              All Categories
              <v-icon>category</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              HiOffers
              <v-icon>local_offer</v-icon>
            </v-tab>

            <v-tab-item value="tab-1">
              <v-card flat>
                <v-btn @click="dialog = true" color="primary" dark class="white--text">
                  Add Category
                  <v-icon right dark>cloud_upload</v-icon>
                </v-btn>

                <v-list two-line subheader v-if="categories">
                  <v-flex xs12 style="padding:0 10px;" v-if="categories.length < 1">
                    <vcl-twitch secondary="#FFC107" primary="#fb8c00"></vcl-twitch>
                  </v-flex>
                  <div v-for="category in categories" :key="category.name">
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
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-card flat>
                <v-btn @click="Offerdialog = true" color="primary" dark class="white--text">
                  Add Offer
                  <v-icon right dark>cloud_upload</v-icon>
                </v-btn>
                <v-tabs
                  dark
                  next-icon="mdi-arrow-right-bold-box-outline"
                  prev-icon="mdi-arrow-left-bold-box-outline"
                  show-arrows
                >
                  <v-tabs-slider></v-tabs-slider>

                  <v-tab
                    v-for="offer in offers"
                    :key="offer.name"
                    :href="'#day-'+offer.name"
                  >{{offer.name}}</v-tab>
                  <v-tabs-items>
                    <v-tab-item v-for="offer in offers" :key="offer.name" :value="'day-'+offer.name">
                      <v-card flat>
                        <v-card-text>
                          
                          <v-layout row wrap>
                            <v-flex
                                xs12
                                sm12
                                md4
                                v-for="myoffer in offer.data"
                                :key="myoffer.title"
                                style="padding:10px;"
                              >
                              <!-- {{ myoffer }} -->
                              <v-hover>
                                <v-card
                                  slot-scope="{ hover }"
                                  class="mx-auto"
                                  color="grey lighten-4"
                                  max-width="600"
                                >
                                  <v-img :aspect-ratio="16/9" :src="myoffer.image_url">
                                    <v-expand-transition>
                                      <div
                                        v-if="hover"
                                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                                        style="height: 100%;"
                                      >Kes {{ myoffer.price }}</div>
                                    </v-expand-transition>
                                  </v-img>
                                  <v-card-text class="pt-4" style="position: relative;">
                                    <v-btn
                                      absolute
                                      color="orange"
                                      class="white--text"
                                      fab
                                      right
                                      top
                                    >
                                      <v-icon>edit</v-icon>
                                    </v-btn>

                                    <!-- <div class="font-weight-light grey--text  mb-2"></div> -->
                                    <h3
                                      class="font-weight-light orange--text title mb-2"
                                    >{{ myoffer.title}}</h3>
                                    <div class="font-weight-light mb-2">{{ myoffer.description}}</div>
                                  </v-card-text>
                                </v-card>
                              </v-hover>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </v-tabs>
              </v-card>
            </v-tab-item>
          </v-tabs>

          <v-dialog v-model="Offerdialog" width="500">
            <v-card>
              <v-card-title class="headline orange lighten-2" primary-title>New Offer</v-card-title>

              <v-card-text>
                <v-form ref="offerform" v-model="offervalid" lazy-validation>
                  <v-layout row wrap style="padding: 0px">
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="myOffer.title"
                        :rules="nameRules"
                        label="Offer title"
                        placeholder="e.g Offers! Terrific tuesdays"
                        required
                        box
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm12 md12>
                      <v-textarea
                        box
                        :rules="nameRules"
                        v-model="myOffer.description"
                        label="Offer description"
                        placeholder="e.g A three-egg omelette made with sautéed mushroom, baby spinach & gouda cheese"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="myOffer.price"
                        :rules="nameRules"
                        label="Offer Price"
                        placeholder="e.g 2000"
                        type="number"
                        prefix="Kes"
                        required
                        outline
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <file-pond
                        name="file"
                        ref="pond"
                        label-idle="<sup>*</sup> Drag & Drop offer image here or <span class='filepond--label-action'> Browse </span>. Make sure you have an appealing photo!"
                        allow-multiple="false"
                        accepted-file-types="image/jpeg, image/png"
                        v-bind:files="myFiles"
                        @processfile="handleProcessSuccess"
                        v-on:init="handleFilePondInit"
                      />
                    </v-flex>
                    <v-flex xs12 sm12 md12>Choose the day(s) to run the offer</v-flex>

                    <v-checkbox v-model="checkbox.monday" label="Mon" required></v-checkbox>
                    <v-checkbox v-model="checkbox.tuesday" label="Tue" required></v-checkbox>
                    <v-checkbox v-model="checkbox.wednesday" label="Wed" required></v-checkbox>
                    <v-checkbox v-model="checkbox.thursday" label="Thur" required></v-checkbox>
                    <v-checkbox v-model="checkbox.friday" label="Fri" required></v-checkbox>
                    <v-checkbox v-model="checkbox.saturday" label="Sat" required></v-checkbox>
                    <v-checkbox v-model="checkbox.sunday" label="Sun" required></v-checkbox>
                  </v-layout>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn absolute dark fab top right color="pink">
                      <v-icon>add</v-icon>
                </v-btn>-->
                <v-btn color="red" class="white--text" @click="Offerdialog = false">Cancel</v-btn>
                <v-btn color="primary" flat @click="addOffer">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline orange lighten-2" primary-title>New Category</v-card-title>

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
                <!-- <v-btn absolute dark fab top right color="pink">
                      <v-icon>add</v-icon>
                </v-btn>-->
                <v-btn color="red" class="white--text" @click="dialog = false">Cancel</v-btn>
                <v-btn color="primary" flat @click="addCategories">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// Import Vue FilePond
import vueFilePond, { setOptions } from "vue-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { find } from "lodash";
import firebase from "../service/firebase";
import { VclTwitch } from "vue-content-loading";
import _ from "lodash";
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
    VclTwitch,
    FilePond
  },
  data() {
    return {
      menu: null,
      myOffer: {
        title: "",
        description: "",
        image_url:
          "http://res.cloudinary.com/micqual/image/upload/v1550605880/r9qzym7evq7e2qw2odqh.png",
        thumb_url:
          "http://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v1550605880/r9qzym7evq7e2qw2odqh.png",
        price: "",
        days: []
      },
      offers: null,
      categories: null,
      valid: true,
      offervalid: true,
      categoryName: "",
      Offerdialog: false,
      dialog: false,
      myFiles: [],
      cloudinary: {
        uploadPreset: "n6mgm8sq",
        apiKey: "Rx89lOR04EUUysYn2WF_LamWCgc",
        cloudName: "micqual"
      },
      checkbox: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      },
      Offeritems: ["foo", "bar", "fizz", "buzz"],
      Offervalue: ["foo", "bar", "fizz", "buzz"],
      nameRules: [
        v => !!v || "Name is required"
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      items: [
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Photos",
          subtitle: "Jan 9, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Recipes",
          subtitle: "Jan 17, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Work",
          subtitle: "Jan 28, 2014"
        }
      ],
      items2: [
        {
          icon: "call_to_action",
          iconClass: "amber white--text",
          title: "Breakfast",
          subtitle: "Hot Drinks"
        },
        {
          icon: "call_to_action",
          iconClass: "amber white--text",
          title: "Lunch",
          subtitle: "Rich cocktails"
        }
      ]
    };
  },
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },
  mounted() {
    // this.menu = find(this.$root.global_menus, (menu) => menu['.key'] === this.$route.params.menu_id)
    let menu = firebase.database.ref(
      "global_menus/" + this.$route.params.menu_id
    );
    let categories = firebase.database
      .ref("global_menus/" + this.$route.params.menu_id)
      .child("categories");

    let offers = firebase.database
      .ref("global_menus/" + this.$route.params.menu_id)
      .child("offers");
    // console.log(obj);
    let vm = this;
    menu.on("value", function(snapshot, prevChildKey) {
      var newMenu = snapshot.val();
      vm.menu = newMenu;
      // console.log(newPost);
    });
    categories.on("value", function(snapshot, prevChildKey) {
      // vm.menu = newPost
      var newCategory = snapshot.val();
      vm.categories = newCategory;
      console.log(newCategory);
    });

    offers.on("value", function(snapshot, prevChildKey) {
      // vm.menu = newPost
      var newOffer = snapshot.val();
      vm.offers = newOffer;
      console.log(newOffer);
    });
    //  categories.on("child_added", function(snapshot, prevChildKey) {
    //   // vm.menu = newPost
    //    var newCategory = snapshot.val();
    //   vm.categories = newCategory
    //   console.log(newCategory);

    // });
  },
  methods: {
    downloadQR(url) {
      window.open(
        url,
        "_blank" // <- This is what makes it open in a new window.
      );
    },
    handleProcessSuccess(error, file) {
      console.log("Processed logo");
      let cloudinaryResp = JSON.parse(file.serverId);
      console.log(cloudinaryResp);
      this.myOffer.image_url = cloudinaryResp.url;
      this.myOffer.thumb_url = `https://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v${
        cloudinaryResp.version
      }/${cloudinaryResp.public_id}.${cloudinaryResp.format}`;
    },
    resetOffers(){
      this.myOffer =  {
        title: "",
        description: "",
        image_url:
          "http://res.cloudinary.com/micqual/image/upload/v1550605880/r9qzym7evq7e2qw2odqh.png",
        thumb_url:
          "http://res.cloudinary.com/micqual/image/upload/w_200,h_200,c_crop,g_face,r_max/v1550605880/r9qzym7evq7e2qw2odqh.png",
        price: "",
        days: []
      }
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
    addOffer() {
      if (this.$refs.offerform.validate()) {
        let vm = this;
        let flag = 0
        _.forIn(this.checkbox, function(value, key) {
          console.log(key, value);
          if (value) {
            flag++
            // console.log(vm.myOffer);

            let obj = firebase.database
              .ref("global_menus/" + vm.$route.params.menu_id)
              .child("offers")
              .child(key);

            obj.update({
              name: key
            });

            obj.child("data").push(vm.myOffer);
            vm.Offerdialog = false
        vm.resetOffers()
            // this.myOffer.days.push(key)
          }
        });

        if(flag == 0){
          alert("Please select a Day(S) to run the Offer")
        }

        
      }
    },
    addCategories() {
      if (this.$refs.form.validate()) {
        let obj = firebase.database.ref(
          "global_menus/" + this.$route.params.menu_id
        );
        obj
          .child("categories")
          .child(this.categoryName)
          .set({
            name: this.categoryName
          });
        this.dialog = false;
        this.categoryName = "";
      }
    }
  }
};
</script>

<style>
.v-image__image--cover {
  background-size: cover;
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
