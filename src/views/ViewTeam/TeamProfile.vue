<template lang="pug">
.team-profile(v-if="loaded")
  .team__section.team-profile__general
    .team-profile__top-line
      .team-profile__player
        img.team-profile__player-avatar(:src="profile('avatarUrl')")
        .team-profile__player-line
          span.team__field-label.team-profile__player-welcome {{ $t('teamProfile.general.welcome') }}
          span.team-profile__player-name {{ profile('teamName') }}
      span.team-profile__edit-profile(v-if="!editProfile" @click="editProfile = !editProfile") {{ $t('teamProfile.general.editProfile') }}
      span.team-profile__edit-profile.team-profile__edit-profile_save(v-else @click="saveProfileHandler") Save
    LogoUpload.team-profile__logo-upload(v-if="editProfile" @logoChanged="prepareNewLogo" :currentLogo="profile('avatarUrl')")
    span.team__title {{ $t('teamProfile.general.title') }}
    .team-profile__column
      span.team__field-label {{ $t('teamProfile.general.labelTeamName') }}
      span.team__field-data(@input="editProfileHandler($event, 'teamName')" :contenteditable="editProfile") {{ profile('teamName') }}

      span.team__field-label {{ $t('teamProfile.general.labelContactPerson') }}
      span.team__field-data(@input="editProfileHandler($event, 'contactName')" :contenteditable="editProfile") {{ profile('contactName') }}

      span.team__field-label {{ $t('teamProfile.general.labelAddress') }}
      p.team__field-data 
        span(style="width: 100%" @input="editProfileHandler($event, 'street')" :contenteditable="editProfile") {{ profile('street') }}
        br
        span(@input="editProfileHandler($event, 'zipCode')" :contenteditable="editProfile") {{ profile('zipCode') }}
        span &nbsp;
        span(@input="editProfileHandler($event, 'city')" :contenteditable="editProfile") {{ profile('city') }}  

      span.team__field-label {{ $t('teamProfile.general.labelStates') }}
      span.team__field-data(v-if="!editProfile") {{ profile('stateName') }}
      select.team__field-data.team-profile__field-data-select(
        v-else,
        @change="editProfileSelectHandler($event, 'stateId')",
        v-model="profileData.result.team['stateId']"
      )
        option(
          v-for="state in dropdownFilter.states",
          v-bind:value="state.stateId"
        ) {{ state.name }}

      span.team__field-label {{ $t('teamProfile.general.labelCountry') }}
      span.team__field-data(v-if="!editProfile") {{ dropdownFilter.countries[profile('countryId') -1].countryName }}
      select.team__field-data.team-profile__field-data-select(
        v-else,
        @change="editProfileSelectHandler($event, 'countryId')",
        v-model="profileData.result.team['countryId']"
      )
        option(
          v-for="country in dropdownFilter.countries",
          v-bind:value="country.countryId"
        ) {{ country.countryName }}
      

    .team-profile__column
      span.team__field-label {{ $t('teamProfile.general.labelEmail') }}
      span.team__field-data(@input="editProfileHandler($event, 'contactEmail')" :contenteditable="editProfile") {{ profile('contactEmail') }}

      span.team__field-label {{ $t('teamProfile.general.labelPhoneNumber') }}
      span.team__field-data(@input="editProfileHandler($event, 'phoneNumber')" :contenteditable="editProfile") {{ profile('phoneNumber') }}
      span.team__field-label {{ $t('teamProfile.general.labelWebsite') }}
      span.team__field-data(@input="editProfileHandler($event, 'website')" :contenteditable="editProfile") {{ profile('website') }}
      

      
      //- span.team__field-label {{ $t('teamProfile.general.labelInstagramLink') }}
      //- span.team__field-data(@input="editProfileHandler($event, 'instagramLink')" :contenteditable="editProfile") {{ profile('instagramLink') }}

  .team__section.team-profile__credits.credits
    span.team__field-label {{ $t('teamProfile.credits.title') }}
    span.credits__amount {{ credits() }}
    span.credits__description {{ $t('teamProfile.credits.description') }}
    button.credits__buy(@click="$router.push({name: 'TeamCredits'})") {{ $t('teamProfile.credits.buy') }}
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";

import LogoUpload from "@/components/uploads/LogoUpload";

export default {
  name: "TeamProfile",
  components: {
    LogoUpload
  },
  setup() {
    const store = useStore();

    const loaded = ref(false);
    const editProfile = ref(false);
    const profileData = reactive({});
    const profileDataOrigin = reactive({});
    const dropdownFilter = reactive({
      countries: {},
      states: {},
    });

    onMounted(async () => {
      await store
        .dispatch("getCountriesWithStates")
        .then((res) => {
          dropdownFilter.countries = res.data.countries;
        })
        .catch((err) => {
          console.log("Error: ", err);
        });

      await store
        .dispatch("getProfile")
        .then(res => {
          console.log(res.data)
          profileData.result = res.data;
          profileDataOrigin.result = JSON.parse(JSON.stringify(profileData.result));
          
          dropdownFilter.states =
            dropdownFilter.countries[
              profileData.result.team["countryId"] - 1
            ].states;

        })
        .catch(err => {
          console.log("Error: ", err);
        });

      loaded.value = true;
    });

    const profileOrigin = key => {
      return profileDataOrigin.result.team[key] !== null
        ? profileDataOrigin.result.team[key] : '-';
    };

    const profile = key => {
      return profileData.result.team[key] !== null
        ? profileData.result.team[key] : '-';
    };

    const credits = () => {
      return profileData.result.credits;
    };

    const saveProfileHandler = async () => {
      let dataChanged = false;
      editProfile.value = false;

      Object.keys(profileDataOrigin.result.team).forEach(fieldKey => {
        if(profileOrigin(fieldKey) != profile(fieldKey)) {
          console.log()
          profileDataOrigin.result = profileData.result
          dataChanged = true;
        }
      })

      if(!dataChanged) return;
      store.commit('setTeamProfileData', profileData.result.team)
      await store.dispatch('teamProfileUpdate')
    };

    const editProfileHandler = (event, key) => {
      console.log(profileData)
      profileData.result.team[key] = event.target.innerHTML.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<p><br><\/p>/gi, '').replaceAll(/<br>/gi, '')
    }

    const editProfileSelectHandler = (event, key) => {
      if (key == "countryId") {
        changeCountry();
      } else if (key == "stateId") {
        console.log("States: ", dropdownFilter.states[0]);
        console.log("STATENAME: ",dropdownFilter.states[profileData.result.team['stateId']-1 ].name);

        profileData.result.team['stateName'] =
          dropdownFilter.states[profileData.result.team['stateId'] -1].name;
      }

      profileData.result.team[key] = event.target.value;
      console.log("fff: ", profile("isSearching"));
    };

    const prepareNewLogo = logoUrl => {
      profileData.result.team.avatarUrl = logoUrl;
    }

    const changeCountry = () => {
      profileData.result.team["stateId"] = null;
      profileData.result.team["stateName"] = null;
      dropdownFilter.states =
        dropdownFilter.countries[
          profileData.result.team["countryId"] - 1
        ].states;
    
    };

    return {
      loaded,
      editProfile,
      saveProfileHandler,
      editProfileHandler,
      editProfileSelectHandler,
      prepareNewLogo,
      profile,
      profileData,
      credits,
      dropdownFilter,
      changeCountry,
    };
  },
};
</script>

<style lang="sass">
.team-profile
    display: flex
    &__general
        flex: 1
        display: flex
        flex-wrap: wrap
        margin-right: 20px
        padding-bottom: 10px
        background-image: url('./../../assets/bg-main.png'), linear-gradient(c_black(), c_dark_blue_bg())
        background-repeat: no-repeat
    &__top-line
        display: flex
        justify-content: space-between
        width: 100%
        margin-bottom: 20px
    &__logo-upload
      margin-bottom: 40px
    &__player
        display: flex
        margin: 0 20px 20px 0
        &-avatar
            width: 50px
            height: 50px
            margin-right: 20px
            background: c_input_bg()
            border-radius: 3px
        &-line
            display: flex
            flex-direction: column
            justify-content: space-between
        &-welcome
        &-name
            font-size: 1.5em
    &__edit-profile
        align-self: flex-start
        padding: 10px 20px
        color: cmb(c_white(), 20)
        font-size: .75em
        background: c_button_bg()
        border-radius: 5px
        cursor: pointer
        &_save
          color: c_white()
          background: c_action()
    &__column
        display: flex
        flex-direction: column
        width: 50%
        min-width: 180px
        padding: 0 20px 0 0
    &__field-data-select
        background: c_button_bg()
        border-radius: 5px
    &__credits
        align-self: flex-start
        display: flex
        flex-direction: column
        width: 100%
        max-width: 300px
        background: c_black() url('./../../assets/bg-main.png')
        background-size: cover
        .credits
            &__amount
                margin-bottom: 20px
                font-size: 4em
            &__description
                margin-bottom: 20px
                font-size: .8em
                color: c_text_gray()
            &__buy
                padding: 10px 20px
                text-align: center
                color: cmb(c_white(), 20)
                font-size: .75em
                background: c_button_bg()
                border: none
                border-radius: 5px
                cursor: pointer

    +media(screen(xl))
        flex-direction: column
        &__general
            margin: 0 0 20px

    +media(screen(sm))
        &__top-line
            flex-direction: column
        &__credits
            max-width: none
</style>
