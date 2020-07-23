import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { Doughnut } from "vue-chartjs";

@Component({
  name: "BrowserUsage"
})
export default class BrowserUsage extends mixins(Doughnut) {
  mounted() {
    this.renderChart(
      {
        labels: ["Firefox", "Safari", "Chrome", "IE"],
        datasets: [
          {
            backgroundColor: ["#41B883", "amber", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10]
          }
        ]
      },
      {
        legend: {
          position: 'top',
          fullWidth: true,
          labels: {
            fontSize: 16,
            fontStyle: 'bold'
          }
        },

        title: {
          display: true,
          text: 'Browser Usage',
          position: 'bottom',
          fontSize: 20,
          fontStyle: 'bold'
        },
        responsive: true, maintainAspectRatio: false
      }
    );
  }
}
