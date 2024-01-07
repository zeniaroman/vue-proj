<template lang="pug">
canvas(ref="canvas").playing-rate-chart-canvas
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      chartOptions: { 
        legend: false,
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          intersect: false
        },
        scales: {
          xAxes: [{
              gridLines: {
                display: false
              }
          }],
          yAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                min: 0,
                max: 100,
                stepSize: 25
              }
          }]
        } 
      }
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    
    // this.gradient.addColorStop(0, "rgba(154, 161, 172, 1)");
    // this.gradient.addColorStop(0.75, "rgba(154, 161, 172, 1)");
    // this.gradient.addColorStop(0.50, "rgba(154, 161, 172, 1)");
    // this.gradient.addColorStop(0.25, "transparent");
    // this.gradient.addColorStop(1, "transparent");

    this.gradient.addColorStop(0, "rgba(255, 255, 255, 0.25)");
    this.gradient.addColorStop(0.9, "transparent");
    this.gradient.addColorStop(1, "transparent");

    this.renderChart(
      {
        labels: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "San"
        ],
        datasets: [
          {
            pointRadius: 0,
            pointWidth: 3,
            label: "Rate",
            borderColor: "#A5ACB7",
            pointBackgroundColor: "#191B28",
            borderWidth: 3,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: [40, 79, 60, 89, 59, 20, 40]
          }
        ]
      },
      this.chartOptions
    );
  }
};
</script>
