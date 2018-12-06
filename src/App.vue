<template>
  <v-app>
    <vue-progress-bar>
    </vue-progress-bar>
    <template v-if="!loggedIn">
      <router-view></router-view>
    </template>
    <template v-if="loggedIn">
      <v-navigation-drawer class="blue lighten-5" width="250"  light :mini-variant.sync="mini" v-model="drawer" app>
        <!-- mini-variant.sync="true" -->
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="/assets/img/avatar0.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.firstName}}{{user.lastName}}</v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-list-tile-action style="min-width:30px;">
              <v-menu bottom right offset-y origin="bottom right" transition="v-slide-y-transition">
                <v-btn icon light slot="activator">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="item in userMenus" :key="item.title" value="true" :to="item.link" router>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

            </v-list-tile-action>
            <v-list-tile-action style="min-width:30px;">
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" @click="clickMenu(item)" router>
            <v-list-tile-action class="pr-1 pl-2 mr-1">
              <v-icon :class="activeMenuItem.includes(item.title)?'blue--text': ''" :title="item.title" light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content :class="activeMenuItem.includes(item.title)?'blue--text': ''">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app>
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
        <v-btn light flat  href="https://github.com/harryho/vue2crm" target="_blank">
                <svg height="30" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
            <span style="margin-left:0.4rem;">GitHub</span>
          </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid >
          <!-- <v-layout>
            <v-flex row=""> -->
              <router-view></router-view>
            <!-- </v-flex>
          </v-layout> -->
        </v-container>
      </v-content>
      <!-- <canvas id="canvas"></canvas> -->
      <v-footer :inset="true" style="justify-content:center; text-align: center" app>
        <span>&copy; Vue-CRM 2018</span>
      </v-footer>
    </template>
  </v-app>

</template>
<script>
  import auth from "./utils/auth";
  import { mapState } from "vuex";
  export default {
    data () {
      return {
        dialog: false,
        mini: false,
        dialogText: "",
        dialogTitle: "",
        loggedIn: auth.loggedIn(),
        isRootComponent: true,
        // clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: "dashboard",
            title: "Dashboard",
            vertical: "Dashboard",
            link: "dashboard"
          },
          {
            icon: "shopping_cart",
            title: "Orders",
            vertical: "Order",
            link: "orders"
          },
          {
            icon: "perm_identity",
            title: "Customers",
            vertical: "Customer",
            link: "customers"
          },
          {
            icon: "bubble_chart",
            title: "Products",
            vertical: "Product",
            link: "products"
          },
          {
            icon: "thumbs_up_down",
            title: "About",
            vertical: "About",
            link: "about"
          }
        ],
        userMenus: [
          {
            icon: "bubble_chart",
            title: "Logout",
            link: "/logout"
          },
          {
            icon: "bubble_chart",
            title: "Change Password",
            link: "/changepassword"
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        menuItem: "Orders"
      };
    },
    created () {
      auth.onChange = loggedIn => {
        console.log("loggedIn", loggedIn);
        this.loggedIn = loggedIn;
      };
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start();
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress;
          // parse meta tags
          this.$Progress.parseMeta(meta);
// import auth from "./utils/auth";
// import { mapState } from "vuex";
// export default {
//   data () {
//     return {
//       dialog: false,
//       mini: false,
//       dialogText: "",
//       dialogTitle: "",
//       loggedIn: auth.loggedIn(),
//       // isRootComponent: true,
//       // clipped: false,
//       drawer: false,
//       fixed: false,
//       items: [
//         {
//           icon: "dashboard",
//           title: "Dashboard",
//           vertical: "Dashboard",
//           link: "dashboard"
//         },
//         {
//           icon: "shopping_cart",
//           title: "Orders",
//           vertical: "Order",
//           link: "orders"
//         },
//         {
//           icon: "perm_identity",
//           title: "Customers",
//           vertical: "Customer",
//           link: "customers"
//         },
//         {
//           icon: "bubble_chart",
//           title: "Products",
//           vertical: "Product",
//           link: "products"
//         },
//         {
//           icon: "thumbs_up_down",
//           title: "About",
//           vertical: "About",
//           link: "about"
        }
        //  start the progress bar
        this.$Progress.start();
        //  continue to next page
        next();
      });
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        if (to.name !== "ErrorPage") {
          this.menuItem = to.name;
        }
        //  finish the progress bar
        this.$Progress.finish();
      });
    },
    computed: {
      ...mapState("user", {
        user: "user"
      }),
      auth () {
        return auth;
      },
      activeMenuItem() {
        return this.menuItem;
      }
    },
    methods: {
      clickMenu(item) {
        this.menuItem = item.title;
        this.$router.push({
          name: item.title
        });
      },
    },
    mounted () {
      this.$Progress.finish();
    }
  };
</script>
<style lang="stylus">
  @import './stylus/main';
</style>
