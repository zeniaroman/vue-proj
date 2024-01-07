import axios from 'axios';

const state = {
	adminTeamDetail: null
};

const actions = {
	async adminGetTeamDetailById({ commit }, teamId) {			
		console.log('TEAM ID: ', teamId)
		const res = await axios.get('Admin/GetTeamDetail/' + teamId);
		console.log('Detail: ', res)
		commit('setAdminTeamDetail', res.data.team);
	}
};

const mutations = {
	setAdminTeamDetail(state, teamDetail) {
		state.adminTeamDetail = teamDetail;
	}
};

const getters = {
	getAdminTeamDetail: state => state.adminTeamDetail
};

export default {
	state,
	actions,
	mutations,
	getters
};