<template lang="pug">
.auth-reset-password
  CForm.auth-reset-password__form(
    v-if="!alreadyRequested",
    onsubmit="return false"
  )
    h1.form__label {{ $t('authResetPassword.form.title') }}
    label.form__label(for="auth-reset-password-newpassword") {{ $t('authResetPassword.form.labelNewPassword') }}
    input#auth-reset-password-newpassword.form__input(
      v-model.trim="newPassword",
      type="password",
      :placeholder="$t('authResetPassword.form.placeholderNewPassword')"
    )
    span.form__error(v-if="validator.newPassword.$error") {{ $t(`authResetPassword.form['${validator.newPassword.$errors[0].$validator}ErrorPassword']`) }}
    label.form__label(for="auth-reset-password-confirm-newpassword") {{ $t('authResetPassword.form.labelConfirmNewPassword') }}
    input#auth-reset-password-confirm-newpassword.form__input(
      v-model.trim="confirmNewPassword",
      type="password",
      :placeholder="$t('authResetPassword.form.placeholderConfirmNewPassword')"
    )
    span.form__error(v-if="validator.confirmNewPassword.$error") {{ $t(`authResetPassword.form['${validator.confirmNewPassword.$errors[0].$validator}ErrorConfirmPassword']`) }}
    input.form__input.form__submit(
      @click="submitHandler",
      type="submit",
      :value="$t('authResetPassword.form.submitButton')"
    )
    span.form__error(v-if="validator.userEmail.$error") {{ $t(`authResetPassword.form['${validator.userEmail.$errors[0].$validator}ErrorEmail']`) }}
    span.form__error(v-if="validator.userToken.$error") {{ $t(`authResetPassword.form['${validator.userToken.$errors[0].$validator}ErrorToken']`) }}

  CForm.auth-forgot-password__form(v-else, onsubmit="return false")
    h1.form__label {{ $t('authResetPassword.form.title') }}
    span.form__label {{ $t('authResetPassword.form.instruction') }}
    input.form__input.form__submit.auth-resetpassword__continuesubmit(
      @click="submitRedirectToLogin",
      type="submit",
      :value="$t('authResetPassword.form.submitButtonReturn')"
    )
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, email } from "@vuelidate/validators";
import axios from "axios";

import CForm from "@/components/CForm";

export default {
  name: "AuthResetPassword",
  components: {
    CForm,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const newPassword = ref(null);
    const confirmNewPassword = ref(null);

    const userEmail = ref(route.query.email);
    const userToken = ref(route.query.token);
    const alreadyRequested = ref(false);

    const userDataRules = {
      userEmail: {
        required,
        email,
      },
      userToken: {
        required,
      },
      newPassword: {
        required,
      },
      confirmNewPassword: {
        required,
        sameAs: sameAs(newPassword),
      },
    };

    onMounted(() => {
      console.log(validator);
    });

    watch(
      () => newPassword.value,
      () => {
        confirmNewPassword.value = null;
      }
    );

    const validator = useVuelidate(userDataRules, {
      newPassword,
      confirmNewPassword,
      userEmail,
      userToken,
    });

    const submitHandler = () => {
      validator.value.$touch();
      if (validator.value.$invalid) {
        return;
      }

      const postBody = {
        email: userEmail.value,
        token: userToken.value,
        newPassword: newPassword.value,
        confirmPassword: confirmNewPassword.value,
      };

      axios
        .post("auth/ResetPassword", postBody)
        .then(() => {
          alreadyRequested.value = true;
        })
        .error((err) => {
          console.log(err);
        });
    };

    const submitRedirectToLogin = () => router.push({ name: "AuthLogin" });

    return {
      newPassword,
      confirmNewPassword,
      validator,
      submitHandler,
      submitRedirectToLogin,
      alreadyRequested,
    };
  },
};
</script>

<style lang="sass">
.auth-reset-password
    flex-direction: column
    align-items: flex-end

    &__form
        margin-top: 50px
        margin-right: 15%
</style>