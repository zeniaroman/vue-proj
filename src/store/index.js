import { createStore } from 'vuex';
import axios from 'axios';

import authLogin from './modules/auth/login';
import authRegister from './modules/auth/register';
import teamIndex from './modules/team/';
import adminIndex from './modules/admin/';
import playerIndex from './modules/player/';
import globalIndex from './modules/global/';

const state = {
	apiURL: 'http://api.transferino.de/api/v1/',
	pageTitle: document.title
};

const actions = {
	async getProfile({getters}) {
		const authData = getters.getAuthData;
		
		return await axios.get(authData.userRole + '/Get/Profile');
	}
};

const mutations = {
	setPageTitle(state, title) {
    state.pageTitle = title;
  }
};

const getters = {
	getApiURL: state => state.apiURL,
	getPageTitle: state => state.pageTitle,
};

const modules = {
	authLogin,
	authRegister,
	teamIndex,
	adminIndex,
	playerIndex,
	globalIndex
};

export const store = createStore({
	state,
	actions,
	mutations,
	getters,
	modules
});