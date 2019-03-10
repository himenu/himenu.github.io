<template>
  <div :id="id" class="swiper-container">
    <div class="swiper-wrapper">
      <v-list-tile class="swiper-slide error" style="background: red">
<v-list-tile-action>
              <v-icon color="info">info</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title style="color: #fff"> Delete {{data.name}}? </v-list-tile-title>
            </v-list-tile-content>
              <v-list-tile-avatar>
              <v-icon color="white">delete</v-icon>
            </v-list-tile-avatar>

      </v-list-tile>
      <v-list-tile class="swiper-slide"  @click="$router.push(data.name)">
        <!-- custom content here -->
        <!-- {{data.name}} -->
         <v-list-tile-avatar>
              <v-icon class="amber white--text">call_to_action</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ data.name }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">chevron_right</v-icon>
              </v-btn>
            </v-list-tile-action>
      </v-list-tile>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { Swiper } from 'swiper/dist/js/swiper.esm.js'

export default {
  props: ['id','data'],
  mounted () {
    const self = this
    const el = '#' + this.id

    // Initialize Swiper
    const swiper = new Swiper(el, {
      initialSlide: 1,
      resistanceRatio: 1,
      speed: 150
    })

    // Event will be fired after transition
    swiper.on('transitionEnd', function () {
      if (this.activeIndex === 0) {
        self.$emit('transitionEnd')
        // Destroy slider instance and detach all events listeners
        this.destroy()
      }
    })
  }
}
</script>