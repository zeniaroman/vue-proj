import axios from 'axios';

const state = {

};

const actions = {
	async getPlayerAndTeamOverview() {
		console.log("Called Admin/getplayerandteamoverview");
		return await axios.get('Admin/GetPlayerAndTeamOverview');
	}
};

const mutations = {

};

const getters = {

};


export default {
	state,
	actions,
	mutations,
	getters
};