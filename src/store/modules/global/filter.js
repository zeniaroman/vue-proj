import axios from 'axios';

const state = {
	weekendleagueInfosGameId: null
};

const actions = {
	async getCountriesWithStates() {		
		return await axios.get('Webapp/GetCountriesWithStates');
	},
	async getPlayerFilters() {
		return await axios.get('Webapp/GetPlayerFilters');
	},
	async getWeekendleagueInfos({commit}, gameId) {
		commit('setWeekendleagueInfosGameId', gameId);
		return await axios.get('Webapp/GetWeekendleagueInfos/' + gameId);
	}
};

const mutations = {
	setWeekendleagueInfosGameId(state, gameId) {
		state.weekendleagueInfosGameId = gameId;
	}
};

const getters = {
	getWeekendleagueInfosGameId: state => state.weekendleagueInfosGameId
};


export default {
	state,
	actions,
	mutations,
	getters
};