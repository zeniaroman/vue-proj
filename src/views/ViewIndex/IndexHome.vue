<template lang="pug">
.index-home
	.index-home__top
		h1 Vacation start here!
		strong Find the best for your great holiday
		br
		small on Temerife

	.index-home__rent
		.index-home__rent-title Booking on Tenerife ({{ rentsData.length }})

		CRent(v-for="rentData of rentsData" :rentData="rentData")
		//- CRent(:rent="rentData")
		//- CRent(:rent="rentData")
		//- CRent(:rent="rentData")

		router-link.index-home__rent-all(:to="{name: 'IndexRent'}") See all Rent

	.index-home__rent
		.index-home__rent-title Buy on Tnerife (321)
		.rent.rent_home.rent_service.rent_boat
			.rent__title Apartment
			//- .rent__reviews
			.rent__location Tenerife, Costa Adehe
			.rent__desc Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Eveniet, dolores!
			.rent__open More

		.rent.rent_home.rent_service.rent_boat
			.rent__title Apartment
			//- .rent__reviews
			.rent__location Tenerife, Costa Adehe
			.rent__desc Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Eveniet, dolores!
			.rent__open More

		.rent.rent_home.rent_service.rent_boat
			.rent__title Apartment
			//- .rent__reviews
			.rent__location Tenerife, Costa Adehe
			.rent__desc Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Eveniet, dolores!
			.rent__open More

		.rent.rent_home.rent_service.rent_boat
			.rent__title Apartment
			//- .rent__reviews
			.rent__location Tenerife, Costa Adehe
			.rent__desc Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Eveniet, dolores!
			.rent__open More

		.index-home__rent-all See all Buy
	//- img.index-home(src="https://images.unsplash.com/photo-1624298479276-03e588bd7576?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", alt="")
//- .auth-login
//-   CForm.auth-login__form(onsubmit="return false")
//-     h1.form__title {{ $t('authLogin.form.title') }}
//-     label.form__label(for="auth-login-email") {{ $t('authLogin.form.labelEmail') }}
//-     input#auth-login-email.form__input(
//-       v-model="userData.email",
//-       type="email",
//-       :placeholder="$t('authLogin.form.placeholderEmail')"
//-     )
//-     span.form__error(v-if="validator.email.$error") {{ $t(`authLogin.form['${validator.email.$errors[0].$validator}ErrorEmail']`) }}
//-     label.form__label(for="auth-login-password") {{ $t('authLogin.form.labelPassword') }}
//-     input#auth-login-password.form__input(
//-       v-model="userData.password",
//-       type="password",
//-       :placeholder="$t('authLogin.form.placeholderPassword')"
//-     )
//-     span.form__error(v-if="validator.password.$error") {{ $t(`authLogin.form['${validator.password.$errors[0].$validator}ErrorPassword']`) }}
//-     input.form__input.form__submit.auth-login__submit(
//-       ref="loginSubmit"
//-       @click="submitHandler",
//-       type="submit",
//-       :value="$t('authLogin.form.submitButton')"
//-     )
//-     span.auth-login__forgot-text {{ $t('authLogin.form.forgotText') }}&nbsp;
//-       span.auth-login__forgot-action(@click="$router.push({ name: 'AuthForgotPassword'})") {{ $t('authLogin.form.forgotAction') }}
//-     span.auth-login__register-text {{ $t('authLogin.form.registerText') }}
//-     span.auth-login__register-action(
//-       @click="$router.push({ name: 'AuthRegister' })"
//-     ) {{ $t('authLogin.form.registerAction') }}
</template>

<script>
// import { reactive } from "vue";
import { ref } from "vue";
// import { useRouter } from 'vue-router';
// import { useStore } from "vuex";
// import { useVuelidate } from "@vuelidate/core";
// import { required, email } from "@vuelidate/validators";

// import CForm from '@/components/CForm';

import CRent from '@/components/CRent';

export default {
	name: "IndexHome",
	components: {
		CRent
	},
	setup() {
		const rentsData = ref(
			[
				{
					id: 12,
					images: ['/local/shogun.jpg'],
					title: 'Boat Tour',
					location: 'Tenerife',
					description: 'Desc some text for this item here',
					// isFull: true
				},
				{
					id: 13,
					images: ['@/assets/1.jpg'],
					title: 'Test 2',
					location: 'Tenerife',
					description: 'Desc',
					// isFull: true
				},
				{
					id: 14,
					images: ['@/assets/1.jpg'],
					title: 'Test 3',
					location: 'Tenerife',
					description: 'Desc',
					// isFull: true
				},
				{
					id: 15,
					images: ['@/assets/1.jpg'],
					title: 'Test 4',
					location: 'Tenerife',
					description: 'Desc',
					// isFull: true
				}
			]
		)

		return {
			rentsData
		}
		// const loginSubmit = ref();
		// const router = useRouter();
		// const store = useStore();
		// const userData = reactive({
		//   email: null,
		//   password: null,
		// });

		// const userDataRules = {
		//   email: {
		//     required,
		//     email,
		//   },
		//   password: {
		//     required,
		//   },
		// };

		// const validator = useVuelidate(userDataRules, userData);

		// async function submitHandler() {
		//   validator.value.$touch();

		//   if (validator.value.$invalid) {
		//     return;
		//   }

		//   loginSubmit.value.disabled = true;

		//   await store.dispatch("login", {
		//     Email: userData.email,
		//     Password: userData.password,
		//   });

		//   console.log(store.getters.getLoginStatus);
		//   console.log(store.getters.getAuthData);

		//   if (store.getters.getLoginStatus === "success") {
		//     router.push({ name: store.getters.getAuthData.userRole + "Profile" });
		//   } else {
		//     userData.password = null;
		//     loginSubmit.value.disabled = false;
		//     alert("failed to login");
		//   }

		//   console.log("Email: ", userData.email);
		//   console.log("Password: ", userData.password);
		// }

		// return {
		//   userData,
		//   validator,
		//   loginSubmit,
		//   submitHandler,
		// };
	},
};
</script>

<style lang="sass">
.index-home
	flex-direction: column
	align-items: flex-end
	margin-top: -58px

	// &__top
	//   width: 100%

	// &__top
		// min-height: 600px
		// background-image: src('https://images.unsplash.com/photo-1624298479276-03e588bd7576?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')

	&__top
		width: 100%
		min-height: 700px
		margin-bottom: 40px
		padding: 150px 50px 50px
		color: c_white()
		font-size: 3.5em
		text-shadow: 1px 1px c_gray()
		background: #ccc
		background-image: url('https://images.unsplash.com/photo-1624298479276-03e588bd7576?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')
		background-image: url('https://images.unsplash.com/photo-1579090814807-60808035e1cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
		background-repeat: no-repeat
		background-position: 50%
		background-size: cover

	&__rent
		display: flex
		flex-wrap: wrap
		justify-content: center
		margin-bottom: 60px
		&-title
			width: 100%
			margin-bottom: 10px
			font-size: 1.2em
			font-weight: bold
		&-all
			width: 80%
			margin: 20px auto 0
			padding: 10px
			color: c_white()
			text-align: center
			font-weight: bold
			background: c_action()
			border-radius: 5px
	// .rent
	// 	display: flex
	// 	flex-direction: column
	// 	justify-content: flex-end
	// 	width: 100%
	// 	max-width: 25%
	// 	min-width: 300px
	// 	min-height: 300px
	// 	padding: 20px
	// 	background: #f7f7f7
	// 	background-image: url('./../../assets/1.jpg')
	// 	background-repeat: no-repeat
	// 	background-position: 50% 50%
	// 	background-size: cover
	// 	border: 1px solid c_action()
	// 	&__title
	// 		padding: 5px 5px 0
	// 		font-size: 1.1em
	// 		font-weight: bold
	// 		background: cma(c_white(), .35)
	// 		border-radius: 5px 5px 0 0
	// 	&__location
	// 		padding: 5px 0
	// 		font-style: italic
	// 		background: cma(c_white(), .35)
	// 	&__desc
	// 		margin-bottom: 20px
	// 		padding: 5px
	// 		font-size: .9em
	// 		background: cma(c_white(), .35)
	// 		border-radius: 0 0 5px 5px
	// 	&__open
	// 		padding: 0 5px
	// 		color: c_action()
	// 		font-weight: bold



	// .form__submit.auth-login__submit
	// 	margin-bottom: 10px

	// &__forgot-text
	// 	color: c_gray_lighten1()
	// 	font-size: .8em
	// &__forgot-action
	// 	cursor: pointer
	// 	&:hover
	// 		text-decoration: underline

	// &__register-text
	// 	margin-top: 50px
	// 	color: c_gray_lighten1()
	// 	font-size: .8em

	// &__register-action
	// 	align-self: flex-start
	// 	margin-top: 5px
	// 	color: c_action()
	// 	cursor: pointer
	// 	&:hover
	// 		text-decoration: underline

	// +media(screen(md))
	// 	align-items: center
	// 	&__form
	// 		margin-right: 0
</style>
