import axios from 'axios';

const state = {
	playerProfileId: null,
	playerProfileData: null
};

const actions = {
	async getPlayerProfile({commit}, userId = null) {
		commit('setPlayerProfile', userId);
		return await axios.get('Player/Get/Profile/' + (userId ? userId : ''));
	},
	async playerProfileUpdate({commit}, playerData) {
		commit('setPlayerProfileData', playerData);		
		return await axios.put('Player/Update', playerData)
	}
};

const mutations = {
	setPlayerProfile(state, userId) {
		state.playerProfileId = userId
	},
	setPlayerProfileData(state, playerData) {
		state.playerProfileData = playerData;		
	}
};

const getters = {
	getPlayerProfileId: state => state.playerProfileId,
	getPlayerProfileData: state => state.playerProfileData
};


export default {
	state,
	actions,
	mutations,
	getters
};