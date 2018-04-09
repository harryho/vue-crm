<template>
  <div class="home">
    <v-layout row>
      <v-flex xs12>
        <!--<v-card>
      <p class="red">Sorry, the page you're looking for doesn't exist.</p>
      </v-card>-->

        <v-card hover raised>
          <v-card-media height="300px" class="pa-5 red lighten-1">
            <div class="display-1 white--text text-xs-center">{{msg}}</div>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data () {
    return {
      msg: 'Sorry, the page you\'re looking for doesn\'t exist.'
    }
  }
}
</script>
