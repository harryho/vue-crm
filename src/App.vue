<template>
  <div>           
    <template v-if="!loggedIn">
      <router-view></router-view>
    </template>
    <template v-if="loggedIn">    
      <vue-progress-bar></vue-progress-bar>  
      <v-app>
  
        <v-navigation-drawer persistent v-model="drawer" mini-variant.sync="true">
          <v-list class="pa-0">
            
            <v-list-item>
              <v-list-tile avatar tag="div">
                <v-list-tile-avatar>
                  <img src="/static/img/avatar0.png"></img>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{user.firstName}} {{user.lastName}}</v-list-tile-title>
                </v-list-tile-content>
                <v-menu bottom left offset-y origin="bottom right" transition="v-slide-y-transition">
                  <v-btn icon light slot="activator">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-item v-for="item in userMenus" :key="item">
                      <v-list-tile value="true" :to="item.link" router>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-tile>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-tile @click.native="clickMenu(item)" router>
                <v-list-tile-action>
                  <v-icon v-if="activeMenuItem===item.title" light v-html="item.icon" class="blue--text"></v-icon>
                  <v-icon v-if="activeMenuItem!==item.title" dark v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar>
          <v-toolbar-side-icon @click.native.stop="drawer = !drawer" light></v-toolbar-side-icon>
          <v-spacer></v-spacer>
  
        </v-toolbar>
        <main>
          <v-container fluid>
            <v-slide-y-transition mode="out-in">
              <v-layout column align-center>
                <router-view></router-view>
  
              </v-layout>
            </v-slide-y-transition>
          </v-container>
        </main>
        <v-footer :fixed="fixed">
          <span>&copy; Reetek 2017 Vue-2-Crm </span>
        </v-footer>
      </v-app>
        <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-row>
          <v-card-title>{{dialogTitle}}</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>{{dialogText}}</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="onConfirm">Confirm</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="onCancel">Cancel</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </v-layout> 
    </template>
  </div>
</template>
<script>
  import auth from './utils/auth'
  // import VueCharts from 'vue-chartjs'
  export default {
    data () {
      return {
        dialog: false,
        dialogText: '',
        dialogTitle: '',
        loggedIn: auth.loggedIn(),
        // clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Dashboard', link: 'dashboard' },
          { icon: 'bubble_chart', title: 'Orders', link: 'orders' },
          { icon: 'bubble_chart', title: 'Customers', link: 'customers' },
          { icon: 'bubble_chart', title: 'About', link: 'about' }
        ],
        userMenus: [
          { icon: 'bubble_chart', title: 'Logout', link: '/logout' },
          { icon: 'bubble_chart', title: 'Change Password', link: '/changepassword' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        menuItem: 'Orders'
      }
    },
    created () {
      auth.onChange = loggedIn => {
        console.log(loggedIn)
        this.loggedIn = loggedIn
      }
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          // parse meta tags
          this.$Progress.parseMeta(meta)
        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
        // console.log('to ...', to)
        if (to.name !== 'ErrorPage') {
          if (!this.activeMenuItem) this.activeMenuItem = to.name
        }
      })
    },
    computed: {
      store: function () {
        return this.$parent.$store
      },
      state: function () {
        return this.store.state
      },
      user: function () {
        return this.state.user
      },
      auth: function () {
        return auth
      },
      activeMenuItem: function () {
        return this.menuItem
      }
    },
    methods: {
      clickMenu: function (item) {
        this.menuItem = item.title
        this.$router.push({name: item.title})
      },
      openDialog: function (dialogText, dialogTitle, confirmCallback, canelCallbak) {
        this.dialog = true
        this.dialogText = dialogText
        this.dialogTitle = dialogTitle
        if (confirmCallback) this.confirmCallback = confirmCallback
        if (canelCallbak) this.cancelCallback = canelCallbak
      },
      confirmCallback: function () {
      },
      cancelCallback: function () {
      },
      onConfirm: function () {
        this.dialog = false
        this.dialogText = ''
        this.dialogTitle = ''
        console.log('confirm button click')
        this.confirmCallback()
        this.confirmCallback = () => {}
      },
      onCancel: function () {
        this.dialog = false
        this.dialogText = ''
        this.dialogTitle = ''
        console.log('cancel button click')
        this.cancelCallback()
        this.cancelCallback = () => {}
      }
    },
    mounted () {
      this.$Progress.finish()
    }
  }
</script>
<style lang="stylus">
  // $color-pack = false
  @import './stylus/main'
</style>
