import axios from 'axios';

const state = {
	teamUnlockPlayerProfile: null,
	teamUnlockPlayerUnlockData: null
};

const actions = {
	async getTeamUnlockPlayerProfile({commit}, userId) {		
		const profile = await axios.get('Team/Get/Player/' + userId);
		commit('setTeamUnlockPlayerProfile', profile.data.playerData);
		commit('setTeamUnlockPlayerUnlockData', profile.data.unlockData);
	}
};

const mutations = {
	setTeamUnlockPlayerProfile(state, profile) {
		state.teamUnlockPlayerProfile = profile;
	},
	setTeamUnlockPlayerUnlockData(state, unlockData){
		state.teamUnlockPlayerUnlockData = unlockData;
	}
};

const getters = {
	getTeamUnlockPlayerProfile: state => state.teamUnlockPlayerProfile,
	getTeamUnlockPlayerUnlockData: state => state.teamUnlockPlayerUnlockData
};

export default {
	state,
	actions,
	mutations,
	getters
};