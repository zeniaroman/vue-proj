<template lang="pug">
.auth-register-confirm
	CForm.auth-register-confirm__form(onsubmit="return false")
		h1.form__title {{ $t('authRegisterConfirm.form.title') }}
		
		span.auth-register-confirm__label-small-text {{ $t('authRegisterConfirm.form.profileCreated') }}
		label.form__label(for="auth-register-confirm-code") {{ $t('authRegisterConfirm.form.label') }}
		input.form__input(v-model="confirmCode" id="auth-register-confirm-code" type="text" :placeholder="$t('authRegisterConfirm.form.placeholder')")
		span.form__error(v-if="validator.confirmCode.$error") {{ $t(`authRegisterConfirm.form['${validator.confirmCode.$errors[0].$validator}ConfirmCode']`) }}
		
		input.form__input.form__submit(@click="submitHandler" type="submit" :value="$t('authRegisterConfirm.form.submit')")
		input.form__input.form__submit(@click="skipConfirmationEmail" type="submit" :value="$t('authRegisterConfirm.form.skip')")
		span.auth-register-confirm__label-small-text {{ $t('authRegisterConfirm.form.resendText') }}&nbsp;
			span.auth-register-confirm__label-small-action(@click="") {{ $t('authRegisterConfirm.form.resendAction') }}
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import CForm from '@/components/CForm';
// import { storeKey } from 'vuex';

export default {
	name: 'AuthRegisterConfirm',
	components: {
		CForm
	},
	setup(){
		const router = useRouter()
		const store = useStore()

		const newEmail = ref(store.getters.authRegisterNewEmail);
		const confirmCode = ref(null);

		const confirmCodeRules = {
			confirmCode: {
				required
			}
		};

		const validator = useVuelidate(
			confirmCodeRules,
			{
				confirmCode
			}
		);

		function skipConfirmationEmail(){
			redirectBasedOnRole();
		}

		function redirectBasedOnRole(){
			if (store.getters.authRegisterProfileType == "Team")
			{			
			router.push({ name: 'AuthRegisterTeam' });
			}
			else
			{			
			router.push({ name: 'AuthRegisterPlayer' });
			}
		}

		async function submitHandler() {
			validator.value.$touch();
			if(validator.value.$invalid) {
				return false;
			}

			console.log(newEmail)
			console.log('good')

			await store
				.dispatch("authConfirmEmail", confirmCode.value)
				.then((res) => {
					console.log(res);
					redirectBasedOnRole();
				})
				.catch((err) => {
					console.log(err);
				});

			// store.commit('setAuthRegisterProfileType', profileType.value)
			// store.commit('setAuthRegisterNewEmail', newEmail.value)

			


			// console.log('ok')

			// console.log('Type:', profileType.value)
			// console.log('Email:', newEmail.value)
			// console.log('Password:', newPassword.value)
			// console.log('ConfirmPassword:', confirmNewPassword.value)

			// router.push({ name: 'AuthRegister' + profileType.value })
		}

		return {
			confirmCode,
			validator,
			submitHandler,
			skipConfirmationEmail,
			redirectBasedOnRole
		};
	}
}
</script>

<style lang="sass">
.layout-auth .auth-register-confirm
	flex-direction: column
	align-items: flex-end

	.form
		margin-top: 50px
		margin-right: 15%

		&__label
			padding-bottom: 20px
			font-size: .9em

	&__label-small-text
		color: c_gray_lighten1()
		font-size: .8em
	&__label-small-action
		cursor: pointer
		&:hover
			text-decoration: underline

	+media(screen(md))
		align-items: center
		.form
			margin-right: 0
</style>
