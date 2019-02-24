import gsauto from '../api/api'

export default {
   saveUser({commit},user){
        //  this.$wait.start('loading Staff');
        return new Promise(resolve => {
               commit('SAVE_USER',user)
               resolve();
          });
    },
   
    
    //Fetch Workings
    //Update Workings
    //Delete working
}
