import axios from 'axios';

const state = {

};

const actions = {
	async getUnlockedPlayers() {		
		return await axios.get('Team/GetUnlockedPlayers');
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