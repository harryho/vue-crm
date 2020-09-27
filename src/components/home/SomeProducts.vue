<template>
    <div class="cls-listProducts">
        <v-list-item v-for="(item, i) in dataProducts" :key="i">
            <v-list-item-content  v-text="item.text">
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script lang="ts" >
    export default {
        name: "SomeProducts",
        props: { propProducts: Array },
        
         data: () => ({
            item: 1,
            dataProducts: []
        }),

        mounted() {
            this.getProducts();
        },

        methods: {
            getProducts() {
                this.dataProducts = this.propProducts; 
            }
        }
    }
</script>

<style scoped>
.cls-listProducts {
    position: relative;
}

.myList {
    text-align: center;
}
</style>