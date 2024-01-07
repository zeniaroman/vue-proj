<template lang="pug">
.auth-forgot-password
  CForm.auth-forgot-password__form(
    v-if="!alreadyRequested",
    onsubmit="return false"
  )
    h1.form__label {{ $t('authForgotPassword.form.title') }}
    label.form__label(for="auth-login-email") {{ $t('authForgotPassword.form.labelEmail') }}
    input#auth-login-email.form__input(
      v-model="userData.email",
      type="email",
      :placeholder="$t('authForgotPassword.form.placeholderEmail')"
    )
    span.form__error(v-if="validator.email.$error") {{ $t(`authLogin.form['${validator.email.$errors[0].$validator}ErrorEmail']`) }}
    input.form__input.form__submit.auth-forgotpassword__submit(
      @click="submitHandler",
      type="submit",
      :value="$t('authForgotPassword.form.submitButton')"
    )
  CForm.auth-forgot-password__form(v-else, onsubmit="return false")
    h1.form__label {{ $t('authForgotPassword.form.title') }}
    span.form__label {{ $t('authForgotPassword.form.instruction') }}
    input.form__input.form__submit.auth-forgotpassword__continuesubmit(
      @click="submitRedirectToLogin",
      type="submit",
      :value="$t('authForgotPassword.form.submitButtonReturn')"
    )
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";

import CForm from "@/components/CForm";

export default {
  name: "AuthForgotPassword",
  components: {
    CForm,
  },
  setup() {
    const router = useRouter();

    const userData = reactive({
      email: null,
    });

    const userDataRules = {
      email: {
        required,
        email,
      },
    };

    const alreadyRequested = ref(false);

    const validator = useVuelidate(userDataRules, userData);

    const submitHandler = async () => {
      validator.value.$touch();

      if (validator.value.$invalid) {
        return;
      }

      console.log("Submitted Email: ", userData.email);
      const postBody = {
        email: userData.email,
      };

      axios
        .post("auth/ForgetPassword", postBody)
        .then(() => {
          alreadyRequested.value = true;
        })
        .catch(() => console.log("Error"));
    };

    const submitRedirectToLogin = () => router.push({ name: "AuthLogin" });

    return {
      userData,
      validator,
      submitHandler,
      submitRedirectToLogin,
      alreadyRequested,
    };
  },
};
</script>

<style lang="sass">
.auth-forgot-password
    flex-direction: column
    align-items: flex-end

    &__form
        margin-top: 50px
        margin-right: 15%
</style>