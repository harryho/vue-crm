import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { HorizontalBar} from "vue-chartjs";

@Component({
  name: "HorizontalBarChart"
})
export default class HorizontalBarChart extends mixins(HorizontalBar){

  mounted() {

    this.renderChart(
      {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
        ],
        datasets: [
          {
            label: "Product 4",
            backgroundColor: "#f87979",
            data: [10, -2, 22, 9, -28, 15, ], 
            showLine: false,
            hideInLegendAndTooltip:true,
            borderColor: 'red',
            borderWidth: 1,
          },
          {
            label: "Product 1",
            backgroundColor: "#ffa50082",
            data: [20, -2, 30, 19, -21, -5],
            showLine: false,
            hideInLegendAndTooltip:true,
            borderColor: 'yellow',
            borderWidth: 1,
          },
          {
            label: "Product 2",
            backgroundColor: "#00aaff82",
            data: [-6, -21, 21, -9, 2, 10],
            showLine: false,
            hideInLegendAndTooltip:true,
            borderColor: 'lightblue',
            borderWidth: 1,
          },
          {
            label: "Product 3",
            backgroundColor: "#00800078",
            borderColor: 'lightgreen',
            borderWidth: 1,
            data: [16, 10, 12, -20, 18, 2], 
            showLine: false,
            hideInLegendAndTooltip:true,
          }
        ],
      },
      { 
        title: {
          display: false,
        },
        legend:{
          position: 'right'
        },
        scales: {
          xAxes:[{
            display: true,
            offset: true,
          }],
          yAxes:[{
            display: true,
          }],
        },
        responsive: true, maintainAspectRatio: false,

      }
    );
  }
}
