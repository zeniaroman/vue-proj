<template lang="pug">
.auth-register
  CForm.auth-register__form(onsubmit="return false")
    h1.form__title {{ $t('authRegister.form.title') }}
    label.form__label(
      @click="profileType = profileType == 0 ? 1 : 0"
    ) {{ $t('authRegister.form.labelProfileTitle') }}
    .form__radio-container
      .form__radio
        input#auth-register-profile-player.form__radio-button(
          v-model="profileType",
          type="radio",
          value="0"
        )
        label.form__label.form__radio-label(for="auth-register-profile-player") {{ $t('authRegister.form.labelOptionPlayer') }}
      .form__radio
        input#auth-register-profile-team.form__radio-button(
          v-model="profileType",
          type="radio",
          value="1"
        )
        label.form__label.form__radio-label(for="auth-register-profile-team") {{ $t('authRegister.form.labelOptionTeam') }}
    label.form__label(for="auth-register-new-email") {{ $t('authRegister.form.labelEmail') }}
    input#auth-register-new-email.form__input(
      v-model="newEmail",
      type="email",
      :placeholder="$t('authRegister.form.placeholderEmail')"
    )
    span.form__error(v-if="validator.newEmail.$error") {{ $t(`authRegister.form['${validator.newEmail.$errors[0].$validator}ErrorEmail']`) }}
    label.form__label(for="auth-register-new-password") {{ $t('authRegister.form.labelPassword') }}
    input#auth-register-new-password.form__input(
      v-model.trim="newPassword",
      type="password",
      :placeholder="$t('authRegister.form.placeholderPassword')"
    )
    span.form__error(v-if="validator.newPassword.$error") {{ $t(`authRegister.form['${validator.newPassword.$errors[0].$validator}ErrorPassword']`) }}

    label.form__label(for="auth-register-confirm-new-password") {{ $t('authRegister.form.labelConfirmPassword') }}
    input#auth-register-confirm-new-password.form__input(
      v-model.trim="confirmNewPassword",
      type="password",
      :placeholder="$t('authRegister.form.placeholderPassword')"
    )
    span.form__error(v-if="validator.confirmNewPassword.$error") {{ $t(`authRegister.form['${validator.confirmNewPassword.$errors[0].$validator}ErrorPassword']`) }}

    label.form__label-error {{ submitErrors.message }}
    input.form__input.form__submit(
      @click="submitHandler",
      type="submit",
      :value="$t('authRegister.form.submitButton')"
    )
</template>

<script>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import LogoUpload from "../../components/uploads/LogoUpload.vue";

import CForm from "@/components/CForm";

export default {
  name: "AuthRegister",
  components: {
    CForm,
    LogoUpload,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const profileType = ref(store.getters.authRegisterProfileType);
    const newEmail = ref(store.getters.authRegisterNewEmail);
    const newPassword = ref(null);
    const confirmNewPassword = ref(null);
    const submitErrors = reactive({
      message: "",
    });

    watch(
      () => newPassword.value,
      () => {
        confirmNewPassword.value = null;
      }
    );

    const userDataRules = {
      newEmail: {
        required,
        email,
      },
      newPassword: {
        required,
        isPassword(password) {
          if (password.length < 5) {
            return false;
          }

          console.log(password);
          const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/;
          return regex.test(password);
        },
      },
      confirmNewPassword: {
        required,
        sameAs: sameAs(newPassword),
      },
    };

    const validator = useVuelidate(userDataRules, {
      newEmail,
      newPassword,
      confirmNewPassword,
    });

    async function loginToWebapp() {
      await store.dispatch("login", {
        Email: newEmail.value,
        Password: newPassword.value,
      });
    }

    async function submitHandler() {
      validator.value.$touch();
      if (validator.value.$invalid) {
        return false;
      }

      store.commit("setAuthRegisterProfileType", profileType.value);
      store.commit("setAuthRegisterNewEmail", newEmail.value);

      await store
        .dispatch("authRegister", newPassword.value)
        .then((res) => {
          console.log(res);

          loginToWebapp();
          console.log(store.getters.getLoginStatus);
          console.log(store.getters.getAuthData);
          
        })
        .then(() => {
          router.push({ name: "AuthRegisterConfirm" });
        })
        .catch((err) => {
          console.log(err);
          submitErrors.message = err.response.data.message;
        });

      // console.log('ok')

      // console.log('Type:', profileType.value)
      // console.log('Email:', newEmail.value)
      // console.log('Password:', newPassword.value)
      // console.log('ConfirmPassword:', confirmNewPassword.value)

      // router.push({ name: 'AuthRegisterConfirm' });

      // router.push({ name: 'AuthRegister' + profileType.value });
    }

    return {
      profileType,
      newEmail,
      newPassword,
      confirmNewPassword,
      submitErrors,
      validator,
      submitHandler,
    };
  },
};
</script>

<style lang="sass">
.layout-auth .auth-register
  flex-direction: column
  align-items: flex-end

  .form
    margin-top: 50px
    margin-right: 15%

    &__radio-container
      display: flex
      margin-bottom: 30px
    &__label
      &-error
        color: red

  +media(screen(md))
    align-items: center
    .form
      margin-right: 0
</style>
