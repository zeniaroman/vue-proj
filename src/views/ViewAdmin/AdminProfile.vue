<template lang="pug">
.admin-profile(v-if="loaded")
  h1.admin__title {{ $t('adminProfile.title') }}
  .admin-profile__search.search
    input.search__input(
      v-model="searchData.input",
      type="text",
      :placeholder="$t('adminProfile.search.inputByNamePlaceholder')"
    )
    button.search__button(
      @click="searchButtonHelper('players')",
      :class="{ search__button_active: searchButtonHelper('players', true) }"
    ) {{ $t('adminProfile.search.buttonPlayers') }}
    button.search__button(
      @click="searchButtonHelper('teams')",
      :class="{ search__button_active: searchButtonHelper('teams', true) }"
    ) {{ $t('adminProfile.search.buttonTeams') }}
  .admin-profile__results.results
    CTable.results__table(v-if="searchData.button == 'players'")
      thead
        tr
          th {{ $t('adminProfile.results.playerName') }}
          th {{ $t('adminProfile.results.email') }}
          th {{ $t('adminProfile.results.emailStatus') }}
          th {{ $t('adminProfile.results.profileData') }}
          th {{ $t('adminProfile.results.profileStatus') }}
          th &nbsp;
      tbody
        tr(v-for="player in filteredData.result.players")
          td {{ player.playerName }}
          td {{ player.email }}
          td {{ player.emailStatus }}
          td {{ player.profileDataFilled }}
          td {{ player.profileStatus }}
          td
            select.results__select-profile-status(
              v-model="player.profileStatus"
              @change="selectProfileStatusHandler($event, player.userId)"
              :class="'results__select-profile-status_' + player.profileStatus"
            )
              option(value="pending" :selected="player.profileStatus == 'pending'") {{ $t('adminProfile.results.profileStatusPending') }}
              option(value="active" :selected="player.profileStatus == 'active'") {{ $t('adminProfile.results.profileStatusActive') }}
              option(value="locked" :selected="player.profileStatus == 'locked'") {{ $t('adminProfile.results.profileStatusLocked') }}
          td
            <router-link :to="{ name: 'AdminPlayerDetail', params: { playerId: player.playerId }}" >
              button {{ $t('adminProfile.results.buttonSeeDetails') }}
            </router-link>
    CTable.results__table(v-else)
      thead
        tr
          th {{ $t('adminProfile.results.teamName') }}
          th {{ $t('adminProfile.results.email') }}
          th {{ $t('adminProfile.results.emailStatus') }}
          th {{ $t('adminProfile.results.profileData') }}
          th {{ $t('adminProfile.results.profileStatus') }}
          th &nbsp;
      tbody
        tr(v-for="team in filteredData.result.teams")
          td {{ team.teamName }}
          td {{ team.email }}
          td {{ team.emailStatus }}
          td {{ team.profileDataFilled }}
          td {{ team.profileStatus }}
          td
            select.results__select-profile-status(
              v-model="team.profileStatus",
              :class="'results__select-profile-status_' + team.profileStatus"
            )
              option(value="pending") {{ $t('adminProfile.results.profileStatusPending') }}
              option(value="active") {{ $t('adminProfile.results.profileStatusActive') }}
              option(value="locked") {{ $t('adminProfile.results.profileStatusLocked') }}
          td
            <router-link :to="{ name: 'AdminTeamDetail', params: { teamId: team.teamId }}" >
              button {{ $t('adminProfile.results.buttonSeeDetails') }}
            </router-link>              
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import { useStore } from "vuex";

import CTable from "@/components/CTable";

export default {
  name: "AdminProfile",
  components: {
    CTable,
  },
  setup() {
    const store = useStore();

    const searchData = reactive({
      input: "",
      button: "players",
    });

    const searchButtonHelper = (value, check = false) => {
      if (check) {
        return searchData.button == value;
      }

      searchData.button = value;
    }; 

    const loaded = ref(false);
    const filteredData = reactive({});

    onMounted(async () => {
      await store.dispatch("getPlayerAndTeamOverview")
        .then((res) => {
          console.log(res)
          filteredData.result = res.data;
        })
        .catch((err) => {
          console.log("Error: ", err);
        });

      loaded.value = true;
    });

    let searchTimeout = null;
    watch(searchData, () => {
      const searchInput = searchData.input.length < 3 ? "" : searchData.input

      if(!searchInput) {
        if(searchData.input.length != 0) {
          return;
        }
      }

      clearTimeout(searchTimeout)
      searchTimeout = setTimeout( async() => {
        await store.dispatch("adminSearchUsersByName", searchInput)
          .then(res => {
            filteredData.result = res.data;
          })
          .catch(err => {
            console.log("Error: ", err);
          })
      }, 1000);
    });

    const selectProfileStatusHandler = async (event, userId) => {
      const payload = {
        userId: userId,
        profileStatus: event.target.value
      }
      await store.dispatch("adminUpdateProfileStatus", payload)
        .then(() => {
        })
        .catch(err => {
          console.log(err)
        })
    }

    return {
      searchData,
      searchButtonHelper,
      loaded,
      filteredData,
      selectProfileStatusHandler
    };
  },
};
</script>

<style lang="sass">
.admin-profile
  .admin__title
    margin-bottom: 20px
  &__search
    display: flex
    margin-bottom: 20px
    .search
      &__input
        flex: 1
        width: 100%
        padding: 10px 20px 10px 40px
        font-size: 1em
        color: c_white()
        background: c_input_bg()
        border: none
        border-radius: 5px
        outline: none
        &::placeholder
          color: c_placeholder()
      &__button
        margin-left: 10px
        padding: 10px 40px
        border: none
        font-size: .9em
        color: c_text_gray()
        background-color: c_black()
        border-radius: 5px
        cursor: pointer
        appearance: none
        outline: none
        &_active
          color: c_white()
          background: c_button_bg_lighten1()
  &__results
    overflow-x: scroll
    .results
      &__table
        .results__select-profile-status
          color: cmb(c_white(), 30)
          background: c_none()
          border: none
          cursor: pointer
          outline: none
          &_pending
            color: c_results_select_pending()
          &_locked
            color: c_results_select_locked()
</style>
