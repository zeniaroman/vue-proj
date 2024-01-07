<template lang="pug">
.player-statistics
	.player-statistics__sorting
		//- .player-statistics__sorting-by-date
		//- 	span in process
		select.player-statistics__sorting-by-platform
			option(selected disabled) Platform
			option Playstation
			option Xbox
			option Etc
	.player-statistics__stat
		.player-statistics__stat-played
			.player__section.player-statistics__stat-played-item
				span.stat-played-item__label {{ $t('playerStatistics.stat.played.totalMatchPlayed') }}
				span.stat-played-item__data 1245
			.player__section.player-statistics__stat-played-item
				span.stat-played-item__label.stat-played-item__label_win {{ $t('playerStatistics.stat.played.totalWin') }}
				span.stat-played-item__data 1245
			.player__section.player-statistics__stat-played-item
				span.stat-played-item__label.stat-played-item__label_loss {{ $t('playerStatistics.stat.played.totalLoss') }}
				span.stat-played-item__data 1245
			.player__section.player-statistics__stat-played-item
				span.stat-played-item__label Best Rank
				span.stat-played-item__data 123
			.player__section.player-statistics__stat-played-item.player-statistics__stat-played-item_last
				span.stat-played-item__label Average Wins
				span.stat-played-item__data 321

	.player-statistics__wrap.player-statistics__playing-rate-and-weekend-league
		.player__section.player-statistics__playing-rate
			span.player__title.playing-rate__title {{ $t('playerStatistics.playingRate.title') }}
			.playing-rate__change
				span.playing-rate__change-percent 18%
				span.player__field-label.playing-rate__change-label {{ $t('playerStatistics.playingRate.changeLastWeekLabel') }}
			.playing-rate__chart-wrap
				PlayingRateChart
		.player__section.player-statistics__weekend-league
			span.player__title FIFA Weekend league
			.player__field-data-wrap
				span.player__field-label {{ $t('playerStatistics.weekendLeague.currentPositionLabel') }}
				span.player__field-data 134
						sup.player__field-data-sup TH
			.player__field-data-wrap
				span.player__field-label {{ $t('playerStatistics.weekendLeague.highestPositionLabel') }}
				span.player__field-data 4
						sup.player__field-data-sup TH
			.player__field-data-wrap
				span.player__field-label {{ $t('playerStatistics.weekendLeague.lowestPositionLabel') }}
				span.player__field-data.player__field-data_last 144
						sup.player__field-data-sup TH

	.player-statistics__wrap.player-statistics__achievments
		CTable.achievments__table
			thead
				tr
					th Date
					th Rank
					th Tournament
			tbody
				tr
					td -
					td -
					td -

	.player-statistics__wrap.player-statistics__conclution-and-report(v-if="false")
		.player__section.player-statistics__conclution
			span.player__title {{ $t('playerStatistics.conclution.title') }}
			p.player-statistics__conclution-text {{ $t('playerStatistics.conclution.text') }}

		.player__section.player-statistics__report
			span.player__title {{ $t('playerStatistics.report.title') }}
			span.player__field-label {{ $t('playerStatistics.report.label') }}
			span.player-statistics__report-download {{ $t('playerStatistics.report.download') }}
</template>

<script>
import PlayingRateChart from '@/components/charts/PlayingRateChart';
import CTable from '@/components/CTable';

export default {
	name: 'PlayerStatistics',
	components: {
		PlayingRateChart,
		CTable
	},
	setup() {
	}
}
</script>

<style lang="sass">
.layout-player .player-statistics
	&__wrap
		display: flex
	&__sorting
		display: flex
		align-items: center
		justify-content: flex-end
		margin-bottom: 20px
		&-by-platform
			max-width: 400px
			padding: 12px 25px 12px 15px
			color: c_white()
			font-size: 1em
			background-color: c_input_bg()
			background-image: url('./../../assets/select-arrow.png')
			background-repeat: no-repeat
			background-position: 98% 50%
			background-size: 20px
			border: none
			border-radius: 5px
			outline: none
			appearance: none
			cursor: pointer
	&__stat
		display: flex
		margin-bottom: 20px
		&-played
			display: flex
			width: 100%
			&-item
				flex: 1
				display: flex
				flex-direction: column
				justify-content: space-between
				margin-right: 20px
				background-image: url('./../../assets/bg-main.png'), linear-gradient(c_black(), c_dark_blue_bg())
				background-size: cover
				&:nth-child(1)
				&:nth-child(2)
					background-size: 200%
				&:nth-child(3)
					background-size: 300%
				&_last
					margin-right: 0
				.stat-played-item__label
					margin-bottom: 20px
					font-size: .8em
					&_win
						color: c_label_win()
					&_loss
						color: c_label_loss()
				.stat-played-item__data
					font-size: 1.5em
	&__playing-rate-and-weekend-league
		margin-bottom: 20px
	&__playing-rate
		flex: 1
		margin-right: 20px
		background: linear-gradient(c_dark_blue_bg(), c_black())
		.playing-rate
			&__title
				margin-bottom: 20px
			&__change
				display: flex
				align-items: center
				margin-bottom: 20px
				&-percent
					margin-right: 5px
				&-label
					margin-bottom: 0
			&__chart-wrap
				height: 200px

	&__weekend-league
		display: flex
		flex-direction: column
		width: 30%
		background-image: url('./../../assets/bg-main.png'), linear-gradient(c_dark_blue_bg(), c_black())
		background-size: cover
		.player__title
			margin-bottom: 20px
		.player__field-data-wrap
			display: flex
			flex-direction: column
		.player__field-data
				color: c_white()
				font-size: 2em
				&_last
					margin-bottom: 0
				&-sup
					margin-left: 5px
					color: c_text_gray()
					font-size: .9rem
					font-weight: 600
	
	
	&__conclution-and-report
		align-items: flex-start
	&__conclution
		margin-right: 20px
		background: linear-gradient(c_black(), c_dark_blue_bg()())
		.player__title
			margin-bottom: 20px
		&-text
			color: c_text_gray()
	&__report
		display: flex
		flex-direction: column
		min-width: 300px
		background: c_black()
		.player__title
			margin-bottom: 20px
		.player__field-label
			margin-bottom: 10px
		&-download
			width: 100%
			padding: 10px 10px
			color: cmb(c_white(), 50)
			color: c_text_gray()
			font-size: 0.8em
			text-align: center
			background: c_button_bg()
			border-radius: 10px
			cursor: pointer

	+media(screen(xl))
		&__stat
			flex-direction: column
			&-played
				width: 100%
				margin-bottom: 20px
				&-item_last
					margin-right: 0
			&-latest
				width: 100%
		&__playing-rate-and-weekend-league
			flex-direction: column
		&__playing-rate
			margin: 0 0 20px 0
		&__weekend-league
			flex-direction: row
			flex-wrap: wrap
			align-items: flex-end
			width: 100%
			padding-bottom: 30px
			.player__title
				width: 100%
			.player__field-data-wrap
				margin-right: 20px
			.player__field-label
				margin-bottom: 0
			.player__field-data
				margin-bottom: 10px

	+media(screen(lg))
		&__conclution-and-report
			flex-direction: column
		&__conclution
			margin: 0 0 20px

	+media(screen(md))
		&__potential-growth
			flex: auto
			width: 100%

	+media(screen(sm))
		&__stat-played
			flex-direction: column
			margin-bottom: 0
			&-item
				margin: 0 0 20px
		&__report
			width: 100%
</style>
