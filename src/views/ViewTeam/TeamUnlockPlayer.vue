<template lang="pug">
.team-unlock-player(v-if="loaded")
  .team__section.team-unlock-player__already-unlocked(v-if="alreadyUnlocked() == true")
    span {{ $t('teamUnlockPlayer.alreadyUnlockedFirstChunk') }} {{ unlockData('unlockedPrice') }} {{ $t('teamUnlockPlayer.alreadyUnlockedSecondChunk') }} {{ unlockData('unlockedTime') }}
      | &nbsp;|&nbsp;
      router-link.team-unlock-player__already-unlocked-link-to-player(:to="{name: 'TeamUnlockedPlayer', params: {userId: $route.params.userId}}") {{ $t('teamUnlockPlayer.linkToPlayer') }}
  
  CTeamPlayerProfile.team__section.team-unlock-player__general(:playerData="playerData()")
      
  .team__section.team-unlock-player__credits.credits(v-if="alreadyUnlocked() == false")
        span.team__title.credits__title {{ $t('teamUnlockPlayer.player.creditsNeededTitle') }}
        .credits__wrap
          .credits__item
            span.credits__amount {{ unlockData('priceToUnlock') }}
            span.team__field-label {{ $t('teamUnlockPlayer.player.creditsLabel') }}
          .credits__item
            span.credits__amount {{ credits() }}
            span.team__field-label {{ $t('teamUnlockPlayer.player.creditsYour') }}
        button.credits__buy.credits__buy_black(@click="unlockNowButtonHandler") {{ $t('teamUnlockPlayer.player.creditsUnlockNow') }}
        button.credits__buy(@click="$router.push({name: 'TeamCredits'})") {{ $t('teamUnlockPlayer.player.creditsAddCredits') }}
        span.credits__description {{ $t('teamUnlockPlayer.player.creditsDescription') }}
</template>

<script>
import { ref, reactive, onMounted, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from 'axios';

export default {
  name: "TeamUnlockPlayer",
  components: {
    CTeamPlayerProfile: defineAsyncComponent(() =>
      import("@/components/CTeamPlayerProfile")
    )
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const loaded = ref(false);
    const profileData = reactive({});
    const profileTeamData = reactive({});
    
    onMounted(async () => {
      console.log(route.params.userId)
      await store.dispatch("getTeamUnlockPlayerProfile", route.params.userId);
      profileData.result = store.getters.getTeamUnlockPlayerProfile;
      profileData.unlockData = store.getters.getTeamUnlockPlayerUnlockData;

      console.log('result: ', profileData.result)
      console.log('unlock result: ', profileData.unlockData)


      await store
        .dispatch("getProfile")
        .then((res) => {
          profileTeamData.result = res.data;
          
          console.log(profileTeamData.result);
        })
        .catch((err) => {
          console.log("Error: ", err);
          // return;
        });

      loaded.value = true;
    });

    const playerData = () => {
      return profileData.result;
    };

    const unlockData = (key) =>  profileData.unlockData[key] || "- missing -";

    const alreadyUnlocked = () => {
      return profileData.unlockData.alreadyUnlocked;
    }

    const credits = () => {
      return profileTeamData.result.credits;
    };

    const unlockNowButtonHandler = async () => {
      let playerId = route.params.userId;
      axios.put(`/Credit/UnlockPlayer/${playerId}`).then(
        (res) => {
          console.log(res);
          router.go({ name: 'TeamUnlockPlayer', params: { userId: playerId } });   
        }
      )      
    };

    return {
      loaded,
      playerData,
      unlockData,
      credits,
      alreadyUnlocked,
      unlockNowButtonHandler
    };
  },
};
</script>

<style lang="sass">
.layout-team .team-unlock-player
    display: flex
    flex-direction: column
    &__already-unlocked
      margin-bottom: 20px
      padding: 20px
      background: c_black() url('./../../assets/bg-main.png')
      background-repeat: no-repeat
      background-position: 50%
      &-link-to-player
        color: c_gray_lighten1()
        text-decoration: none

    &__general
        flex: 1
        display: flex
        flex-wrap: wrap
        margin-bottom: 20px
        padding-bottom: 10px
        background-image: url('./../../assets/bg-main.png'), linear-gradient(c_black(), c_dark_blue_bg())
        background-repeat: no-repeat
    &__top-line
        display: flex
        justify-content: space-between
        width: 100%
        margin-bottom: 20px
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
        &-welcome
        &-name
            font-size: 1.5em
    &__column
        display: flex
        flex-direction: column
        width: 33.333%
        min-width: 180px
        padding: 0 20px 0 0

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

    +media(screen(sm))
        &__top-line
            flex-direction: column
        &__credits
            max-width: none
</style>
