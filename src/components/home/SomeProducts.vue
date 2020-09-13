<template>
    <div class="cls-listProducts">
        <ul id="example-1">
            <li :for="item in this.dataProducts">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" >
    export default {
        name: "SomeProducts",
        props: { propProducts: Array },
        
        data() {
            return {
                dataProducts: Array
            }
        },

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
</style>