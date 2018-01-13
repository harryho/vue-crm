<template>
    <v-container grid-list-md id="dashboard">
        <v-layout row class="mx-2">
            <v-flex md3 sm6 xs12>
                <v-card class="cyan darken-3" light>
                    <v-container fluid grid-list-sm>
                        <v-layout row class="mt-2 mb-0" >
                            <v-flex xs4>
                                <v-icon class="mx-4" x-large light>card_membership</v-icon>
                            </v-flex>
                            <v-flex xs8>
                                <div>
                                    <div class="subheading">New Orders</div>
                                    <strong>120</strong>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row class="my-0">
                            <v-flex xs12 class="text-xs-right">
                                <v-btn flat class="grey--text darken-1">More info</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="deep-orange  lighten-3" light>
                        <v-container fluid grid-list-sm >
                                <v-layout row class="mt-2 mb-0" >
                                <v-flex xs4>
                                        <v-icon class="mx-4"  x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex xs8>
                                    <div>
                                        <div class="subheadingfont">User Registrations</div>
                                        <strong>780</strong>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="my-0">
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn flat class="grey--text darken-1">More info</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="blue-grey darken-1" light>  
                    <v-container fluid grid-list-sm >
                            <v-layout row class="mt-2 mb-0" >
                                <v-flex xs4>
                                    <v-icon class="mx-4" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex xs8>
                                    <div>
                                        <div class="subheadingfont">Unique Visitors</div>
                                        <strong>78</strong>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="my-0">
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn flat class="grey--text darken-1">More info</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="pink  lighten-4" light>
                        <v-container fluid grid-list-sm >
                                <v-layout row class="mt-2 mb-0" >
                                <v-flex xs4>
                                    <v-icon class="mx-4" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex xs8>
                                    <div>
                                        <div class="subheadingfont">Bounce Rate</div>
                                        <strong>53%</strong>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="my-0">
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn flat class="grey--text darken-1">More info</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-card>
            </v-flex>
            </v-layout>

            <v-layout row wrap class="pt-5">
                <v-flex md6 xs12>
                    <v-card light>
                        <doughnut></doughnut>
                    </v-card>
                </v-flex>
                <v-flex md6 xs12>
                    <v-card light>
                        <bar></bar>
                    </v-card>
                </v-flex>
            </v-layout>
    </v-container>
</template>
<script>
    import Bar from './chart/Bar'
    import Doughnut from './chart/Doughnut'
    export default {
        name: 'Dashboard',
        components: {
            Bar,
            Doughnut
        },
        mounted() { }
    }
</script>
<style>
    #dashboard .flex {
        margin-bottom: 16px
    }
</style>