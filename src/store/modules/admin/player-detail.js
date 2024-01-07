import axios from 'axios';

const state = {
	adminPlayerDetail: null
};

const actions = {
	async adminGetPlayerDetailById({ commit }, playerId) {			
		console.log(playerId)
		const res = await axios.get('Admin/GetPlayerDetail/' + playerId);
		console.log('Detail: ', res)
		commit('setAdminPlayerDetail', res.data.player);
	}
};

const mutations = {
	setAdminPlayerDetail(state, playerDetail) {
		state.adminPlayerDetail = playerDetail;
	}
};

const getters = {
	getAdminPlayerDetail: state => state.adminPlayerDetail
};


export default {
	state,
	actions,
	mutations,
	getters
};