<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ dataText }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in dataMenu"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>{{ n.item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
    export default {
        name: "NavigationBar",
        props: { propMenu: Array, propText: String },
        
        data() {
            return {
                dataMenu: Array,
                dataText: String
            };
        },

        mounted() {
            this.dataTitulo = this.propTitulo;
            this.dataSubTitulo = this.propSubTitulo;
            this.dataText = this.propText;
            this.dataMenu = this.propMenu;
        }
    }
</script>