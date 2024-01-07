import axios from 'axios';

const state = {
	playerUploadGameResultData: null
};

const actions = {
	async getCredits() {		
		return await axios.get('Credit/get');
	},
	async playerUploadGameResult({commit}, gameResult) {
		commit('setPlayerUploadGameResultData', gameResult);
		return await axios.post('GameResult/Add', gameResult);
	}
};

const mutations = {
	setPlayerUploadGameResultData(state, gameResult) {
		state.playerUploadGameResultData = gameResult;
	}
};

const getters = {
	getPlayerUploadGameResultData: state => state.playerUploadGameResultData
};


export default {
	state,
	actions,
	mutations,
	getters
};