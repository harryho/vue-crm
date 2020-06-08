/* eslint-disable */
// @ts-ignore
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css'
import { preset } from 'vue-cli-plugin-vuetify-preset-fortnightly/preset';

Vue.use(Vuetify);


export default new Vuetify({
    preset,
    theme: {
        dark: false,
        default: 'light'
    }
});
