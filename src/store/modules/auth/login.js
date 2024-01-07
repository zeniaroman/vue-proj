import { jwtDecrypt, tokenAlive } from "../../../shared/jwtHelper";
import axios from 'axios';

const state = () => ({	
	authData: {
		token: "",
		refreshToken: "",
		tokenExp: "",
		userId: "",
		userIdInt: "",
		userName: "",
	},
	loginStatus: "",
});

const actions = {
	async login({ commit, getters }, payload) {
		let command = '/Login';

		if(payload.refresh) {
			if(getters.isTokenActive) {
				return;
			}

			delete payload.refresh;
			command = '/RefreshToken';
		}

		await axios.post('Auth' + command, payload)
			.then(res => {
				let receivedData = res.data;
				commit("saveTokenData", receivedData);
				commit("setLoginStatus", "success");
			})
			.catch(err => {
				commit("setLoginStatus", "failed");
				console.log('Error: ', err);
			})
	}
}

const mutations = {
	saveTokenData(state, data) {
		// Setup Authorization header with token for axios as default in one place
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

		localStorage.setItem("access_token", data.token);
		localStorage.setItem("refresh_token", data.refreshToken);

		const jwtDecodedValue = jwtDecrypt(data.token);
		const newTokenData = {
			token: data.token,
			refreshToken: data.refreshToken,
			tokenExp: jwtDecodedValue.exp,
			userId: jwtDecodedValue.sub,
			userIdInt: jwtDecodedValue.UserId,
			userName: jwtDecodedValue.userName,
			userRole: jwtDecodedValue.role
		};
		state.authData = newTokenData;
	},
	setLoginStatus(state, value) {
		state.loginStatus = value;
	},
	logout(state) {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		
		state.authData = {};
		state.loginStatus = "";
	}
}

const getters = {
	getLoginStatus: state => state.loginStatus,
	getAuthData: state => state.authData,
	isTokenActive: state => {
		if (!state.authData.tokenExp) {
			return false
		}
		return tokenAlive(state.authData.tokenExp)
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}