<template lang="pug">
.auth-admin
	CForm.auth-admin__form(onsubmit="return false")
		h1.form__title {{ $t('authAdmin.form.title') }}
		label.form__label(for="auth-admin-email") {{ $t('authAdmin.form.labelEmail') }}
		input.form__input.auth-admin__input(v-model="userData.email" id="auth-admin-email" type="email" :placeholder="$t('authAdmin.form.placeholderEmail')")
		span.form__error(v-if="validator.email.$error") {{ $t(`authAdmin.form['${validator.email.$errors[0].$validator}ErrorEmail']`) }}
		label.form__label(for="auth-admin-password") {{ $t('authAdmin.form.labelPassword') }}
		input.form__input.auth-admin__input(v-model="userData.password" id="auth-admin-password" type="password" :placeholder="$t('authAdmin.form.placeholderPassword')")
		span.form__error(v-if="validator.password.$error") {{ $t(`authAdmin.form['${validator.password.$errors[0].$validator}ErrorPassword']`) }}
		input.form__input.form__submit(@click="submitHandler" type="submit" :value="$t('authAdmin.form.submitButton')")
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import CForm from '@/components/CForm';

export default {
	name: 'AuthAdmin',
	components: {
		CForm
	},
	setup() {
		const router = useRouter()
		const store = useStore()

		const userData = reactive({
			email: null,
			password: null
		})

		const userDataRules = {
			email: {
				required,
				email
			},
			password: {
				required
			}
		}

		const validator = useVuelidate(
			userDataRules,
			userData
		)


		function submitHandler() {
			validator.value.$touch()

			if(validator.value.$invalid) {
				return
			}

			store.commit('setAuthLoginEmail', userData.email)
			store.dispatch('authLogin', userData.password)

			// console.log(store.getters)
			console.log('Email: ', userData.email);
			console.log('Password: ', userData.password);

			router.push({ name: 'AdminProfile' })
		}

		return {
			userData,
			validator,
			submitHandler
		}
	}
}
</script>

<style lang="sass">
.app
	background: c_layout_admin()

.layout-auth
	background: c_layout_admin() url('./../../assets/bg-main.png') no-repeat 50%
	background-size: cover

	.auth-admin
		flex-direction: column
		align-items: flex-end

		.form
			margin-top: 50px
			margin-right: 15%

			&__input
				background: c_input_bg_black()
			&__submit
				background: c_action()

		+media(screen(md))
			align-items: center
			.form
				margin-right: 0
</style>
