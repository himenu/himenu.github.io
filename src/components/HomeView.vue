<template>
    <div>
       <v-app class="hide-overflow" style="position: relative;">
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      absolute
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      dark
      color="primary"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>hiMenu</v-toolbar-title>
      <v-autocomplete
        slot="extension"
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-3"
        flat
        hide-no-data
        hide-details
        label="Search a nearby hotel?"
        solo-inverted
      ></v-autocomplete>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card id="scrolling-techniques" class="scroll-y" style="height: 100vh; padding-top: 120px">
      <v-container style="padding: 0px;" fluid grid-list-lg>
         <router-view></router-view>
        <!-- <v-layout>
          <v-flex xs12 sm6>
            <v-card>
              <v-container v-bind="{ [`grid-list-24`]: true }" style=" height: 90vh" fluid>
                <v-layout row wrap>
                  <v-flex v-for="n in 9" :key="n" xs4>
                    <v-hover>
                      <v-card
                        flat
                        tile
                        style="text-align: center"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 12 : 0}`"
                      >
                        <v-img
                          :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
                          height="150px"
                        ></v-img>Drinks
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout> -->
      </v-container>
    </v-card>
    <!-- <v-toolbar
    color="primary"
    dark
    extended
  >

    <v-toolbar-title slot="extension" class="white--text">hiMenu</v-toolbar-title>

    <v-spacer></v-spacer>
  <v-text-field
        hide-details
        prepend-icon="search"
        single-line
      ></v-text-field>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
    </v-toolbar>-->
  </v-app>
    </div>
</template>

<script>
export default {
 data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      mini: false,
      right: null,
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      alignmentsAvailable: [
        "align-center",
        "align-end",
        "align-space-around",
        "align-space-between",
        "align-start",
        ""
      ],
      alignment: "align-center",
      alignmentsContentAvailable: [
        "align-content-center",
        "align-content-end",
        "align-content-space-around",
        "align-content-space-between",
        "align-content-start",
        ""
      ],
      justifyAvailable: [
        "justify-center",
        "justify-end",
        "justify-space-around",
        "justify-space-between",
        "justify-start",
        ""
      ],
      justify: "justify-center",
      reverse: false,
      flexDirectionAvailable: ["row", "column", ""],
      flexDirection: "row",
      fillHeight: true
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  computed: {
    layoutAttributes() {
      return {
        [this.alignment]: true,
        [this.justify]: true,
        [this.flexDirection]: true,
        reverse: this.reverse,
        "fill-height": this.fillHeight
      };
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #ffbe55;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

* {
  font-family: cursive;
}
.item {
  /* min-height: 50px; */
  min-width: 80px;
  margin: 1px;
}
</style>
