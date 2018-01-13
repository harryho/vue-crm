<template>
<v-container fluid >
  <v-layout row wrap>
    <v-flex xs4 offset-xs4 justify-space-between>
      <h1> &nbsp;</h1>  
      <v-card>
          <v-card-title  class="blue darken-1">
            <h4 style="color:white">Reetek Vue 2 CRM</h4>
          </v-card-title>
          <v-card-text>
              <form @submit.prevent="login">
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>User ID</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field name="email" v-model="email" label="email" value="Input text" class="input-group--focused"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Password</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field name="password" v-model="pass" label="password" value="Input text" type="password" class="input-group--focused"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn type="submit">login</v-btn>
                <v-snackbar v-if="error" :timeout="timeout" :top="true" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="error">
                  {{ text }}
                  <v-btn flat class="pink--text" @click.native="error = false">Close</v-btn>
                </v-snackbar>
              </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import auth from '../utils/auth'

export default {
  data () {
    return {
      email: 'hho@test.com',
      pass: 'password',
      error: false,
      text: ''
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.pass, (loggedIn, err) => {
        if (err) {
          console.log('login', err)
          this.error = true
          this.text = err
        } else if (loggedIn === false) {
          console.log('login', loggedIn)
          this.error = true
          this.text = 'Bad login information'
        } else {
          console.log(this.$route)
          this.$router.push(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>
<style lang="stylus">
  @import '../stylus/main'
</style>
