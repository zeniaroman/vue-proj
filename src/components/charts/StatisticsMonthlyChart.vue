<template lang="pug">
canvas(ref="canvas").statistics-monthly-chart-canvas
</template>

<script>
import { Doughnut } from 'vue-chartjs'

export default {
	name: 'StatisticsMonthlyChart',
	extends: Doughnut,
	props: ['doughnutData'],
	data() {
		return {
			chartData: {
				labels: ['loss', 'wins'],
				datasets: [
					{
						label: 'Data One',
						borderWidth: 0,
						backgroundColor: ['#7E382F', '#616377'],
						data: [this.doughnutData.totalLosses, this.doughnutData.totalWins]
					}
				]
			},
			chartOptions: {
				legend: false,
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	mounted() {
		console.log('DATA: ', this.doughnutData)
		this.renderChart(this.chartData, this.chartOptions)
	}
}
</script>

<style lang="sass">
.statistics-monthly-chart-canvas
</style>