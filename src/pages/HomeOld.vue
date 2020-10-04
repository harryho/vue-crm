<template>
   <div class="container">
       <!-- Barra superior -->
       <NavigationBar
        :propMenu='this.getNavMenu()'
        :propText='this.getNavText()'
       ></NavigationBar>
       <!-- Titulo -->
       <Title
        :propTitulo='this.getTitle()'
        :propSubTitulo='this.getSubTitle()'
       ></Title>

        <!-- Alguns produtos -->
        <SomeProducts
        :propProducts="this.getProducts()"
        ></SomeProducts>
   </div>
</template>

<script lang="ts">
    import Title from "@/components/home/Title.vue";
    import NavigationBar from "@/components/home/NavigationBar.vue";
    import SomeProducts from "@/components/home/SomeProducts.vue";
    import { Component } from "vue-property-decorator";
    import Vue from "vue";

    @Component({
        name: "Home",
        components: {
            Title,
            NavigationBar,
            SomeProducts
        }
    })

    export default class Home extends Vue {
        
        titulo = 'Gerar valor sobre seus dados';
        subTitulo = 'Produtos desenvolvidos com base em algoritmos de  aprendizado de maquina, altamente adaptaveis para atender o seu negocio';
        navMenu = [
            {'item': "Perfil"},
            {'item': "Contato"},
            {'item': "Sobre"}
        ];
        navText = 'Analista de CRM';
        Products = [
            { text: "Produtos e serviços de machine learning inovadores em uma plataforma confiável." },
            { text: "A AI Platform, nosso ambiente de desenvolvimento de ciência de dados baseado em código, permite que desenvolvedores de ML e cientistas de dados assumam projetos." },
            { text: "Os elementos essenciais de IA facilitam a inclusão de visão, linguagem, conversa e dados estruturados nos seus aplicativos." },
            { text: "O AI Hub, nosso repositório hospedado de componentes de IA prontos para usar, estimula a experimentação e a colaboração dentro da sua organização." }
        ]

        getTitle() {
            return this.titulo
        }
        
        getSubTitle() {
            return this.subTitulo
        }

        getNavMenu() {
            return this.navMenu
        }

        getNavText() {
            return this.navText
        }

        getProducts() {
            return this.Products
        }
    }
</script>

<style scoped>
.container {
    padding: 0px;
    margin: 0px;
    max-width: 100%;
    max-height: 100%;
}
</style>