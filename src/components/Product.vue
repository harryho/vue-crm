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
          <v-btn fab small class="purple" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap class="px-10">
              <v-flex md4 xs12>
                <v-text-field name="productName" label="Product" hint="Product name is required" value="Input text" v-model="product.productName"
                  class="input-group--focused" required></v-text-field>
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
                <v-select required v-bind:items="categoryList" label="Category" v-model="product.categoryId"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
  export default {
    data: function () {
      return {
        errors: [],
        title: '',
        product: {
          categoryId: 0,
          category: { categoryName: '' }
        },
        categorys: [],
        categoryList: []
      }
    },
    computed: {
      newProduct: function () {
        return 'New Product'
      }
    },
    methods: {
      save: function () {
        let product = this.product
        delete this.product.category

        if (!product.id) {
          this.api.postData('products', product).then((res) => {
            this.$router.push({ name: 'Products' })
          }, (err) => {
            console.log(err)
          })
        } else {
          this.api.putData('products/' + product.id.toString(), product).then((res) => {
            this.$router.push({ name: 'Products' })
          }, (err) => {
            console.log(err)
          })
        }
      },
      selectCategory(item) {
        this.product.categoryId = item.value
      },
      getById: function () {
        this.api.getData('products/' + this.$route.params.id + '?_expand=category').then((res) => {
          this.product = res.data
          // this.product.category.categoryName = this.product.category.firstName + ' ' + this.product.category.lastName
        }, (err) => {
          console.log(err)
        })
      },
      getCategorys: function () {
        this.api.getData('categories').then((res) => {
          this.categorys = res.data
          this.categoryList = []
          this.categorys.forEach((c) => {
            let category = c
            category.text = c.categoryName
            category.value = c.id
            this.categoryList.push(category)
          })
        }, (err) => {
          console.log(err)
        })
      },
      cancel: function () {
        this.$router.push({ name: 'Products' })
      }
    },
    mounted: function () {
      this.getCategorys()
      if (this.$route.params.id) {
        this.getById()
        this.title = 'Edit Product'
      } else this.title = 'New Product'
    }
  }
</script>
