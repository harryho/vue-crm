<template>
    <v-container id="dashboard" fluid   grid-list-lg class="mx-0 pa-0">
        <v-layout  row wrap>
            <v-flex md3 sm6 xs12>
                <v-card class="cyan darken-3" light>
                    <v-container fluid grid-list-sm class="cyan darken-3" light>
                        <v-layout class="mt-2 mb-0" row wrap>
                            <v-flex xs2>
                                <v-icon class="mx-1" x-large light>card_membership</v-icon>
                            </v-flex>
                            <v-flex md5 sm10 >
                                <div class="mx-1">
                                    <div class="subheading">New Orders</div>
                                    <strong>120</strong>
                                </div>
                            </v-flex>
                            <v-flex class="text-sm-right text-md-left" sm12 md5>
                              <v-btn outline class="grey--text darken-1" flat>More info</v-btn>
                          </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="deep-orange  lighten-3" light>
                        <v-container fluid grid-list-sm>
                                <v-layout class="mt-2 mb-0" row wrap>
                                <v-flex xs2>
                                        <v-icon class="mx-1" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex  md5 sm10>
                                    <div class="ml-1">
                                        <div class="subheadingfont">User Registrations</div>
                                        <strong>780</strong>
                                    </div>
                                </v-flex>
                                <v-flex class="text-sm-right text-md-left" sm12 md5>
                                  <v-btn outline class="grey--text darken-1 ml-0 pl-0" flat>More info</v-btn>
                              </v-flex>
                            </v-layout>
                        </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="blue-grey darken-1" light>
                    <v-container fluid grid-list-sm>
                            <v-layout class="mt-2 mb-0" row wrap>
                                <v-flex xs2>
                                    <v-icon class="mx-1" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex md5 sm10>
                                    <div class="mx-1">
                                        <div class="subheadingfont">Unique Visitors</div>
                                        <strong>78</strong>
                                    </div>
                                </v-flex>
                                <v-flex class="text-sm-right text-md-left" sm12 md5>
                                  <v-btn outline class="grey--text darken-1" flat>More info</v-btn>
                              </v-flex>
                            </v-layout>

                        </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="pink  lighten-4" light>
                        <v-container fluid grid-list-sm>
                                <v-layout class="mt-2 mb-0" row wrap>
                                <v-flex xs2>
                                    <v-icon class="mx-1" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex md5 sm10>
                                    <div class="mx-1">
                                        <div class="subheadingfont">Bounce Rate</div>
                                        <strong>53%</strong>
                                    </div>
                                </v-flex>
                                <v-flex class="text-sm-right text-md-left" sm12 md5>
                                  <v-btn outline class="grey--text darken-1" flat>More info</v-btn>
                              </v-flex>
                            </v-layout>
                       </v-container>
                </v-card>
            </v-flex>
            </v-layout>

            <v-layout class="pt-1" row wrap>
                <v-flex md4 xs12>
                    <v-card light>
                        <doughnut></doughnut>
                    </v-card>
                </v-flex>
                <v-flex md4 xs12>
                    <v-card light>
                        <bar></bar>
                    </v-card>
                </v-flex>
                <v-flex md4 xs12>
                    <v-card light class="Chart">
                        <line-chart></line-chart>
                    </v-card>
                  </v-flex>

            </v-layout>
    </v-container>
</template>
<script>
    import Bar from './chart/Bar'
    import Doughnut from './chart/Doughnut'
    import LineChart from './chart/LineChart'
    export default {
        name: 'Dashboard',
        data () {
          return {
            monthlyStat: {

            }
          }
        },
        components: {
            Bar,
            Doughnut,
            LineChart
        },
        mounted() { }
    }
</script>
<style  scoped>
    #dashboard .flex {
        margin-bottom: 16px
    }



</style>
