<template>
    <div class="cls-navigation">
        <div class="div-menu">
            <img src="@/assets/bars-solid.svg" alt="">
        </div>
        <div class="div-text">{{this.dataText}}</div>
        <div class="div-find">
             <img src="@/assets/search-solid.svg" alt="">
        </div>
        <div class="div-foto">
            <img :src="this.dataFoto" alt="">
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "NavigationBar",
        props: { propMenu: Array, propText: String, propFoto: String },
        
        data() {
            return {
                dataMenu: Array,
                dataText: String,
                dataFoto: String
            };
        },

        mounted() {
            this.dataTitulo = this.propTitulo;
            this.dataSubTitulo = this.propSubTitulo;

            this.dataMenu = this.propMenu;
            this.dataText = this.propText;
            this.dataFoto = this.propFoto;
        }
    }
</script>

<style scoped>
.cls-navigation {
    position: relative;
    background: #FFFFFF;
    border-bottom-color: rgb(0, 0, 0);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    display: flex;
    flex-direction: row;
    height: 6vh;
}

.div-menu {
    position: relative;
    height: 3vh;
    left: 2vw;
    top: 2vh;
}

.div-menu img {
    max-width: 5vw;
    max-height: 3vh;
    width: 33.3px;
}

.div-text {
    position: relative;
    width: 35vw;
    height: 3vh;
    top: 2vh;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    text-transform: uppercase;
    text-align: left;
    color: #000000;
    padding-bottom: 0vh;
    left: 5vw;
}

.div-find {
    position: relative;
    width: 31vw;
    height: 4vh;
    top: 1vh;
    border-bottom-color: rgb(0, 0, 0);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-radius: 15px;
    left: 9vw;
}

.div-find img {
    max-width: 3vw;
    max-height: 4vh;
    width: 33.3px;
    height: 33.3px;
    margin-left: 26vw;
}

.div-foto {
    width: 10vw;
    height: 6vh;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    margin-left: 14vw;
}

.div-foto img {
    max-width: 10vw;
    max-height: 10vh;
    border: 1px solid #000000;
    border-radius: 50%;
    width: 33.3px;
    height: 33.3px;
    margin: 0.3rem;
}

</style>