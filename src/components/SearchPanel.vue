<template>

<v-navigation-drawer right v-model="rightDrawer" :disable-resize-watcher="true" fixed>
  <v-list>
    <!-- <v-list-tile-title>&nbsp;</v-list-tile-title> -->
    <v-list-tile class="my-2">
      <v-list-tile-title class="title">Advanced Search</v-list-tile-title>
    </v-list-tile>
    <!-- <v-list-tile-title>&nbsp;</v-list-tile-title> -->
    <slot></slot>

    <v-layout class="pl-1 pt-3 ml-1" row>
        <v-btn class="purple" fab small @click.native="$emit('searchData')">
            <v-icon dark="">search</v-icon>
          </v-btn>
      <!-- <v-btn class="grey" fab small @click.native="rightDrawer = !rightDrawer"> searchData-->
          <v-btn class="grey" fab small @click.native="$emit('cancelSearch')">
        <v-icon dark="">clear</v-icon>
      </v-btn>
    </v-layout>

  </v-list>
</v-navigation-drawer>
</template>

<script>
  import { mapState } from 'vuex'
  import Vue from 'vue'


  export default {
    name: 'search-panel',
    props: {
      rightDrawer: ''
    },
    data () {
      return {
        right: true,
        searchVm: {
          contains: {
            productName: '',
            category: '',
          },
          between: {
            price: {
              former: 0,
              latter: 0
            }
          }
        }
      }
    },
    methods: {
      cancelSearch () {},
      searchData () {},
    },

    created () {


    },
    mounted () {
      this.$nextTick(() => {
      })
    }
  }
</script>
