<template>
  <div class="flex-container">
    <div class="presentation">
      <h1>{{ this.dTitle }}</h1>
      <div class="texts">
        <div v-for="div in this.contentPresentation" :key="div">
          <p>{{ div.item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "title",
  props: {
    pTitle: String
  },

  data() {
    return {
      dTitle: String,
      contentPresentation: [
        { item: "O TEXTO 01, nosso repositório hospedado de componentes de IA prontos para usar, estimula a experimentação e a colaboração dentro da sua organização." },
        { item: "O TEXTO 02, nosso repositório hospedado de componentes de IA prontos para usar, estimula a experimentação e a colaboração dentro da sua organização." },
        { item: "O TEXTO 03, nosso repositório hospedado de componentes de IA prontos para usar, estimula a experimentação e a colaboração dentro da sua organização." }
      ]
    };
  },

  mounted() {
    this.dTitle = this.pTitle;
  }
}
</script>

<style scoped>
.flex-container {
  display: flex; /* torna o container flex */
  flex-direction: column; /* direcao dos itens dentro do container */
  flex-wrap: wrap; /* manter os itens dentro do container */
  justify-content: space-around; /* ajusta os espacos dentro do container */

  /* cross axis */
  align-items: center; /* alinhar os itens pelo final item */
  flex-grow: 0; /* ajusta os itens no espaco total da div mae */
  text-align: center;
}

.flex-container .presentation {

}

.flex-container .presentation .texts {
  display: flex;
  flex-direction: row;
}

.flex-container .presentation .texts div {

}


/* Smaller than standard 960 (devices and browsers) */
@media only screen and (max-width: 959px) {
    p{
      font-size: 10px;
    }

    h1{
      font-size: 2em;
    }
}

/* Tablet Portrait size to standard 960 (devices and browsers) */
@media only screen and (min-width: 768px) and (max-width: 959px) {
    p{
      font-size: 12px;
    }

    h1{
      font-size: 2em;
    }
}

/* All Mobile Sizes (devices and browser) */
@media only screen and (max-width: 767px) {
    p{
      font-size: 14px;
    }

    h1{
      font-size: 2em;
    }
}

/* Mobile Landscape Size to Tablet Portrait (devices and browsers) */
@media only screen and (min-width: 480px) and (max-width: 767px) {
    p{
      font-size: 9px;
    }
}

/* Mobile Portrait Size to Mobile Landscape Size (devices and browsers) */
@media only screen and (max-width: 479px) {
    p{
      font-size: 7px;
    }

    h1{
      font-size: 1.5em;
    }
}
</style>