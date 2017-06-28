<template>
    <v-container fluid id="dashboard">
        <v-layout row wrap>
            <v-flex md3 sm6 xs12>
                <v-card class="cyan darken-3" light>
                    <v-card-text>
                        <v-card-row height="30px">
                            <v-icon class="mr-4" light>card_membership</v-icon>
                            <div>
                                <div>New Orders</div>
                                <strong>120</strong>
                            </div>
                            <v-spacer></v-spacer>
                            <v-icon class="mr-5" x-large light>card_giftcard</v-icon>
                        </v-card-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-row actions>
                        <v-btn flat class="grey--text darken-1">More info</v-btn>
                    </v-card-row>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="deep-orange  lighten-1" light>
                    <v-card-text>
                        <v-card-row height="30px">
                            <v-icon class="mr-4" light>card_membership</v-icon>
                            <div>
                                <div>User Registrations</div>
                                <strong>36</strong>
                            </div>
                            <v-spacer></v-spacer>
                            <v-icon class="mr-5" x-large light>card_giftcard</v-icon>
                        </v-card-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-row actions>
                        <v-btn flat class="grey--text darken-1">More info</v-btn>
                    </v-card-row>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="blue-grey darken-1" light>
                    <v-card-text>
                        <v-card-row height="30px">
                            <v-icon class="mr-4" light>card_membership</v-icon>
                            <div>
                                <div>Unique Visitors</div>
                                <strong light>78</strong>
                            </div>
                            <v-spacer></v-spacer>
                            <v-icon class="mr-5" x-large light>card_giftcard</v-icon>
                        </v-card-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-row actions>
                        <v-btn flat class="grey--text darken-1">More info</v-btn>
                    </v-card-row>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="pink  lighten-4" light>
                    <v-card-text>
                        <v-card-row height="30px">
                            <v-icon class="mr-4" light>card_membership</v-icon>
                            <div>
                                <div>Bounce Rate</div>
                                <strong>53 %</strong>
                            </div>
                            <v-spacer></v-spacer>
                            <v-icon class="mr-5" x-large light>card_giftcard</v-icon>
                        </v-card-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-row actions>
                        <v-btn flat class="grey--text darken-1">More info</v-btn>
                    </v-card-row>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
        </v-layout>
        <v-layout row wrap>
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
    mounted () {
    }
  }
</script>
<style>
#dashboard .flex {
    margin-bottom: 16px
}
</style>
