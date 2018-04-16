<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <!--<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>-->
          <v-btn fab small class="grey" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="save()" :disabled="!isValid">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap class="px-10">
              <v-flex md4 xs12>
                <v-text-field name="productName" label="Product" hint="Product name is required" value="Input text" v-model="product.productName"
                  class="input-group--focused" required :rules="rules.name"></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="unitPrice" prefix="AUD $" label="Price" hint="Price is required" value="Input text" v-model="product.unitPrice"
                  class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="unitInStock" label="Quantity" hint="Number between 1 to 100" v-model="product.unitInStock" class="input-group--focused"
                  required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required v-bind:items="categories" label="Category" v-model="product.categoryId" :rules="rules.category"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-snackbar v-if="loading===false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar" >
      {{ notice }}
      <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import {Product} from '../models'
import { mapState, dispatch } from 'vuex'
/* global Store */
export default {
  data () {
    return {
      errors: [],
      title: '',
      snackbarStatus: false,
      timeout: 3000,
      color: '',
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required'],
        category: [val => typeof val === "number" || 'This field is required']
      }

    }
  },
  methods: {
    save () {
      const product = Object.assign({}, this.product)
      delete product.category

      Store.dispatch('products/saveProduct', product)
        .then(() => {
          Store.dispatch("products/closeSnackBar", 2000)
        })
    },
    selectCategory (item) {
      this.product.categoryId = item.value
    },
    getProduct () {
      Store.dispatch('products/getProductById', this.$route.params.id)
    },
    getCategories () {
      Store.dispatch('products/getCategories')
    },
    cancel () {
      this.$router.push({ name: 'Products' })
    }
  },
  computed: {
        ...mapState('products',
        {
          product: 'product',
          categories: 'categories',
          loading: 'loading',
          mode: 'mode',
          snackbar: 'snackbar',
          notice: 'notice'
        }),
        isValid () {
          return (
            this.product.categoryId  && this.product.productName
          )
        }
    },
  created () {
    this.getCategories()
    this.getProduct()
  },
  mounted () {
      if (this.$route.params.id) {
        this.title = 'Edit Product'
      } else this.title = 'New Product'
  }
}
</script>
