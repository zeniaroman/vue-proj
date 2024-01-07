import axios from 'axios';

const state = {

};

const actions = {
	async getGameresultConfirmationOverview() {	
		return await axios.get('Admin/GetGameresultConfirmationOverview/1');
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