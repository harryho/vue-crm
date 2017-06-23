<template>
  <div>
    <template v-if="!loggedIn">
      <router-view></router-view>
    </template>
    <template v-if="loggedIn">
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
                  <v-icon v-if="title===item.title" light v-html="item.icon" class="blue--text"></v-icon>
                  <v-icon v-if="title!==item.title" dark v-html="item.icon"></v-icon>
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
    </template>
  </div>
</template>
<script>
  import auth from './utils/auth'
  export default {
    data () {
      return {
        loggedIn: auth.loggedIn(),
        // clipped: false,
        drawer: true,
        fixed: false,
        items: [
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
        title: 'Vue 2 CRM'
      }
    },
    created () {
      auth.onChange = loggedIn => {
        console.log(loggedIn)
        this.loggedIn = loggedIn
      }
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
      }
    },
    methods: {
      clickMenu: function (item) {
        this.title = item.title
        this.$router.push({name: item.title})
      }
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'

</style>
