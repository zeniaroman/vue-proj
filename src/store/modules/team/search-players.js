import axios from 'axios';

const state = {
	teamSearchPlayersFilter: null
};

const actions = {
	async getSearchPlayers({commit}, filter) {
		commit('setTeamSearchPlayersFilter', filter);
		
		console.log("filter passed:", filter);

		// if(getters.teamSearchPlayersFilter == null)
		// 	return await axios.get("Player/GetAll?minAge=10&maxAge=70&totalWinsMin=1");
			
		return await axios.get(`Player/GetAll?
			minAge=${filter.age[0]}&
			maxAge=${filter.age[1]}&
			lookingForTeam=${filter.clubStatus}&
			totalWinsMin=${filter.record}&
			countryId=${filter.country}&
			stateId=${filter.state}&
			gameId=${filter.game}&
			gamePlatformId=${filter.platform}&
			`);
	}
};

const mutations = {
	setTeamSearchPlayersFilter(state, filter) {
		console.log("COMMIT")
		state.teamSearchPlayersFilter = filter;
	}
};

const getters = {
	teamSearchPlayersFilter: state => state.teamSearchPlayersFilter
};


export default {
	state,
	actions,
	mutations,
	getters
};