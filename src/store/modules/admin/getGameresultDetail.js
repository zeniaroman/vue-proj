import axios from 'axios';

const state = {
	gameResultConfirmationDetailId: null
};

const actions = {
	async getGameResultConfirmationDetail({commit}, gameResultId) {
		commit('setGameResultConfirmationDetailId', gameResultId);
		return await axios.get('Admin/GetGamresultDetail/' + gameResultId);
	}
};

const mutations = {
	setGameResultConfirmationDetailId(state, gameResultId) {
		state.gameResultConfirmationDetailId = gameResultId;
	}
};

const getters = {
	getGameResultConfirmationDetailId: state => state.gameResultConfirmationDetailId
};


export default {
	state,
	actions,
	mutations,
	getters
};