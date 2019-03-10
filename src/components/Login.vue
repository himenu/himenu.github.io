<template>
 <v-app style="position: relative; height: 100vh; oveflow: scroll;  background: url(https://res.cloudinary.com/micqual/image/upload/e_brightness:100,o_11/v1550928960/pattern.jpg)">
     <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <router-view></router-view>
     
    </v-flex>
  </v-layout>
 </v-app>
</template>

<script>
export default {

}
</script>

<style scoped>
p {
    margin-bottom: 0px;
    font-size: 120%;
    font-weight: bold;
}
</style>
