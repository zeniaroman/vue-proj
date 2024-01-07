<template lang="pug">
.admin-player-detail
  .admin-player-detail__player
    img.admin-player-detail__player-avatar
    .admin-player-detail__player-line
      span.admin-player-detail__field-label {{ detail.result.fullName }}
      span.admin-player-detail__player-name {{ detail.result.nickName }}
  CForm.admin-player-detail__form(onsubmit="return false")
    span.layout__field-label {{ $t('adminPlayerDetail.profileStatusLabel') }}
    select.form__input.form__select.admin-player-detail__form-select-player-status(
      v-model="status",
      :class="'admin-player-detail__form-select-player-status_' + status"
    )
      option(value="pending") {{ $t('adminPlayerDetail.profileStatusPending') }}
      option(value="active") {{ $t('adminPlayerDetail.profileStatusActive') }}
      option(value="locked") {{ $t('adminPlayerDetail.profileStatusLocked') }}
  h1.admin__title.admin-player-detail__title {{ $t('adminPlayerDetail.playerProfileTitle') }}
  //- .layout__section
  CForm.admin-player-detail__form(onsubmit="return false")
    .form__column.admin-player-detail__user-column
      span.layout__field-label {{ $t('adminPlayerDetail.playerFullName') }}
      input.layout__field-data.form__input(v-model="detail.result.fullName")

      span.layout__field-label {{ $t('adminPlayerDetail.playerAge') }}
      input.layout__field-data.form__input(v-model="detail.result.age" disabled)

      span.layout__field-label {{ $t('adminPlayerDetail.playerDateOfBirth') }}
      input.layout__field-data.form__input(v-model="detail.result.dateOfBirth" type="date")

      span.layout__field-label {{ $t('adminPlayerDetail.playerEmail') }}
      input.layout__field-data.form__input(v-model="detail.result.email")

      span.layout__field-label {{ $t('adminPlayerDetail.playerPhoneNumber') }}
      input.layout__field-data.form__input(v-model="detail.result.phoneNumber")

      span.layout__field-label {{ $t('adminPlayerDetail.playerAddress') }}
      textarea.layout__field-data.form__input(v-model="detail.result.street")

      span.layout__field-label {{ $t('adminPlayerDetail.playerZipCode') }}
      input.layout__field-data.form__input(v-model="detail.result.zipCode")

      span.layout__field-label {{ $t('adminPlayerDetail.playerCity') }}
      input.layout__field-data.form__input(v-model="detail.result.city")

      span.layout__field-label {{ $t('adminPlayerDetail.playerState') }}
      select.layout__field-data.form__input(v-model="detail.result.stateId")
        option(
          v-for="state in dropdownFilter.states",
          v-bind:value="state.stateId"
        ) {{ state.name }}

      span.layout__field-label {{ $t('adminPlayerDetail.playerCountry') }}
      select.layout__field-data.form__input(
        v-model="detail.result.countryId",
        @change="changeCountry"
      ) 
        option(
          v-for="country in dropdownFilter.countries",
          v-bind:value="country.countryId"
        ) {{ country.countryName }}

    .form__column.admin-player-detail__user-column
      span.layout__field-label {{ $t('adminPlayerDetail.playerPlatform') }}
      input.layout__field-data.form__input(v-model="detail.result.fullName")

      span.layout__field-label {{ $t('adminPlayerDetail.playerGamingID') }}
      input.layout__field-data.form__input(v-model="detail.result.gamingId")

      span.layout__field-label {{ $t('adminPlayerDetail.playerSearchingClub') }}
      select.layout__field-data.form__input(
        v-model="detail.result.isSearchingForTeam"
      )
        option(value="1") {{ $t('adminPlayerDetail.playerSearchingClubYes') }}
        option(value="0") {{ $t('adminPlayerDetail.playerSearchingClubNo') }}

      span.layout__field-label {{ $t('adminPlayerDetail.playerIsStreaming') }}
      select.layout__field-data.form__input(v-model="detail.result.isStreamer")
        option(value="1") {{ $t('adminPlayerDetail.playerIsStreamingYes') }}
        option(value="0") {{ $t('adminPlayerDetail.playerIsStreamingNo') }}

      span.layout__field-label {{ $t('adminPlayerDetail.playerInstagramLink') }}
      input.layout__field-data.form__input(
        v-model="detail.result.instagramName"
      )

      span.layout__field-label {{ $t('adminPlayerDetail.playerTwitchLink') }}
      input.layout__field-data.form__input(v-model="detail.result.twitchName")

      span.layout__field-label {{ $t('adminPlayerDetail.playerYoutubeLink') }}
      input.layout__field-data.form__input(v-model="detail.result.youtubeName")

      span.layout__field-label {{ $t('adminPlayerDetail.playerOtherLink') }}
      input.layout__field-data.form__input

      input.form__input.form__submit(
        @click="submitHandler",
        type="submit",
        :value="$t('adminPlayerDetail.submitButton')"
      )
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import CForm from "@/components/CForm";

export default {
  name: "AdminPlayerDetail",
  components: {
    CForm,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const status = ref("active");
    const detail = reactive({
      result: {},
    });
    const dropdownFilter = reactive({
      countries: {},
      states: {},
    });

    onMounted(async () => {
      await store
        .dispatch("getCountriesWithStates")
        .then(res => {
          dropdownFilter.countries = res.data.countries;
        })
        .catch(err => {
          console.log("Error: ", err);
        });

      await store.dispatch("adminGetPlayerDetailById", route.params.playerId);
      const playerDetail = store.getters.getAdminPlayerDetail;

      playerDetail.dateOfBirth = playerDetail.dateOfBirth.split('T')[0];
      playerDetail.isSearchingForTeam = playerDetail.isSearchingForTeam ? 1 : 0;
      playerDetail.isStreamer = playerDetail.isStreamer ? 1 : 0;

      detail.result = playerDetail;
      status.value = detail.result.profileStatus;

      if (detail.result.countryId != null)
        dropdownFilter.states =
          dropdownFilter.countries[detail.result.countryId - 1].states;
    });

    watch(status, async () => {
      console.log("HERE: ", store.getters.getAdminPlayerDetail);
      if (!store.getters.getAdminPlayerDetail) {
        return;
      }

      const payload = {
        userId: store.getters.getAdminPlayerDetail.userId,
        profileStatus: status.value,
      };
      await store
        .dispatch("adminUpdateProfileStatus", payload)
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    });

    const submitHandler = async () => {
      console.log("submit");
      console.log(detail.result)

      detail.result.id = detail.result.playerId
      delete detail.result.playerId

      await store.dispatch(
        "playerProfileUpdate",
        detail.result
      );
    };

    const changeCountry = () => {
      dropdownFilter.states =
        dropdownFilter.countries[detail.result.countryId - 1].states;
      console.log("changed country");
    };

    return {
      status,
      detail,
      dropdownFilter,
      submitHandler,
      changeCountry,
    };
  },
};
</script>

<style lang="sass">
.layout-admin .admin-player-detail
    &__title
        margin-bottom: 20px
    &__form
        flex-wrap: wrap
        flex-direction: row
        max-width: 700px
        &-select-player-status
            width: 100%
            min-width: 100%
            &_pending
                color: c_results_select_pending()
            &_active
                color: cmb(c_white(), 30)
            &_locked
                color: c_results_select_locked()
    &__player
        display: flex
    &__top-line
        display: flex
        justify-content: space-between
        width: 100%
    &__player
        display: flex
        margin: 0 20px 20px 0
        &-avatar
            width: 50px
            height: 50px
            margin-right: 20px
            background: #ccc
            border-radius: 3px
        &-line
            display: flex
            flex-direction: column
            justify-content: space-between
        &-name
            font-size: 1.5em

    &__user-column
        padding-right: 0
        &:first-child
            padding-right: 10px
        &:last-child
            padding-left: 10px
</style>
