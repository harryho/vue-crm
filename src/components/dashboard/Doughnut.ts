import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { Doughnut } from "vue-chartjs";

@Component({
  name: "DoughnutChart"
})
export default class DoughnutChart extends mixins(Doughnut) {
  mounted() {
    this.renderChart(
      {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "amber", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10]
          }
        ]
      },
      { 
        legend:{
          position: 'right'
        },
        
        responsive: true, maintainAspectRatio: false }
    );
  }
}
