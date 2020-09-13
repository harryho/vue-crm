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
    top: 2vh;
    margin-left: calc(100% - 98vw);
    width: 3vw;
}

.div-menu img {
    max-width: 5vw;
    max-height: 3vh;
    width: 33.3px;
}

.div-text {
    margin-left: calc(100% - 95vw);
    position: relative;
    height: 3vh;
    top: 2vh;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    text-transform: uppercase;
    text-align: left;
    color: #000000;
    padding-bottom: 0vh;
    width: 40vw;
}

.div-find {
    /* margin-left: calc(100% - 95vw); */
    width: 30vw;
    position: relative;
    height: 4vh;
    top: 1vh;
    border-bottom-color: rgb(0, 0, 0);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-radius: 15px;
}

.div-find img {
    width: 3vw;
    height: 1.8rem;
    margin-left: 0vw;
    margin-left: calc(100% - 5vw);
}

.div-foto {
    margin-left: calc(100% - 90vw);
    height: 6vh;
    flex-wrap: wrap;
    width: 5vw;
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