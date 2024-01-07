<template lang="pug">
.auth-register-team
  CForm.auth-register-team__form(
    v-if="store.getters.authRegisterNewEmail",
    onsubmit="return false"
  )
    h1.form__title {{ $t('authRegisterTeam.form.title') }}
    .form__column
      label.form__label(for="auth-register-team-name") {{ $t('authRegisterTeam.form.labelTeamName') }}
      input#auth-register-team-name.form__input(
        v-model="profileData.teamName",
        type="text",
        :placeholder="$t('authRegisterTeam.form.placeholderTeamName')"
      )
      span.form__error(v-if="validator.teamName.$error") {{ $t(`authRegisterTeam.form['${validator.teamName.$errors[0].$validator}TeamName']`) }}

      LogoUpload(
        :formLabelText="$t('authRegisterTeam.form.labelProfileAvatar')",        
      )

      label.form__label(for="auth-register-team-street") {{ $t('authRegisterTeam.form.labelAddress') }}
      textarea#auth-register-team-street.form__input.form__textarea(
        v-model="profileData.address.street",
        type="text",
        :placeholder="$t('authRegisterTeam.form.placeholderStreet')"
      )
      span.form__error(v-if="validator.address.street.$error") {{ $t(`authRegisterTeam.form['${validator.address.street.$errors[0].$validator}Street']`) }}

      input#auth-register-team-city.form__input(
        v-model="profileData.address.city",
        type="text",
        :placeholder="$t('authRegisterTeam.form.placeholderCity')"
      )
      span.form__error(v-if="validator.address.city.$error") {{ $t(`authRegisterTeam.form['${validator.address.city.$errors[0].$validator}City']`) }}

      .form__row
        .form__input-container
          select#auth-register-team-states.form__input(
            v-model="profileData.address.states",
            type="text",
            :placeholder="$t('authRegisterTeam.form.placeholderStates')"
          )
            option(
              v-for="state in dropdownFilter.states",
              v-bind:value="state.stateId"
            ) {{ state.name }}
          span.form__error(v-if="validator.address.states.$error") {{ $t(`authRegisterTeam.form['${validator.address.states.$errors[0].$validator}States']`) }}
        .form__input-container
          input#auth-register-team-zipCode.form__input(
            v-model="profileData.address.zipCode",
            type="text",
            :placeholder="$t('authRegisterTeam.form.placeholderZipCode')"
          )
          span.form__error(v-if="validator.address.zipCode.$error") {{ $t(`authRegisterTeam.form['${validator.address.zipCode.$errors[0].$validator}ZipCode']`) }}

      select#auth-register-player-country.form__input.form__select(
        v-model="profileData.address.country",
        @change="changeCountry"
      )
        option(value="", selected, disabled) {{ $t('authRegisterPlayer.form.placeholderCountry') }}
        option(
          v-for="country in dropdownFilter.countries",
          v-bind:value="country.countryId"
        ) {{ country.countryName }}
      span.form__error(v-if="validator.address.country.$error") {{ $t(`authRegisterPlayer.form['${validator.address.country.$errors[0].$validator}Country']`) }}
      input.form__input.form__submit(
        @click="submitHandler",
        type="submit",
        :value="$t('authRegisterTeam.form.submitButton')"
      )

    .form__column
      label.form__label(for="auth-register-team-contact-person") {{ $t('authRegisterTeam.form.labelContactPerson') }}
      input#auth-register-team-contact-person.form__input(
        v-model="profileData.contactPerson",
        type="text",
        :placeholder="$t('authRegisterTeam.form.placeholderContactPerson')"
      )
      span.form__error(v-if="validator.contactPerson.$error") {{ $t(`authRegisterTeam.form['${validator.contactPerson.$errors[0].$validator}ContactPerson']`) }}

      label.form__label(for="auth-register-team-email") {{ $t('authRegisterTeam.form.labelEmail') }}
      input#auth-register-team-email.form__input(
        v-model="profileData.email",
        type="text",
        :placeholder="$t('authRegisterTeam.form.placeholderEmail')"
      )
      span.form__error(v-if="validator.email.$error") {{ $t(`authRegisterTeam.form['${validator.email.$errors[0].$validator}Email']`) }}

      label.form__label(for="auth-register-team-phone-number") {{ $t('authRegisterTeam.form.labelPhoneNumber') }}
      input#auth-register-team-phone-number.form__input(
        v-model="profileData.phoneNumber",
        type="text",
        :placeholder="$t('authRegisterTeam.form.placeholderPhoneNumber')"
      )
      span.form__error(v-if="validator.phoneNumber.$error") {{ $t(`authRegisterTeam.form['${validator.phoneNumber.$errors[0].$validator}PhoneNumber']`) }}

      label.form__label(for="auth-register-website") {{ $t('authRegisterTeam.form.labelWebsite') }}
      input#auth-register-website.form__input(
        v-model="profileData.website",
        type="text",
        :placeholder="$t('authRegisterTeam.form.placeholderWebsite')"
      )

      input.form__input.form__submit.form__submit_lg-show(
        @click="submitHandler",
        type="submit",
        :value="$t('authRegisterTeam.form.submitButton')"
      )
</template>

<script>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import LogoUpload from "../../components/uploads/LogoUpload.vue";

import CForm from "@/components/CForm";

export default {
  name: "formRegisterTeam",
  components: {
    CForm,
    LogoUpload,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const profileData = reactive({
      teamName: null,
      address: {
        street: null,
        city: null,
        states: null,
        zipCode: null,
        country: "",
      },
      contactPerson: null,
      email: store.getters.authRegisterNewEmail,
      phoneNumber: null,
      website: null,
    });

    const dropdownFilter = reactive({
      countries: {},
      states: {},
    });

    const profileDataRules = {
      teamName: {
        required,
      },
      address: {
        street: {
          required,
        },
        city: {
          required,
        },
        states: {
          required,
        },
        zipCode: {
          required,
        },
        country: {
          required,
        },
      },
      contactPerson: {
        required,
      },
      email: {
        required,
      },
      phoneNumber: {
        required,
      },
    };

    const validator = useVuelidate(profileDataRules, profileData);

    onMounted(async () => {
      await store
        .dispatch("getCountriesWithStates")
        .then((res) => {
          dropdownFilter.countries = res.data.countries;
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    });

    if (!store.getters.authRegisterNewEmail) {
      router.push({ name: "AuthRegister" });
    }

    const changeCountry = () => {
      dropdownFilter.states =
        dropdownFilter.countries[profileData.address.country - 1].states;
    };

    function submitHandler() {
      validator.value.$touch();

      console.log(profileData);

      if (validator.value.$invalid) {
        return;
      }

      console.log(profileData);
      router.push({ name: "TeamProfile" });
    }

    return {
      store,
      profileData,
      validator,
      dropdownFilter,
      submitHandler,
      changeCountry,
    };
  },
};
</script>

<style lang="sass">
.layout-auth .auth-register-team
  .auth-register-team
    &__form
      flex-wrap: wrap
      flex-direction: row
      max-width: 100%

      .form
        &__input
          max-width: 100%

          &__submit
            max-width: 50%

    +media(screen(lg))
      .form
        align-items: center
        flex-direction: column
        &__title
          text-align: center
          &__column
            width: 100%
            max-width: 600px
            padding-right: 0
            &__submit
              display: none
              &_lg-show
                display: inline-block

    +media(screen(sm))
</style>
