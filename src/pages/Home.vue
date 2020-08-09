<template>
   <div id="home">
       <Title
        pTitle='Soluções em Machine Learning'
       ></title>
   </div>
</template>

<script lang="ts">
    import Title from "@/components/home/Title.vue";
    import { Component, Prop } from "vue-property-decorator";
    import Vue from "vue";

    @Component({
        name: "Home",
        components: {
            Title
        }
    })

    export default class Home extends Vue {
        methods: {}
    }
</script>
