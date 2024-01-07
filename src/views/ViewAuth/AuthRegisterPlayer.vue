<template lang="pug">
.auth-register-player
  CForm.auth-register-player__form(
    v-if="store.getters.authRegisterNewEmail",
    onsubmit="return false"
  )
    h1.form__title {{ $t('authRegisterPlayer.form.title') }}
    .form__column
      label.form__label(for="auth-register-player-gaming-name") {{ $t('authRegisterPlayer.form.labelGamingName') }}
      input#auth-register-player-gaming-name.form__input(
        v-model="profileData.gamingName",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderGamingName')"
      )
      span.form__error(v-if="validator.gamingName.$error") {{ $t(`authRegisterPlayer.form['${validator.gamingName.$errors[0].$validator}GamingName']`) }}
      label.form__label(for="auth-register-player-full-name") {{ $t('authRegisterPlayer.form.labelFullName') }}
      input#auth-register-player-full-name.form__input(
        v-model="profileData.fullName",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderFullName')"
      )
      span.form__error(v-if="validator.fullName.$error") {{ $t(`authRegisterPlayer.form['${validator.fullName.$errors[0].$validator}FullName']`) }}

      LogoUpload(
        :formLabelText="$t('authRegisterPlayer.form.labelProfileAvatar')"
      )

      label.form__label(for="auth-register-player-date-of-birth") {{ $t('authRegisterPlayer.form.labelDateOfBirth') }}
      input#auth-register-player-date-of-birth.form__input(
        v-model="profileData.dateOfBirth",
        type="date",
        :placeholder="$t('authRegisterPlayer.form.placeholderDateOfBirth')"
      )
      span.form__error(v-if="validator.dateOfBirth.$error") {{ $t(`authRegisterPlayer.form['${validator.dateOfBirth.$errors[0].$validator}DateOfBirth']`) }}

      label.form__label(for="auth-register-player-phone-number") {{ $t('authRegisterPlayer.form.labelPhoneNumber') }}
      input#auth-register-player-phone-number.form__input(
        v-model="profileData.phoneNumber",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderPhoneNumber')"
      )
      span.form__error(v-if="validator.phoneNumber.$error") {{ $t(`authRegisterPlayer.form['${validator.phoneNumber.$errors[0].$validator}PhoneNumber']`) }}

      label.form__label(for="auth-register-player-street") {{ $t('authRegisterPlayer.form.labelAddress') }}
      textarea#auth-register-player-street.form__input.form__textarea(
        v-model="profileData.address.street",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderStreet')"
      )
      span.form__error(v-if="validator.address.street.$error") {{ $t(`authRegisterPlayer.form['${validator.address.street.$errors[0].$validator}Street']`) }}

      input#auth-register-player-city.form__input(
        v-model="profileData.address.city",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderCity')"
      )
      span.form__error(v-if="validator.address.city.$error") {{ $t(`authRegisterPlayer.form['${validator.address.city.$errors[0].$validator}City']`) }}

      .form__row
        .form__input-container
          input#auth-register-player-zipCode.form__input(
            v-model="profileData.address.zipCode",
            type="text",
            :placeholder="$t('authRegisterPlayer.form.placeholderZipCode')"
          )
          span.form__error(v-if="validator.address.zipCode.$error") {{ $t(`authRegisterPlayer.form['${validator.address.zipCode.$errors[0].$validator}ZipCode']`) }}

        .form__input-container
          select#auth-register-player-states.form__input(
            v-model="profileData.address.states",
            type="text",
            :placeholder="$t('authRegisterPlayer.form.placeholderStates')"
          )
            option(
              v-for="state in dropdownFilter.states",
              v-bind:value="state.stateId"
            ) {{ state.name }}

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

      label.form__label(for="auth-register-player-instagram") {{ $t('authRegisterPlayer.form.labelInstagram') }}
      input#auth-register-player-instagram.form__input(
        v-model="profileData.social.instagram",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderInstagram')"
      )

      span.form__error(v-if="validator.social.instagram.$error") {{ $t(`authRegisterPlayer.form['${validator.social.instagram.$errors[0].$validator}Instagram']`) }}
      input#auth-register-player-other-social.form__input(
        v-model="profileData.social.other",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderOtherSocial')"
      )

      input.form__input.form__submit(
        @click="submitHandler",
        type="submit",
        :value="$t('authRegisterPlayer.form.submitButton')"
      )

    .form__column
      label.form__label(for="auth-register-player-platform") {{ $t('authRegisterPlayer.form.labelPlatform') }}
      .auth-register-player__platform-container
        span.auth-register-player__platform-item.auth-register-player__platform-xbox(
          @click="profileData.platform = 'xbox'",
          :class="{ 'auth-register-player__platform-item_active': profileData.platform == 'xbox' }"
        ) xbox
        span.auth-register-player__platform-item.auth-register-player__platform-playstation(
          @click="profileData.platform = 'playstation'",
          :class="{ 'auth-register-player__platform-item_active': profileData.platform == 'playstation' }"
        ) playstation
      

      label.form__label(
        @click="profileData.streaming = !profileData.streaming"
      ) {{ $t('authRegisterPlayer.form.labelStreaming') }}
      .form__radio-container
        .form__radio
          input#auth-register-player-streaming-yes.form__radio-button(
            v-model="profileData.streaming",
            type="radio",
            :value="true"
          )
          label.form__label.form__radio-label(
            for="auth-register-player-streaming-yes"
          ) {{ $t('authRegisterPlayer.form.labelStreamingRadioYes') }}
        .form__radio
          input#auth-register-player-streaming-no.form__radio-button(
            v-model="profileData.streaming",
            type="radio",
            :value="false"
          )
          label.form__label.form__radio-label(
            for="auth-register-player-streaming-no"
          ) {{ $t('authRegisterPlayer.form.labelStreamingRadioNo') }}
      input#auth-register-player-streaming-link.form__input(
        v-model="profileData.streamingLink",
        type="text",
        :placeholder="$t('authRegisterPlayer.form.placeholderStreamingLink')",
        :disabled="!profileData.streaming"
      )
      span.form__error(v-if="validator.streamingLink.$error") {{ $t(`authRegisterPlayer.form['${validator.streamingLink.$errors[0].$validator}StreamingLink']`) }}

      label.form__label(
        @click="profileData.lookingForTeam = !profileData.lookingForTeam"
      ) {{ $t('authRegisterPlayer.form.labelLookingForTeam') }}
      .form__radio-container
        .form__radio
          input#auth-register-player-looking-for-team-yes.form__radio-button(
            v-model="profileData.lookingForTeam",
            type="radio",
            :value="true"
          )
          label.form__label.form__radio-label(
            for="auth-register-player-looking-for-team-yes"
          ) {{ $t('authRegisterPlayer.form.labelLookingForTeamRadioYes') }}
        .form__radio
          input#auth-register-player-looking-for-team-no.form__radio-button(
            v-model="profileData.lookingForTeam",
            type="radio",
            :value="false"
          )
          label.form__label.form__radio-label(
            for="auth-register-player-looking-for-team-no"
          ) {{ $t('authRegisterPlayer.form.labelLookingForTeamRadioNo') }}

      input.form__input.form__submit.form__submit_lg-show(
        @click="submitHandler",
        type="submit",
        :value="$t('authRegisterPlayer.form.submitButton')"
      )
</template>

<script>
import { reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import LogoUpload from "../../components/uploads/LogoUpload.vue";

import CForm from "@/components/CForm";

export default {
  name: "AuthRegisterPlayer",
  components: {
    CForm,
    LogoUpload,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const profileData = reactive({
      fullName: null,
      dateOfBirth: null,
      phoneNumber: null,
      address: {
        street: null,
        city: null,
        states: null,
        zipCode: null,
        country: "",
      },
      social: {
        instagram: null,
        other: null,
      },
      platform: "xbox",
      gamingName: null,
      streaming: false,
      streamingLink: null,
      lookingForTeam: false,
    });

    const dropdownFilter = reactive({
      countries: {},
      states: {},
    });

    const profileDataRules = {
      fullName: {
        required,
      },
      dateOfBirth: {
        
      },
      phoneNumber: {
        
      },
      address: {
        street: {
          
        },
        city: {
          
        },
        states: {
          
        },
        zipCode: {
          
        },
        country: {
          required,
        },
      },
      social: {
        instagram: {
          
        },
      },
      gamingName: {
        required
      },
      streamingLink: {
        required: requiredIf(() => {
          return profileData.streaming ? true : false;
        }),
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

    watch(
      () => profileData.streaming,
      () => {
        validator.value.streamingLink.$reset();
      }
    );

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
      router.push({ name: "PlayerProfile" });
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
.layout-auth .auth-register-player
  .auth-register-player
    &__form
      flex-wrap: wrap
      flex-direction: row
      max-width: 100%
      .form
        &__input
          max-width: 100%

          &__submit
            max-width: 50%

    &__platform-container
      display: flex
      margin-bottom: 20px
    &__platform-item
      display: flex
      align-items: flex-end
      justify-content: center
      width: 120px
      height: 80px
      margin-right: 20px
      padding: 10px
      color: c_placeholder()
      font-size: .7em
      background-color: c_input_bg()
      background-repeat: no-repeat
      background-position: 50% 30%
      border: 1px solid c_none()
      border-radius: 10px
      cursor: pointer
      &_active
        border-color: c_white()
    &__platform-xbox
      background-image: url('./../../assets/views/ViewAuth/AuthRegisterPlayer/xbox.png')
    &__platform-playstation
      background-image: url('./../../assets/views/ViewAuth/AuthRegisterPlayer/playstation.png')

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
