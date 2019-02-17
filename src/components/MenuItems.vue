<template>
     <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card :raised="false" style="box-shadow: none; border-radius: 20px; padding: 40px">

        <v-layout row wrap>
        
          <v-flex xs12>
            <v-card style="box-shadow: none">
              <v-layout>
                <v-flex xs3>
                  <v-img
                    src="https://images.unsplash.com/photo-1539840093138-9b3e230e5206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs9>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">PANCAKE</div>
                      <div>Our world famous buttermilk pancake stacks served with fresh whipped cream, dusted with icing sugar, a scoop of ice cream or fresh fruit salad</div>
                      <div class="headline"><b>Kshs. 700</b></div>

                    </div>
                  </v-card-title>
                </v-flex>
                
              </v-layout>
            </v-card>
          </v-flex>
          
          <v-flex xs12>
            <v-card style="box-shadow: none">
              <v-layout>
                <v-flex xs3>
                  <v-img
                    src="https://images.unsplash.com/photo-1539840093138-9b3e230e5206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs9>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">PANCAKE</div>
                      <div>Our world famous buttermilk pancake stacks served with fresh whipped cream, dusted with icing sugar, a scoop of ice cream or fresh fruit salad</div>
                      <div class="headline"><b>Kshs. 700</b></div>

                    </div>
                  </v-card-title>
                </v-flex>
                
              </v-layout>
            </v-card>
          </v-flex>

        
        </v-layout>
   
         <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
              style="margin-top: 20px"
            >
              <v-icon>add</v-icon>
            </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script> 
export default {
    data () {
      return {
        items: [
          { header: 'Today' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'THE CLUB OMELETTE',
            subtitle: "A three-egg omelette made with sautéed mushroom, baby spinach & gouda cheese"
          },
         
        ]
      }
    }
  }
</script>

<style>

</style>
