<template lang="pug">
.team-search-players(v-if="loaded")
  h1.team-search-players__title {{ $t('teamSearchPlayers.title') }}
  .team-search-players__filter.filter
    .filter__title {{ $t('teamSearchPlayers.filter.title') }}
    .filter__controls
      .filter__select.filter__select_slider
        p.filter__slider_title {{ $t('teamSearchPlayers.filter.age') }}
        <Slider v-model="filter.age" v-bind="sliderOptions.age" @change="filterHandler" />
      .filter__select.filter__select_slider
        p.filter__slider_title {{ $t('teamSearchPlayers.filter.record') }}
        <Slider v-model="filter.record" v-bind="sliderOptions.record" @change="filterHandler" />
      select.filter__select(v-model="filter.country", @change="changeCountry")
        option(value="" selected) {{ $t('teamSearchPlayers.filter.country') }}
        option(
          v-for="country in filter.countries"
          :value="country.countryId"
        ) {{ country.countryName }}

      select.filter__select(v-model="filter.state" @change="filterHandler")
        option(value="" selected) {{ $t('teamSearchPlayers.filter.state') }}
        option(v-for="state in filter.states" :value="state.stateId") {{ state.name }}
      select.filter__select(v-model="filter.game" @change="changeGame")    
        option(value="" selected) {{ $t('teamSearchPlayers.filter.game') }}   
        option(v-for="game in filter.games" :value="game.gameId") {{ game.gameName }}
      select.filter__select(v-model="filter.platform" @change="filterHandler")
        option(value="" selected) {{ $t('teamSearchPlayers.filter.platform') }}
        option(
          v-for="platform in filter.platforms"
          :value="platform.platformId"
        ) {{ platform.platformName }}

      select.filter__select(
        v-model="filter.clubStatus"
        @change="filterHandler"
      )
        option(value="" selected) {{ $t('teamSearchPlayers.filter.clubStatus') }}
        option(value=1) {{ $t('teamSearchPlayers.filter.clubStatusLooking') }}
        option(value=0) {{ $t('teamSearchPlayers.filter.clubStatusHave') }}

    button.filter__button(@click="resetHandler") {{ $t('teamSearchPlayers.filter.button') }}
  .team-search-players__results.results
    CTable.results__table
      thead
        tr
          th {{ $t('teamSearchPlayers.results.playerName') }}
          th {{ $t('teamSearchPlayers.results.age') }}
          th {{ $t('teamSearchPlayers.results.city') }}
          th {{ $t('teamSearchPlayers.results.record') }}
          th {{ $t('teamSearchPlayers.results.platform') }}
          th {{ $t('teamSearchPlayers.results.clubStatus') }}
          th {{ $t('teamSearchPlayers.results.streaming') }}
      tbody
        tr(v-for="item in playerList.result")
          td(
            @click="$router.push({ name: 'TeamUnlockPlayer', params: { userId: item.id } })"
          ) {{ item.nickName }}
          td {{ item.age }}
          td {{ item.city }}
          td {{ item.lastRecord }}
          td {{ item.gameConsolePlatform }}
          td {{ item.lookingForClubStatus ? $t('teamSearchPlayers.results.clubStatusYes') : $t('teamSearchPlayers.results.clubStatusNo') }}
          td {{ item.streamingStatus ? $t('teamSearchPlayers.results.streamingYes') : $t('teamSearchPlayers.results.streamingNo') }}
</template> 

<script>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";

import CTable from "@/components/CTable";
import Slider from "@vueform/slider";

export default {
  name: "TeamSearchPlayers",
  components: {
    CTable,
    Slider
  },
  setup() {
    const store = useStore();
    const loaded = ref(false);

    const playerList = reactive({});
    const sliderOptions = reactive({
      age: {
        min: 10,
        max: 70,
      },
      record: {
        min: 1,
        max: 30,
        format: {
          suffix: "+",
          decimals: 0,
        },
      },
    });

    const filterStore = store.getters.teamSearchPlayersFilter;
    const filter = reactive(filterStore ? filterStore : {
      age: [10, 70],
      countries: {},
      country: "",
      states: {},
      state: "",
      record: 1,
      game: "",
      games: {},
      platform: "",
      platforms: {},
      clubStatus: "",
    });

    onMounted(async () => {
      await axios
        .get("Webapp/GetPlayerFilters")
        .then(res => {
          filter.countries = res.data.countries;
          filter.games = res.data.games;
          // Why?
          //Init Game: FIFA 21 hardcoded
          // filter.game = 1;
          // filter.platforms = filter.games[filter.game - 1].platforms;

        })
        .catch(err => {
          console.error("Error: ", err);
        });

      await store
        .dispatch("getSearchPlayers", filter)
        .then(res => {
          playerList.result = res.data.players;
        })
        .catch(err => {
          console.error(err);
        });

      loaded.value = true;
    });

    const changeCountry = () => {
      filter.states = filter.country
        ? filter.countries[filter.country - 1].states : {};

      filter.state = "";
      filterHandler();
    };

    const changeGame = () => {
      if(filter.game == 0) {
        filter.platforms = {};
        return;
      }

      filter.platforms = filter.games[filter.game - 1].platforms;
      filterHandler();
    };

    const filterHandler = async () => {
      await store
        .dispatch("getSearchPlayers", filter)
        .then((res) => {
          playerList.result = res.data.players;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const resetHandler = () => {
      Object.keys(filter).forEach(function (key) {
        if (key == "age") filter[key] = [10, 70];
        else if (key == "record") filter[key] = 1;
        else if (key == "countries") return;
        else if (key == "games") return;
        else filter[key] = "";
      });
    };

    return {
      sliderOptions,
      filter,
      filterHandler,
      resetHandler,
      loaded,
      playerList,
      changeCountry,
      changeGame,
    };
  }
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="sass">
.team-search-players
  margin-top: 50px
  &__title
    margin-bottom: 40px
    font-size: 1.75em
    font-weight: 500
  &__filter
    display: flex
    flex-wrap: wrap
    margin-bottom: 40px
    padding: 40px 20px 20px
    background: cmw(c_black(), 2)
    border-radius: 10px
    .filter
      &__title
        width: 100%
        margin-bottom: 20px
        font-size: 1.25em
      &__controls
        flex: 1
        display: flex
        flex-wrap: wrap
      &__select
        min-width: 100px
        margin: 0 10px 20px 0
        padding: 10px 40px 10px 20px
        color: c_white()
        border: none
        background-color: c_button_bg()
        background-image: url('https://pngimage.net/wp-content/uploads/2018/06/grey-down-arrow-icon-png-2.png')
        background-repeat: no-repeat
        background-position: 95% 50%
        background-size: 20px
        border-radius: 3px
        appearance: none
        cursor: pointer
        outline: none
        &_black
          color: c_text_gray()
          background-color: c_black()
        &_slider
          padding: 10px 10px 0
          background-image: none
      &__slider_title
        margin-bottom: 5px
        font-size: .8em
        text-align: center
      &__button
        align-self: flex-start
        padding: 10px 40px
        border: none
        color: c_white()
        background: c_button_bg_lighten1()
        border-radius: 3px
        cursor: pointer
        outline: none
  &__results
    overflow-x: scroll
    .results
      &__table
        tbody
          td:first-child
            color: c_gray_lighten1()
            cursor: pointer

  +media(screen(md))
    margin-top: 0
</style>
