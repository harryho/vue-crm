import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { Bar } from "vue-chartjs";

@Component({
  name: "MonthlySales"
})
export default class MonthlySales extends mixins(Bar) {


  @Prop({ default: 150 }) height: number;


  // @ts-ignore
  @Prop({
    default: () => {
      return { "margin-left": '0px', "background": '#e8757857' }
    }
  }) styles;


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
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            backgroundColor: "#f87979",
            data: [30, 23, 32, 39, 28, 30, 39, 30, 32, 29, 32, 31],
            showLine: false,
            hideInLegendAndTooltip: true,
            borderWidth: 0
          }
        ],
      },
      {
        title: {
          display: true,
          text: 'Monthly Sales',
          // position: 'left'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            offset: true,
          }],
          yAxes: [{
            display: false,
          }],
        },
        responsive: true, maintainAspectRatio: false,
      } 
    );
  }
}
