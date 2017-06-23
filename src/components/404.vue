<template>
  <div class="home">
    <v-layout row>
      <v-flex xs6 offset-xs3>
    <v-card>
    <p class="red">Sorry, the page you're looking for doesn't exist.</p>
    </v-card>

     <v-card hover raised>
    <v-card-row height="300px" class="pa-5 grey lighten-1">
      <div class="display-1 white--text text-xs-center">{{msg}}</div>
    </v-card-row>
  </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: '404',
  data () {
    return {
      msg: 'Sorry, the page you\'re looking for doesn\'t exist.'
    }
  }
}
</script>
