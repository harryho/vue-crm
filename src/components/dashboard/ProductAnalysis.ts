import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { HorizontalBar} from "vue-chartjs";

@Component({
  name: "ProductAnalysis"
})
export default class ProductAnalysis extends mixins(HorizontalBar){

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
            label: "Product HX",
            backgroundColor: "#eb9fc1",
            data: [10, -2, 22, 9, -28, 15, ], 
            showLine: false,
            hideInLegendAndTooltip:true,
            borderColor: '#e55b83',
            borderWidth: 1,
            categoryPercentage: 0.95,
            barPercentage: 0.95
          },
          {
            label: "Product BM",
            backgroundColor: "#fde4a9",
            data: [20, -2, 30, 19, -21, -5],
            showLine: false,
            hideInLegendAndTooltip:true,
            borderColor: '#facd55',
            borderWidth: 1,
            categoryPercentage: 0.95,
            barPercentage: 0.95
          },
          {
            label: "Product WR",
            backgroundColor: "#9bdddf",
            data: [-6, -21, 21, -9, 2, 10],
            showLine: false,
            hideInLegendAndTooltip:true,
            borderColor: '#62c1c0',
            borderWidth: 1,
            categoryPercentage: 0.95,
            barPercentage: 0.95
          },
          {
            label: "Product PK",
            backgroundColor: "#90cdf4",
            borderColor: '#3ba2eb',
            borderWidth: 1,
            data: [16, 10, 12, -20, 18, 2], 
            showLine: false,
            hideInLegendAndTooltip:true,
            categoryPercentage: 0.95,
            barPercentage: 0.95
          }
        ],
      },
      { 
        title: {
          display: true,
          text: 'Product Analysis',
          position: 'bottom',
          fontSize: 20,
          fontStyle: 'bold'
        },
        legend:{
          position: 'top',
          fullWidth: true,
          labels: {
            fontSize: 16,
            fontStyle: 'bold'
          }
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
