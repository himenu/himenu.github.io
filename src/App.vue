<template>

 
 <div>
      <router-view></router-view>

 </div>
</template>

<script>

 import firebase from 'firebase';
export default {
 beforeCreate () {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        
        // initially user = null, after auth it will be either <fb_user> or false
        this.$store.commit('SAVE_USER', user || false);
        if (user && this.$route.path === '/login') {
          this.$router.replace('/');
        } else if (!user && this.$route.path !== '/login') {
          this.$router.replace('/login');
        }
      });
    },
    
};
</script>

<style>
body {
  margin: 0;
  background: #f2f2f2;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
