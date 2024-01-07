<template lang="pug">
.player-profile(v-if="loaded")
  .player__section.player-profile__general
    .player-profile__top-line
      .player-profile__player       
        img.player-profile__player-avatar(:src="profile('avatarUrl')")
        
        .player-profile__player-line
          span.player__field-label.player-profile__player-welcome {{ $t('playerProfile.general.welcome') }}
          span.player-profile__player-name(
            @input="editProfileHandler($event, 'nickName')"
            :contenteditable="editProfile"
          ) {{ profile('nickName') }}
      span.player-profile__edit-profile(
        v-if="!editProfile"
        @click="editProfile = !editProfile"
      ) {{ $t('playerProfile.general.editProfile') }}
      span.player-profile__edit-profile.player-profile__edit-profile_save(
        v-else,
        @click="saveProfileHandler"
      ) Save
    LogoUpload.player-profile__logo-upload(v-if="editProfile" @logoChanged="prepareNewLogo" :currentLogo="profile('avatarUrl')")
    span.player__title {{ $t('playerProfile.general.title') }}
    .player-profile__column
      span.player__field-label {{ $t('playerProfile.general.labelFullName') }}
      span.player__field-data(
        @input="editProfileHandler($event, 'fullname')"
        :contenteditable="editProfile"
      ) {{ profile('fullname') }}

      span.player__field-label {{ $t('playerProfile.general.labelDateOfBirth') }}
      span.player__field-data(
        v-if="!editProfile"
      ) {{ profile('dateOfBirth').split('T')[0] }}
      input.player__field-data.player-profile__input-date-of-birth(v-else @change="editProfileDateHandler($event)" type="date" :value="profile('dateOfBirth').split('T')[0]")

      span.player__field-label {{ $t('playerProfile.general.labelStreet') }}      
      span.player__field-data(
        @input="editProfileHandler($event, 'street')"
        :contenteditable="editProfile"
      ) {{ profile('street') }}

      span.player__field-label {{ $t('playerProfile.general.labelZipCode') }}      
      span.player__field-data(
        @input="editProfileHandler($event, 'zipCode')"
        :contenteditable="editProfile"
      ) {{ profile('zipCode') }}

      span.player__field-label {{ $t('playerProfile.general.labelCity') }}      
      span.player__field-data(
        @input="editProfileHandler($event, 'city')"
        :contenteditable="editProfile"
      ) {{ profile('city') }}

      span.player__field-label {{ $t('playerProfile.general.labelCountry') }}
      span.player__field-data(v-if="!editProfile") {{ dropdownFilter.countries[profile('countryId') -1] != null ? dropdownFilter.countries[profile('countryId') -1].countryName : null  }}
      select.player__field-data.player-profile__field-data-select(
        v-else
        @change="editProfileSelectHandler($event, 'countryId')"
        v-model="profileData.result.playerData['countryId']"
      )
        option(
          v-for="country in dropdownFilter.countries"
          v-bind:value="country.countryId"
        ) {{ country.countryName }}

      span.player__field-label {{ $t('playerProfile.general.labelStates') }}
      span.player__field-data(v-if="!editProfile") {{ profile('stateName') }}
      select.player__field-data.player-profile__field-data-select(
        v-else
        @change="editProfileSelectHandler($event, 'stateId')"
        v-model="profileData.result.playerData['stateId']"
      )
        option(
          v-for="state in dropdownFilter.states"
          v-bind:value="state.stateId"
        ) {{ state.name }}

    .player-profile__column
      span.player__field-label {{ $t('playerProfile.general.labelEmail') }}
      span.player__field-data {{ $store.getters.getAuthData.userId }}

      span.player__field-label {{ $t('playerProfile.general.labelPhoneNumber') }}
      span.player__field-data(
        @input="editProfileHandler($event, 'phoneNumber')"
        :contenteditable="editProfile"
      ) {{ profile('phoneNumber') }}

      span.player__field-label {{ $t('playerProfile.general.labelStreamingLink') }}
      span.player__field-data(
        @input="editProfileHandler($event, 'twitchName')"
        :contenteditable="editProfile"
      ) {{ profile('twitchName') }}

      span.player__field-label {{ $t('playerProfile.general.labelInstagramLink') }}
      span.player__field-data(
        @input="editProfileHandler($event, 'instagramName')"
        :contenteditable="editProfile"
      ) {{ profile('instagramName') }}

      span.player__field-label {{ $t('playerProfile.general.labelOtherLinks') }}
      span.player__field-data -

    .player-profile__column
      span.player__field-label {{ $t('playerProfile.general.labelPlatformPlaystationGamingId') }}
      span.player__field-data(
        @input="editProfileHandler($event, 'playstationGamingId')"
        :contenteditable="editProfile"
      ) {{ profile('playstationGamingId') }}

      span.player__field-label {{ $t('playerProfile.general.labelPlatformXboxGamingId') }}
      span.player__field-data(
        @input="editProfileHandler($event, 'xboxGamingId')"
        :contenteditable="editProfile"
      ) {{ profile('xboxGamingId') }}

      span.player__field-label {{ $t('playerProfile.general.labelEsportClub') }}
      span.player__field-data(v-if="!editProfile") {{ profileBool('isSearching') ? 'Yes' : 'No' }}
      select.player__field-data.player-profile__field-data-select(
        v-else,
        @change="editProfileSelectHandler($event, 'isSearching')"
      )
        option(value="1", :selected="profileBool('isSearching')") Yes
        option(value="0", :selected="!profileBool('isSearching')") No

      span.player__field-label {{ $t('playerProfile.general.labelStreaming') }}
      span.player__field-data(v-if="!editProfile") {{ profileBool('isStreamer') ? 'Yes' : 'No' }}
      select.player__field-data.player-profile__field-data-select(
        v-else,
        @change="editProfileSelectHandler($event, 'isStreamer')"
      )
        option(value="1", :selected="profileBool('isStreamer')") Yes
        option(value="0", :selected="!profileBool('isStreamer')") No

  .player-profile__statistics
    .player__section.player-profile__statistics-general
      span.player__title {{ game('gameName') }} {{ $t('playerProfile.statisticsGeneral.title') }}
      .player-profile__column
        span.player__field-label {{ $t('playerProfile.statisticsGeneral.currentPosition') }}
        span.player__field-data {{ gameRecords('latestRank') }}
          sup.player__field-data-sup TH
        span.player__field-label {{ $t('playerProfile.statisticsGeneral.totalMatchPlayed') }}
        span.player__field-data {{ gameRecords('totalMatchesPlayed') }}
        span.player__field-label {{ $t('playerProfile.statisticsGeneral.biggestWin') }}
        span.player__field-data {{ gameRecords('maximumWinsReached') }}
      .player-profile__column
        span.player__field-label {{ $t('playerProfile.statisticsGeneral.highestPosition') }}
        span.player__field-data {{ gameRecords('bestRank') }}
          sup.player__field-data-sup TH
        span.player__field-label {{ $t('playerProfile.statisticsGeneral.totalWins') }}
        span.player__field-data {{ gameRecords('totalWins') }}   
      .player-profile__column.player-profile__column_middle
        span.player__field-label {{ $t('playerProfile.statisticsGeneral.totalLoss') }}
        span.player__field-data {{ gameRecords('totalLosses') }}
      button.player-profile__upload-new-data(
        @click="$router.push({ name: 'PlayerUploadNewData' })"
      ) {{ $t('playerProfile.statisticsGeneral.uploadNewData') }}

    .player__section.player-profile__statistics-monthly(
      v-if="game('gameName')"
    )
      span.player__title.player-profile__statistics-monthly-title {{ game('gameName') }} {{ $t('playerProfile.statisticsMonthly.title') }}
      .player-profile__statistics-monthly-by-platforms
        span.player-profile__statistics-monthly-by-platform(
          v-for="(statisticsMonthlyByPlatformResults, key) in game('gamePlatformResults')",
          @click="statisticsMonthlyByPlatformHandler(key)",
          :class="statisticsMonthlyByPlatformActiveClassHandler(key)",
          :key="'key-' + key"
        ) {{ statisticsMonthlyByPlatformResults.platformName }}
      .player-profile__statistics-monthly-by-months
        span.player-profile__statistics-monthly-by-months-month(
          v-for="(statisticsMonthlyData, key) in chartData()",
          @click="statisticsMonthlyDataHandler(key)",
          :key="'key-' + key",
          :class="statisticsMonthlyDataActiveClassHandler(key)"
        ) {{ statisticsMonthlyData.startDate.split('T')[0] }}
      .player-profile__statistics-monthly-field-wrap
        span.player-profile__statistics-monthly-field-data {{ chartData()[statisticsMonthlyKey].totalMatchesPlayed }}
        span.player__field-label.player-profile__statistics-monthly-field-label total play
      .player-profile__statistics-monthly-field-wrap
        span.player-profile__statistics-monthly-field-data.player-profile__statistics-monthly-field-data_wins {{ chartData()[statisticsMonthlyKey].totalWins }}
        span.player__field-label.player-profile__statistics-monthly-field-label wins
      .player-profile__statistics-monthly-field-wrap
        span.player-profile__statistics-monthly-field-data.player-profile__statistics-monthly-field-data_loss {{ chartData()[statisticsMonthlyKey].totalLosses }}
        span.player__field-label.player-profile__statistics-monthly-field-label loss
      .player-profile__statistics-monthly-chart-wrap(
        v-for="statisticsMonthlyChartUpdate in statisticsMonthlyChartUpdates",
        :key="statisticsMonthlyChartUpdate.name"
      )
        component(
          :is="statisticsMonthlyChartUpdate",
          :doughnutData="chartData()[statisticsMonthlyKey]"
        )
</template>

<script>
import { ref, reactive, onMounted, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import LogoUpload from "../../components/uploads/LogoUpload.vue";

export default {
  name: "PlayerProfile",
  components: {
    LogoUpload,
    StatisticsMonthlyChart: defineAsyncComponent(() =>
      import("@/components/charts/StatisticsMonthlyChart")
    ),
  },
  setup() {
    const store = useStore();

    const loaded = ref(false);
    const editProfile = ref(false);
    const profileData = reactive({});
    const profileDataOrigin = reactive({});

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
        .dispatch("getPlayerProfile")
        .then((res) => {
          profileData.result = res.data;
          profileDataOrigin.result = JSON.parse(
            JSON.stringify(profileData.result)
          );
          dropdownFilter.states =
            dropdownFilter.countries[
              profileData.result.playerData["countryId"] - 1
            ].states;
          statisticsMonthlyChartUpdater();
        })
        .catch((err) => {
          console.log(err);
        });

      loaded.value = true;
    });

    const dropdownFilter = reactive({
      countries: {},
      states: {},
    });

    const saveProfileHandler = async () => {
      let dataChanged = false;
      editProfile.value = false;

      Object.keys(profileDataOrigin.result.playerData).forEach((fieldKey) => {
        if (profileOrigin(fieldKey) != profile(fieldKey)) {
          profileDataOrigin.result = profileData.result;
          dataChanged = true;
        }
      });

      if (!dataChanged) return;

      await store.dispatch(
        "playerProfileUpdate",
        profileData.result.playerData
      );
    };

    const editProfileHandler = (event, key) => {
      profileData.result.playerData[key] = event.target.innerHTML
        .replace(/&nbsp;/gi, "")
        .replace(/<div><br><\/div>/gi, "")
        .replace(/<p><br><\/p>/gi, "")
        .replaceAll(/<br>/gi, "");
    };

    const editProfileDateHandler = event => {
      profileData.result.playerData.dateOfBirth = event.target.value;
    }

    const editProfileSelectHandler = (event, key) => {
      if (key == "countryId") {
        changeCountry();
      } else if (key == "stateId") {
        console.log("States: ", dropdownFilter.states[0]);
        console.log("STATENAME: ",dropdownFilter.states[profileData.result.playerData['stateId']-1 ].name);

        profileData.result.playerData['stateName'] =
          dropdownFilter.states[profileData.result.playerData['stateId'] -1].name;
      }

      profileData.result.playerData[key] = event.target.value;
    };

    const prepareNewLogo = logoUrl => {
      profileData.result.playerData.avatarUrl = logoUrl;
    }

    const profileOrigin = (key) => {
      return profileDataOrigin.result.playerData[key] !== null
        ? profileDataOrigin.result.playerData[key]
        : "-";
    };

    const profile = (key) => {
      return profileData.result.playerData[key] !== null
        ? profileData.result.playerData[key]
        : "-";
    };

    const profileBool = (key) => {
      return parseInt(profile(key));
    };

    const game = (key) => {
      if (!profileData.result.performanceData) return null;
      return profileData.result.performanceData[0][key] || "-";
    };

    const gameRecords = (key) => {
      if (!game("gameRecords")) return "0";
      return game("gameRecords")[key] || "0";
    };

    const statisticsMonthlyChartUpdates = ref([]);
    const statisticsMonthlyChartUpdater = () => {
      statisticsMonthlyChartUpdates.value.shift();
      setTimeout(() => {
        statisticsMonthlyChartUpdates.value.push("StatisticsMonthlyChart");
      }, 0);
    };

    const statisticsMonthlyByPlatformHandler = (platformKey) => {
      if (platformByState.value == platformKey) return;
      statisticsMonthlyChartUpdater();
      setStatisticsMonthlyKey(0);
      setPlatformBy(platformKey);
    };

    const statisticsMonthlyByPlatformActiveClassHandler = (platformKey) => {
      return platformByState.value == platformKey
        ? "player-profile__statistics-monthly-by-platform_active"
        : "";
    };

    const statisticsMonthlyDataHandler = (statisticsMonthlyKeyVar) => {
      if (statisticsMonthlyKey.value == statisticsMonthlyKeyVar) return;
      statisticsMonthlyChartUpdater();
      setStatisticsMonthlyKey(statisticsMonthlyKeyVar);
    };

    const statisticsMonthlyDataActiveClassHandler = (
      statisticsMonthlyKeyVar
    ) => {
      return statisticsMonthlyKey.value == statisticsMonthlyKeyVar
        ? "player-profile__statistics-monthly-by-months-month_active"
        : "";
    };

    const statisticsMonthlyKey = ref(0);
    const setStatisticsMonthlyKey = (monthKey) => {
      statisticsMonthlyKey.value = monthKey;
    };

    const platformByState = ref(0);
    const setPlatformBy = (key) => {
      platformByState.value = key;
    };

    const changeCountry = () => {
      profileData.result.playerData["stateId"] = null;
      profileData.result.playerData["stateName"] = null;
      dropdownFilter.states =
        dropdownFilter.countries[
          profileData.result.playerData["countryId"] - 1
        ].states;
    
    };

    const chartData = () => {
      if (!profileData.result.performanceData) return "-";
      return profileData.result.performanceData[0].gamePlatformResults[
        platformByState.value
      ].weekendLeagueResultsMonthly;
    };

    return {
      loaded,
      editProfile,
      saveProfileHandler,
      editProfileHandler,
      editProfileDateHandler,
      editProfileSelectHandler,
      prepareNewLogo,
      profile,
      profileBool,
      profileData,
      game,
      gameRecords,
      chartData,
      statisticsMonthlyKey,
      statisticsMonthlyChartUpdates,
      statisticsMonthlyByPlatformHandler,
      statisticsMonthlyByPlatformActiveClassHandler,
      statisticsMonthlyDataHandler,
      statisticsMonthlyDataActiveClassHandler,
      dropdownFilter,
      changeCountry,
    };
  },
};
</script>

<style lang="sass">
.layout-player .player-profile
    &__general
        display: flex
        flex-wrap: wrap
        margin-bottom: 20px
        padding-bottom: 10px
        background-image: url('./../../assets/bg-main.png'), linear-gradient(c_black(), c_dark_blue_bg())
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
            padding: 2px 3px
            font-size: 1.5em
            &[contenteditable="true"]
                background: c_input_bg()
                border-radius: 5px
                outline: none
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
        width: 33.333%
        min-width: 180px
        padding: 0 20px 0 0
        &_middle
            align-self: center
    &__input-date-of-birth
      color: c_white()
      border: none
      background: c_button_bg()
      border-radius: 5px
    &__field-data-select
        background: c_button_bg()
        border-radius: 5px

    &__statistics
        display: flex
        &-general
            flex: 1
            display: flex
            flex-wrap: wrap
            flex-direction: row
            margin-right: 20px
            background-image: url('./../../assets/bg-main.png'), linear-gradient(c_dark_blue_bg(), c_black())
            border-radius: 20px
            .player__field-data
                color: c_white()
                font-size: 2em
                &-sup
                    margin-left: 5px
                    color: c_text_gray()
                    font-size: .9rem
                    font-weight: 600
        &-monthly
            display: flex
            flex-direction: column
            width: 40%
            background-image: url('./../../assets/bg-main.png'), linear-gradient(c_dark_blue_bg(), c_black())
            border-radius: 20px
            &-title
                margin-bottom: 20px
            &-by-platforms
                display: flex
                margin-bottom: 10px
            &-by-platform
                margin-right: 10px
                cursor: pointer
                &:hover
                    color: cmb(c_white(), 25%)
                &_active
                    color: cmb(c_white(), 50%)
                    &:hover
                        color: cmb(c_white(), 50%)
            &-by-months
                margin-bottom: 20px
                &-month
                    font-size: .8em
                    margin-right: 10px
                    cursor: pointer
                    &:hover
                        color: cmb(c_white(), 25%)
                    &_active
                        color: cmb(c_white(), 50%)
                        &:hover
                            color: cmb(c_white(), 50%)
            &-field
                &-wrap
                    display: flex
                    align-items: center
                    margin-top: 5px
                &-label
                    margin-bottom: 0
                &-data
                    margin-right: 5px
                    font-weight: 600
                    &_wins
                        color: c_label_win()
                    &_loss
                        color: c_label_loss()
            &-chart-wrap
                height: 200px
                width: 70%
                margin: 20px auto 0
    &__upload-new-data
        width: 100%
        padding: 20px 10px
        color: cmb(c_white(), 20)
        font-size: 0.8em
        text-align: center
        border: none
        background: c_button_bg()
        border-radius: 10px
        cursor: pointer

    +media(screen(xl))
        &__statistics
            flex-direction: column
            &-general
                margin: 0 0 20px 0
            &-monthly
                width: 70%
                min-width: 320px
                &-chart-canvas
                    margin: 0 auto

    +media(screen(md))
        &__top-line
            flex-wrap: wrap
        &__statistics
            &-monthly
                width: 100%
</style>
