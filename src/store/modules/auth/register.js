import axios from 'axios';

const state = {
	authRegisterProfileType: 0,
	authRegisterNewEmail: null
}

const actions = {
	async authRegister({ getters }, password) {
		const body = {
			userRole: getters.authRegisterProfileType,
			email: getters.authRegisterNewEmail,
			password: password,
			confirmPassword: password
		}

		return await axios.post('Auth/Register', body);
	},
	async authConfirmEmail({ getters }, token){
		return await axios.get('Auth/ConfirmEmail?email=' + getters.authRegisterNewEmail + '&token=' + token);
	}
}

const mutations = {
	setAuthRegisterProfileType: (state, profileType) => {
		state.authRegisterProfileType = profileType
	},
	setAuthRegisterNewEmail: (state, email) => {
		state.authRegisterNewEmail = email
	}
}

const getters = {
	authRegisterProfileType: state => state.authRegisterProfileType,
	authRegisterNewEmail: state => state.authRegisterNewEmail
}

export default {
	state,
	actions,
	mutations,
	getters
}