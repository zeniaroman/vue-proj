import getPlayerAndTeamOverview from './getTransferinoDatabase';
import getGameresultConfirmationOverview from './getGameresultConfirmationOverview';
import getGameresultDetail from './getGameresultDetail';
import confirmationCreate from './confirmationCreate';
import PlayerDetail from './player-detail.js';
import TeamDetail from './team-detail.js';

import axios from 'axios';

const state = {
	adminSearchUsersByName: null,
	adminUpdateProfileStatusPayload: null
};

const actions = {
	async adminSearchUsersByName({commit}, name) {
		commit("setAdminSearchUsersByName", name)
		return await axios.get("Admin/getUsersByName?name=" + name)
	},
	async adminUpdateProfileStatus({commit}, payload) {
		commit("setAdminUpdateProfileStatusPayload" , payload)
		return await axios.put("Admin/UpdateProfileStatus", payload)
	}
};

const mutations = {
	setAdminSearchUsersByName(state, name) {
		state.adminSearchUsersByName = name;
	},
	setAdminUpdateProfileStatusPayload(state, payload) {
		state.adminUpdateProfileStatusPayload = payload;
	}
};

const getters = {
	adminSearchUsersByName: state => state.adminSearchUsersByName,
	adminUpdateProfileStatusPayload: state => state.adminUpdateProfileStatusPayload
};

const modules = {
	getPlayerAndTeamOverview,
	getGameresultConfirmationOverview,
	getGameresultDetail,
	confirmationCreate,
	PlayerDetail,
	TeamDetail
};

export default {
	state,
	actions,
	mutations,
	getters,
	modules
};