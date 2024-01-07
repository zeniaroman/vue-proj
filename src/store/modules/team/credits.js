import axios from 'axios';

const state = {
	teamCreditsRequestResult: null
};

const actions = {
	async getCredits() {		
		return await axios.get('Credit/get');
	},
	async teamCreditsRequest({commit, getters}, amount) {
		const result = await axios.post('Credit/Request', {amount, userId: getters.getAuthData.userIdInt});
		commit('setTeamCreditsRequestResult', result);
	}
};

const mutations = {
	setTeamCreditsRequestResult(state, result) {
		state.teamCreditsRequestResult = result;
	}
};

const getters = {
	getTeamCreditsRequestResult: state => state.teamCreditsRequestResult
};


export default {
	state,
	actions,
	mutations,
	getters
};