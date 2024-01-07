<template lang="pug">
.auth-login
  CForm.auth-login__form(onsubmit="return false")
    h1.form__title {{ $t('authLogin.form.title') }}
    label.form__label(for="auth-login-email") {{ $t('authLogin.form.labelEmail') }}
    input#auth-login-email.form__input(
      v-model="userData.email",
      type="email",
      :placeholder="$t('authLogin.form.placeholderEmail')"
    )
    span.form__error(v-if="validator.email.$error") {{ $t(`authLogin.form['${validator.email.$errors[0].$validator}ErrorEmail']`) }}
    label.form__label(for="auth-login-password") {{ $t('authLogin.form.labelPassword') }}
    input#auth-login-password.form__input(
      v-model="userData.password",
      type="password",
      :placeholder="$t('authLogin.form.placeholderPassword')"
    )
    span.form__error(v-if="validator.password.$error") {{ $t(`authLogin.form['${validator.password.$errors[0].$validator}ErrorPassword']`) }}
    input.form__input.form__submit.auth-login__submit(
      ref="loginSubmit"
      @click="submitHandler",
      type="submit",
      :value="$t('authLogin.form.submitButton')"
    )
    span.auth-login__forgot-text {{ $t('authLogin.form.forgotText') }}&nbsp;
      span.auth-login__forgot-action(@click="$router.push({ name: 'AuthForgotPassword'})") {{ $t('authLogin.form.forgotAction') }}
    span.auth-login__register-text {{ $t('authLogin.form.registerText') }}
    span.auth-login__register-action(
      @click="$router.push({ name: 'AuthRegister' })"
    ) {{ $t('authLogin.form.registerAction') }}
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import CForm from '@/components/CForm';

export default {
  name: "AuthLogin",
  components: {
    CForm
  },
  setup() {
    const loginSubmit = ref();
    const router = useRouter();
    const store = useStore();
    const userData = reactive({
      email: null,
      password: null,
    });

    const userDataRules = {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };

    const validator = useVuelidate(userDataRules, userData);

    async function submitHandler() {
      validator.value.$touch();

      if (validator.value.$invalid) {
        return;
      }

      loginSubmit.value.disabled = true;

      await store.dispatch("login", {
        Email: userData.email,
        Password: userData.password,
      });

      console.log(store.getters.getLoginStatus);
      console.log(store.getters.getAuthData);

      if (store.getters.getLoginStatus === "success") {
        router.push({ name: store.getters.getAuthData.userRole + "Profile" });
      } else {
        userData.password = null;
        loginSubmit.value.disabled = false;
        alert("failed to login");
      }

      console.log("Email: ", userData.email);
      console.log("Password: ", userData.password);
    }

    return {
      userData,
      validator,
      loginSubmit,
      submitHandler,
    };
  },
};
</script>

<style lang="sass">
.auth-login
	flex-direction: column
	align-items: flex-end

	&__form
		margin-top: 50px
		margin-right: 15%

	.form__submit.auth-login__submit
		margin-bottom: 10px

	&__forgot-text
		color: c_gray_lighten1()
		font-size: .8em
	&__forgot-action
		cursor: pointer
		&:hover
			text-decoration: underline

	&__register-text
		margin-top: 50px
		color: c_gray_lighten1()
		font-size: .8em

	&__register-action
		align-self: flex-start
		margin-top: 5px
		color: c_action()
		cursor: pointer
		&:hover
			text-decoration: underline

	+media(screen(md))
		align-items: center
		&__form
			margin-right: 0
</style>
