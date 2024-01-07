import axios from 'axios';

const state = {

};

const actions = {
	async getCredits() {		
		return await axios.get('Credit/get');
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