<template lang="pug">
.player-upload-new-data
	.player__section
		form(onsubmit="return false").form
			h1.player__title Upload Your
				br
				| Weekend League Result
			select.form__input.form__select(v-model="game")
				option(value="" selected disabled) Select a game
				option(
					v-for="game in games.result"
					:key="'game-key-' + game.gameId"
					:value="game.gameId"
				) {{ game.gameName }}

			select.form__input.form__select(v-model="gamePlatform")
				option(value="" selected disabled) Select game platform
				option(
					v-for="platform in gamePlatforms.result"
					:key="'platform-key-' + platform.platformId"
					:value="platform.platformId"
				) {{ platform.platformName }}
			.form__row
				.form__input-container.form__input-container_win
					label.form__label(for="player-upload-new-data-total-win") Total win
					input.form__input(v-model="gameTotalWin" id="player-upload-new-data-total-win" type="number" placeholder="Numbers of win" min="0")
				.form__input-container.form__input-container_loss
					label.form__label(for="player-upload-new-data-total-loss") Total loss
					input.form__input(v-model="gameTotalLoss" id="player-upload-new-data-total-loss" type="number" placeholder="Numbers of loss" min="0")
			label.form__label(for="player-upload-new-data-chose-of-weekend") Chose of weekend
			select.form__input.form__select(
				id="player-upload-new-data-chose-of-weekend"
				v-model="weekendLeague"
			)
				option(value="" selected disabled) Weekends
				option(
					v-for="weekendLeague in weekendLeagues.result"
					:key="'weekend-league-key' + weekendLeague.id"
					:value="weekendLeague.id"
				) {{ weekendLeague.startDateTime.split(' ')[0] }} - {{ weekendLeague.endDateTime.split(' ')[0] }}

			label.form__label(for="player-upload-new-data-chose-of-rank") Chose of rank
			select.form__input.form__select(
				id="player-upload-new-data-chose-of-rank"
				v-model="weekendLeagueRank"
			)
				option(value="" selected disabled) Ranks
				option(
					v-for="weekendLeagueRank in weekendLeagueRanks.result"
					:key="'weekend-league-rank-key' + weekendLeagueRank.id"
					:value="weekendLeagueRank.internalRankingId"
				) {{ weekendLeagueRank.rankName }}

			label.form__label(for="player-upload-new-data-file") Proof of results
			input.form__input(@change="fileInputHandler" ref="fileInput" id="player-upload-new-data-file" type="file" accept="image/jpg, image/png")

			input.form__input.form__submit(@click="submitHandler" type="submit" value="Submit")
</template>

<script>
import { reactive, ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

export default {
	name: 'PlayerUploadNewData',
	setup() {
		const store = useStore();

		const games = reactive({});
		const game = ref("");
		const gamePlatforms = reactive({});
		const gamePlatform = ref("");
		const gameTotalWin = ref("");
		const gameTotalLoss = ref("");
		const weekendLeagues = reactive({});
		const weekendLeague = ref("");
		const weekendLeagueRanks = reactive({});
		const weekendLeagueRank = ref("");
		const fileInput = ref(null);
		const fileBase64 = ref(null);


		const gameResult = reactive({
			id: 0,
			userId: store.getters.getAuthData.userIdInt,
			timestamp: new Date().toISOString()
		});

		onMounted(async () => {
			await store.dispatch('getPlayerFilters')
				.then(res => {
					games.result = res.data.games;
					console.log('GetPlayerFilters: ', res);
				});
		});

		watch(
			game,
			async () => {
				const gameIndex = games.result.findIndex(g => g.gameId == game.value);
				gamePlatforms.result = games.result[gameIndex].platforms;

				await store.dispatch('getWeekendleagueInfos', game.value)
					.then(res => {
						weekendLeagues.result = res.data.weekendLeagues;
						weekendLeagueRanks.result = res.data.weekendLeagueRanks;
						console.log('getWeekendleagueInfos: ', res);
					});
			}
		);

		watch(
			weekendLeagueRank,
			() => {
				// const weekendLeagueRankIndex = weekendLeagueRanks.result.findIndex(r => r.internalRankingId == weekendLeagueRank.value);
				// const rank = weekendLeagueRanks.result[weekendLeagueRankIndex];
			}
		);

		const fileInputHandler = () => {
			const file = fileInput.value.files[0];
			const fileReader = new FileReader();

			fileReader.readAsDataURL(file);
			fileReader.onload = event => {
				console.log('file onloaded')
				fileBase64.value = event.target.result;
			}
		};

		const submitHandler = async () => {
			gameResult.gameId = game.value;
			gameResult.gamingPlatformId = gamePlatform.value;
			gameResult.totalWins = gameTotalWin.value;
			gameResult.totalLosses = gameTotalLoss.value;
			gameResult.weekendleagueId = weekendLeague.value;
			gameResult.finishedRank = weekendLeagueRank.value;
			gameResult.base64String = fileBase64.value;

			console.log(gameResult);
			await store.dispatch('playerUploadGameResult', gameResult)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				})
		};

		return {
			games,
			game,
			gamePlatforms,
			gamePlatform,
			gameTotalWin,
			gameTotalLoss,
			weekendLeagues,
			weekendLeague,
			weekendLeagueRanks,
			weekendLeagueRank,
			fileInput,
			fileInputHandler,
			submitHandler
		};
	}
}
</script>

<style lang="sass">
.layout-player .player-upload-new-data
	.player__section
		background: c_black() url('./../../assets/bg-main.png')
		background-repeat: no-repeat
		background-position: 0% 0%
		background-size: 50%

	.form
		display: flex
		flex-direction: column
		width: 100%
		max-width: 600px
		margin: 0 auto
		&__row
			display: flex
			max-width: 400px
		&__input-container
			flex: 1
			display: flex
			flex-direction: column
			&_win
				margin-right: 10px
			&_loss
				margin-left: 10px
		&__label
			margin-top: 10px
			padding-bottom: 10px
			cursor: pointer
		&__input
			width: 100%
			max-width: 400px
			margin-bottom: 20px
			padding: 12px 15px
			color: c_white()
			font-size: 1em
			background: c_input_bg()
			border: none
			border-radius: 5px
			outline: none
			appearance: none
			&::placeholder
				color: c_placeholder()
		&__submit
			width: 60%
			max-width: 220px
			margin-top: 20px
			color: c_white()
			background: c_action()
			cursor: pointer
			&:hover
				background: cmb(c_action(), 10)

</style>
