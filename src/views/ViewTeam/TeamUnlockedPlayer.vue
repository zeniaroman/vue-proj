<template lang="pug">
.team-unlock-player(v-if="loaded")
  CTeamPlayerProfile.team__section.team-unlock-player__general(:playerData="playerData()")
  
  .team-unlock-player__statistics
    .team__section.team-unlock-player__statistics-general
      span.team__title {{ game('gameName') }} {{ $t('playerProfile.statisticsGeneral.title') }}
      .team-unlock-player__column
        span.team__field-label {{ $t('playerProfile.statisticsGeneral.currentPosition') }}
        span.team__field-data {{ gameRecords('latestRank') }}
          sup.team__field-data-sup TH
        span.team__field-label {{ $t('playerProfile.statisticsGeneral.totalMatchPlayed') }}
        span.team__field-data {{ gameRecords('totalMatchesPlayed') }}
        span.team__field-label {{ $t('playerProfile.statisticsGeneral.biggestWin') }}
        span.team__field-data {{ gameRecords('maximumWinsReached') }}
      .team-unlock-player__column
        span.team__field-label {{ $t('playerProfile.statisticsGeneral.highestPosition') }}
        span.team__field-data {{ gameRecords('bestRank') }}
          sup.team__field-data-sup TH
        span.team__field-label {{ $t('playerProfile.statisticsGeneral.totalWins') }}
        span.team__field-data {{ gameRecords('totalWins') }}   
      .team-unlock-player__column.team-unlock-player__column_middle
        span.team__field-label {{ $t('playerProfile.statisticsGeneral.totalLoss') }}
        span.team__field-data {{ gameRecords('totalLosses') }}

    .team__section.team-unlock-player__statistics-monthly(
      v-if="game('gameName')"
    )
      span.team__title.team-unlock-player__statistics-monthly-title {{ game('gameName') }} {{ $t('playerProfile.statisticsMonthly.title') }}
      .team-unlock-player__statistics-monthly-by-platforms
        span.team-unlock-player__statistics-monthly-by-platform(
          v-for="(statisticsMonthlyByPlatformResults, key) in game('gamePlatformResults')",
          @click="statisticsMonthlyByPlatformHandler(key)",
          :class="statisticsMonthlyByPlatformActiveClassHandler(key)",
          :key="'key-' + key"
        ) {{ statisticsMonthlyByPlatformResults.platformName }}
      .team-unlock-player__statistics-monthly-by-months
        span.team-unlock-player__statistics-monthly-by-months-month(
          v-for="(statisticsMonthlyData, key) in chartData()",
          @click="statisticsMonthlyDataHandler(key)",
          :key="'key-' + key",
          :class="statisticsMonthlyDataActiveClassHandler(key)"
        ) {{ statisticsMonthlyData.startDate.split('T')[0] }}
      .team-unlock-player__statistics-monthly-field-wrap
        span.team-unlock-player__statistics-monthly-field-data {{ chartData()[statisticsMonthlyKey].totalMatchesPlayed }}
        span.team__field-label.team-unlock-player__statistics-monthly-field-label total play
      .team-unlock-player__statistics-monthly-field-wrap
        span.team-unlock-player__statistics-monthly-field-data.team-unlock-player__statistics-monthly-field-data_wins {{ chartData()[statisticsMonthlyKey].totalWins }}
        span.team__field-label.team-unlock-player__statistics-monthly-field-label wins
      .team-unlock-player__statistics-monthly-field-wrap
        span.team-unlock-player__statistics-monthly-field-data.team-unlock-player__statistics-monthly-field-data_loss {{ chartData()[statisticsMonthlyKey].totalLosses }}
        span.team__field-label.team-unlock-player__statistics-monthly-field-label loss
      .team-unlock-player__statistics-monthly-chart-wrap(
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
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "TeamUnlockedPlayer",
  components: {
    CTeamPlayerProfile: defineAsyncComponent(() =>
      import("@/components/CTeamPlayerProfile")
    ),
    StatisticsMonthlyChart: defineAsyncComponent(() =>
      import("@/components/charts/StatisticsMonthlyChart")
    )
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const loaded = ref(false);
    const profileData = reactive({});
    const profileTeamData = reactive({});
    
    onMounted(async () => {
      console.log(route.params.userId)
      await store.dispatch("getPlayerProfile", route.params.userId)
        .then(res => {
          console.log('RES: ', res)
          profileData.result = res.data

          statisticsMonthlyChartUpdater();
        })
        .catch(err => {
          console.log("Error: ", err)
        });

      console.log('result: ', profileData.result)


      await store
        .dispatch("getProfile")
        .then(res => {
          profileTeamData.result = res.data;
          console.log(profileTeamData.result);
        })
        .catch(err => {
          console.log("Error: ", err);
        });

      loaded.value = true;
    });

    const playerData = () => {
      return profileData.result.playerData;
    };

    const game = (key) => {
      if (!profileData.result.performanceData) return null;
      return profileData.result.performanceData[0][key] || "-";
    };

    const gameRecords = (key) => {
      if (!game("gameRecords")) return "0";
      return game("gameRecords")[key] || "0";
    };

    const statisticsMonthlyByPlatformActiveClassHandler = (platformKey) => {
      return platformByState.value == platformKey
        ? "team-unlock-player__statistics-monthly-by-platform_active"
        : "";
    };

    const statisticsMonthlyByPlatformHandler = (platformKey) => {
      if (platformByState.value == platformKey) return;
      statisticsMonthlyChartUpdater();
      setStatisticsMonthlyKey(0);
      setPlatformBy(platformKey);
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
        ? "team-unlock-player__statistics-monthly-by-months-month_active"
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

    const chartData = () => {
      if (!profileData.result.performanceData) return "-";
      return profileData.result.performanceData[0].gamePlatformResults[
        platformByState.value
      ].weekendLeagueResultsMonthly;
    };

    const statisticsMonthlyChartUpdates = ref([]);
    const statisticsMonthlyChartUpdater = () => {
      statisticsMonthlyChartUpdates.value.shift();
      setTimeout(() => {
        statisticsMonthlyChartUpdates.value.push("StatisticsMonthlyChart");
      }, 0);
    };

    return {
      loaded,
      playerData,
      game,
      gameRecords,
      statisticsMonthlyKey,
      statisticsMonthlyByPlatformActiveClassHandler,
      statisticsMonthlyByPlatformHandler,
      statisticsMonthlyDataHandler,
      statisticsMonthlyDataActiveClassHandler,
      chartData,
      statisticsMonthlyChartUpdates
    };
  },
};
</script>

<style lang="sass">
.team-unlock-player
    display: flex
    flex-direction: column
    &__general
        flex: 1
        display: flex
        flex-wrap: wrap
        margin-bottom: 20px
        padding-bottom: 10px
        background-image: url('./../../assets/bg-main.png'), linear-gradient(c_black(), c_dark_blue_bg())
        background-repeat: no-repeat
    &__column
        display: flex
        flex-direction: column
        width: 33.333%
        min-width: 180px
        padding: 0 20px 0 0

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
            .team__field-data
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

    &__credits
        align-self: flex-start
        display: flex
        flex-direction: column
        width: 100%
        max-width: 300px
        background: c_black() url('./../../assets/bg-main.png')
        background-size: cover
        
        .credits
            &__title
                margin-bottom: 10px
            &__wrap
                display: flex
                flex-wrap: wrap
                justify-content: space-between
                margin-bottom: 20px
            &__item
                display: flex
                flex-direction: column
            &__amount
                font-size: 4em
            &__description
                margin-top: 10px
                font-size: .8em
                color: c_text_gray()
            &__buy
                margin-bottom: 10px
                padding: 10px 20px
                text-align: center
                color: cmb(c_white(), 20)
                font-size: .75em
                background: c_button_bg()
                border: none
                border-radius: 5px
                cursor: pointer
                &_black
                    background: c_black()

    +media(screen(xl))
        flex-direction: column
        &__general
            margin: 0 0 20px
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
        &__statistics
            &-monthly
                width: 100%

    +media(screen(sm))
        &__top-line
            flex-direction: column
        &__credits
            max-width: none
</style>
