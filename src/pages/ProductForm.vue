<template>
  <v-container fluid>
    <v-flex xs12 v-if="!loading">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
          {{ title }}
          <v-spacer></v-spacer>
          <v-btn   elevation="4" fab small dark class="grey mr-2" @click.native="cancel()">
            <v-icon dark="">mdi-close-circle-outline</v-icon>
          </v-btn>
          &nbsp;
          <v-btn   elevation="4" fab small dark class="purple" @click.native="save()" :disabled="!isValid">
            <v-icon>mdi-content-save-all</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap class="px-10">
              <v-flex md4 xs12>
                <v-text-field
                  name="productName"
                  label="Product"
                  hint="Product name is required"
                  value="Input text"
                  v-model="product.productName"
                  class="input-group--focused"
                  required
                  :rules="rules.name"
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                  name="unitPrice"
                  prefix="AUD $"
                  label="Price"
                  hint="Price is required"
                  value="Input text"
                  v-model="product.unitPrice"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                  name="unitInStock"
                  label="Quantity"
                  hint="number between 1 to 100"
                  v-model="product.unitInStock"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-select
                  required
                  v-bind:items="categories"
                  label="Category"
                  v-model="product.categoryId"
                  :rules="rules.category"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-snackbar v-if="loading === false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar">
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { productModule } from '@/store/modules/products';
import { appModule } from '@/store/modules/app';

@Component
export default class ProductForm extends Vue {
  errors = [];
  title = '';
  color = '';
  rules = {
    name: [val => (val || '').length > 0 || 'This field is required'],
    category: [val => typeof val === 'number' || 'This field is required']
  };

  save() {
    const product = Object.assign({}, this.product);
    delete product.category;
    productModule.saveProduct(this.product);
  }

  selectCategory(item) {
    this.product.categoryId = item.value;
  }

  getProduct() {
    productModule.getProductById(this.$route.params.id);
  }

  cancel() {
    this.$router.push({ name: 'products' });
  }

  get product() {
    return productModule.product;
  }

  get loading() {
    return productModule.loading;
  }

  get mode() {
    return appModule.mode;
  }

  get snackbar() {
    return appModule.snackbar;
  }

  get notice() {
    return appModule.notice;
  }
  
  get categories() {
    return productModule.categories;
  }

  isValid() {
    return this.product && this.product.categoryId && this.product.productName;
  }

  created() {
    productModule.getCategories();
    this.getProduct();
  }
  
  mounted() {
    if (this.$route.params.id) {
      this.title = 'Edit Product';
    } else this.title = 'New Product';
  }
}
</script>
