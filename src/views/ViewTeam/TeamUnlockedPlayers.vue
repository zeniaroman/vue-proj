<template lang="pug">
.team-unlocked-players
	h1.team-unlocked-players__title {{ $t('teamUnlockedPlayers.title') }}
	.team-unlocked-players__filter.filter
		.filter__title {{ $t('teamUnlockedPlayers.filter.title') }}
		input.filter__input(v-model="filter.name" @input="filterHandler" type="text" :placeholder="$t('teamUnlockedPlayers.filter.search')")
		.filter__controls(v-if="showFilters")
			select.filter__select(v-model="filter.age" @change="filterHandler")
				option(value="" selected disabled) {{ $t('teamUnlockedPlayers.filter.age') }}
				option(value="18") 18
				option(value="19") 19
				option(value="20") 20
				option(value="21") 21
				option(value="22") 22
				option(value="23") 23
			select.filter__select(v-model="filter.region" @change="filterHandler")
				option(value="" selected disabled) {{ $t('teamUnlockedPlayers.filter.region') }}
				option(value="Region #1") Region #1
				option(value="Region #2") Region #2
				option(value="Region #3") Region #3
				option(value="Region #4") Region #4
			select.filter__select(v-model="filter.record" @change="filterHandler")
				option(value="" selected disabled) {{ $t('teamUnlockedPlayers.filter.record') }}
				option(value="Record #1") Record #1
				option(value="Record #2") Record #2
				option(value="Record #3") Record #3
			select.filter__select.filter__select_black(v-model="filter.platform" @change="filterHandler")
				option(value="" selected disabled) {{ $t('teamUnlockedPlayers.filter.platform') }}
				option(value="xbox") {{ $t('teamUnlockedPlayers.filter.platformXbox') }}
				option(value="playstation") {{ $t('teamUnlockedPlayers.filter.platformPlaystation') }}
			select.filter__select.filter__select_black(v-model="filter.clubStatus" @change="filterHandler")
				option(value="" selected disabled) {{ $t('teamUnlockedPlayers.filter.clubStatus') }}
				option(value="looking") {{ $t('teamUnlockedPlayers.filter.clubStatusLooking') }}
				option(value="have") {{ $t('teamUnlockedPlayers.filter.clubStatusHave') }}

		button.filter__button(@click="resetHandler") {{ $t('teamUnlockedPlayers.filter.button') }}
	.team-unlocked-players__results.results
		CTable.results__table(v-if="loaded")
			thead
				tr
					th {{ $t('teamUnlockedPlayers.results.playerName') }}
					th {{ $t('teamUnlockedPlayers.results.age') }}
					th {{ $t('teamUnlockedPlayers.results.region') }}
					th {{ $t('teamUnlockedPlayers.results.record') }}
					th {{ $t('teamUnlockedPlayers.results.platform') }}
					th {{ $t('teamUnlockedPlayers.results.clubStatus') }}
					th {{ $t('teamUnlockedPlayers.results.streaming') }}
			tbody
				tr(v-for="player in unlockedPlayers.result.players")
					td(@click="$router.push({name: 'TeamUnlockedPlayer', params: {userId: player.id}})") {{ player.nickName || 'open' }}
					td {{ player.age }}
					td {{ player.city }}
					td {{ player.lastRecord }}
					td {{ player.gameConsolePlatform }}
					td {{ player.lookingForClubStatus ? $t('teamUnlockedPlayers.results.clubStatusYes') : $t('teamUnlockedPlayers.results.clubStatusNo') }}
					td {{ player.streamingStatus ? $t('teamUnlockedPlayers.results.streamingYes') : $t('teamUnlockedPlayers.results.streamingNo') }}

</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import { useStore } from "vuex";

import CTable from '@/components/CTable';

export default {
	name: 'TeamUnlockedPlayers',
	components: {
		CTable
	},
	setup() {
		const store = useStore();

		const loaded = ref(false);
		const showFilters = ref(false);
		const unlockedPlayers = reactive({});

		onMounted(async () => {
			await store
				.dispatch("getUnlockedPlayers")
				.then((res) => {
				unlockedPlayers.result = res.data;        
				console.log(unlockedPlayers.result);
				})
				.catch((err) => {
				console.log("Error: ", err);
				// return;
				});

			loaded.value = true;
			});

		const filter = reactive({
			name: '',
			age: '',
			region: '',
			record: '',
			platform: '',
			clubStatus: ''
		});

		const filterHandler = () => {
			console.log(filter);
			// do some api request
		};

		const resetHandler = () => {
			Object.keys(filter).forEach(key => filter[key] = '');
		};
   
		return {
			showFilters,
			filter,
			filterHandler,
			resetHandler,
			unlockedPlayers,
			loaded
		};
	}
}
</script>

<style lang="sass">
.team-unlocked-players
	margin-top: 50px
	&__title
		margin-bottom: 40px
		font-size: 1.75em
		font-weight: 500
	&__filter
		display: flex
		flex-wrap: wrap
		margin-bottom: 40px
		padding: 40px 20px 20px
		background: cmw(c_black(), 2)
		border-radius: 10px
		.filter
			&__title
				width: 100%
				margin-bottom: 20px
				font-size: 1.25em
			&__input
				width: 100%
				margin-bottom: 10px
				padding: 10px 20px 10px 40px
				font-size: 1em
				color: c_white()
				background: c_input_bg()
				border: none
				border-radius: 5px
				outline: none
				appearance: none
				&::placeholder
					color: c_placeholder()
			&__controls
				flex: 1
			&__select
				min-width: 100px
				margin: 0 10px 20px 0
				padding: 10px  40px 10px 20px
				color: c_white()
				border: none
				background-color: c_button_bg()
				background-image: url('https://pngimage.net/wp-content/uploads/2018/06/grey-down-arrow-icon-png-2.png')
				background-repeat: no-repeat
				background-position: 95% 50%
				background-size: 20px
				border-radius: 3px
				appearance: none
				cursor: pointer
				outline: none
				&_black
					color: c_text_gray()
					background-color: c_black()
			&__button
				align-self: flex-start
				padding: 10px 40px
				border: none
				color: c_white()
				background: c_button_bg_lighten1()
				border-radius: 3px
				cursor: pointer
				appearance: none
				outline: none
	&__results
		overflow-x: scroll
		.results
			&__table
				tbody
          td:first-child
            color: c_gray_lighten1()
            cursor: pointer

	+media(screen(md))
		margin-top: 0
</style>
