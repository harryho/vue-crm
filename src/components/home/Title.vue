<template>
  <div class="cls-titulo">
    <div class="div-titulo">
      {{this.dataTitulo}}
    </div>
    <div class="div-sub-titulo">
      {{this.dataSubTitulo}}
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "Title",
  props: {  propTitulo: String,  propSubTitulo: String  },

  data() {
    return {
      dataTitulo: String,
      dataSubTitulo: String
    };
  },

  mounted() {
    this.dataTitulo = this.propTitulo;
    this.dataSubTitulo = this.propSubTitulo;
  }
}
</script>

<style scoped>
.cls-titulo {
  position: relative;
  top: 6vh;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
}

.div-titulo {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  text-align: center;
  color: #000000;
  width: 100%
}

.div-sub-titulo {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  color: #000000;
  width: 100%;
}
</style>