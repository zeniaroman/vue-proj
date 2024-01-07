import axios from 'axios';

const state = {
	adminConfirmationPlayerData: null
};

const actions = {
	async adminConfirmationPlayer({commit}, data) {
		commit('setAdminConfirmationPlayerData', data);
		return await axios.post('Confirmation/Create', data);
	}
};

const mutations = {
	setAdminConfirmationPlayerData(state, data) {
		state.adminConfirmationPlayerData = data;
	}
};

const getters = {
	getAdminConfirmationPlayerData: state => state.adminConfirmationPlayerData
};


export default {
	state,
	actions,
	mutations,
	getters
};