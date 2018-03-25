<template>
  <v-app>
    <vue-progress-bar>
    </vue-progress-bar>
    <template v-if="!loggedIn">
      <router-view></router-view>
    </template>
    <template v-if="loggedIn">
      <v-navigation-drawer class="blue lighten-5" light fixed :mini-variant.sync="mini" v-model="drawer" app>
        <!-- mini-variant.sync="true" -->
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="/assets/img/avatar0.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.firstName}} {{user.lastName}}</v-list-tile-title>
            </v-list-tile-content>
            <v-menu bottom left offset-y origin="bottom right" transition="v-slide-y-transition">
              <v-btn icon light slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="item in userMenus" :key="item.title" value="true" :to="item.link" router>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" @click="clickMenu(item)" router>
            <v-list-tile-action class="pr-1 pl-2 mr-1">
              <v-icon :class="activeMenuItem.includes(item.title)?'blue--text':''" :title="item.title"  light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content :class="activeMenuItem.includes(item.title)?'blue--text':''">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app="">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer" light></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <div class="text-xs-center pr-3">
        <v-badge left="">
            <span slot="badge">6</span>
            <v-icon large color="grey lighten-1">shopping_cart</v-icon>
          </v-badge>

          <v-badge color="red">
            <span slot="badge">!</span>
            <v-icon large color="grey">mail</v-icon>
          </v-badge>
        </div>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex row="">
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <canvas id="canvas"></canvas>
      <v-footer :inset="true" app>
        <span style="justify-content:center">&copy; Vue-CRM 2018</span>
      </v-footer>
        </template>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title>{{dialogTitle}}</v-card-title>
        <v-card-text>{{dialogText}}</v-card-text>
        <v-card-actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="onConfirm">Confirm</v-btn>
          <v-btn class="orange--text darken-1" flat="flat" @click.native="onCancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>

</template>
<script>
  import auth from './utils/auth'
  import { mapState } from 'vuex'
  // import Products from './pages/Products.vue'
  export default {
    data() {
      return {
        dialog: false,
        mini: false,
        dialogText: '',
        dialogTitle: '',
        loggedIn: auth.loggedIn(),
        isRootComponent: true,
        // clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'dashboard',
          title: 'Dashboard',
          vertical: 'Dashboard',
          link: 'dashboard'
        },
        {
          icon: 'shopping_cart',
          title: 'Orders',
          vertical: 'Order',
          link: 'orders'
        },
        {
          icon: 'perm_identity',
          title: 'Customers',
          vertical: 'Customer',
          link: 'customers'
        },
        {
          icon: 'bubble_chart',
          title: 'Products',
          vertical: 'Product',
          link: 'products'
        },
        {
          icon: 'thumbs_up_down',
          title: 'About',
          vertical: 'About',
          link: 'about'
        }],
        userMenus: [{
          icon: 'bubble_chart',
          title: 'Logout',
          link: '/logout'
        },
        {
          icon: 'bubble_chart',
          title: 'Change Password',
          link: '/changepassword'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        menuItem: 'Orders'
      }
    },
    created() {
      auth.onChange = loggedIn => {
        console.log('loggedIn', loggedIn)
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
        if (to.name !== 'ErrorPage') {
          this.menuItem = to.name
        }
        //  finish the progress bar
        this.$Progress.finish()
      })
    },
    computed: {
      ...mapState('user',
      {
        user: 'user'
      }),
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
        this.$router.push({
          name: item.title
        })
      },
      openDialog: function (dialogText, dialogTitle, confirmCallback, canelCallbak) {
        this.dialog = true
        this.dialogText = dialogText
        this.dialogTitle = dialogTitle
        if (confirmCallback) this.confirmCallback = confirmCallback
        if (canelCallbak) this.cancelCallback = canelCallbak
      },
      confirmCallback: function () {},
      cancelCallback: function () {},
      onConfirm: function () {
        this.dialog = false
        this.dialogText = ''
        this.dialogTitle = ''
        this.confirmCallback()
        this.confirmCallback = () => {}
      },
      onCancel: function () {
        this.dialog = false
        this.dialogText = ''
        this.dialogTitle = ''
        this.cancelCallback()
        this.cancelCallback = () => {}
        console.log('Cancelled')
      }
    },
    mounted() {
      this.$Progress.finish()
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
</style>
