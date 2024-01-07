import axios from 'axios';

const state = {
	teamProfileData: null
};

const actions = {
	async teamProfileUpdate({getters}) {
		console.log('store: ', getters.getTeamProfileData)
		await axios.post('Team/Update', getters.getTeamProfileData);
	}
};

const mutations = {
	setTeamProfileData(state, profileData) {
		state.teamProfileData = profileData;
	}
};

const getters = {
	getTeamProfileData: state => state.teamProfileData
};

export default {
	state,
	actions,
	mutations,
	getters
};