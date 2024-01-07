<template lang="pug">
.c-team-player-profile
  span.team__title {{ $t('cTeamPlayerProfile.title') }}
  .c-team-player-profile__top-line
    .c-team-player-profile__player
      img.c-team-player-profile__player-avatar(:src="profile('avatarUrl')")
      .c-team-player-profile__player-line
        span.team__field-label.c-team-player-profile__player-fullname {{ profile('fullname') }}
        span.c-team-player-profile__player-name {{ profile('nickName') }}
    a.c-team-player-profile__send-email(v-if="profile('email') != '-'" :href="'mailto:' + profile('email')" target="_blank") {{ $t('cTeamPlayerProfile.profile.contactEmail') }}
    button.c-team-player-profile__send-email(v-else disabled) {{ $t('cTeamPlayerProfile.profile.contactEmail') }}
  .c-team-player-profile__column
    span.team__field-label {{ $t('cTeamPlayerProfile.profile.dateOfBirth') }}
    span.team__field-data {{ profile('dateOfBirth').split('T')[0] }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.email') }}
    span.team__field-data {{ profile('email') }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.phoneNumber') }}
    span.team__field-data {{ profile('phoneNumber') }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.address') }}
    span.team__field-data {{ profile('street') }}
      br
      | {{ profile('zipCode') }} {{ profile('city') }} 
      br
      | {{ profile('stateName') }}
      br
      | {{ profile('countryName') }}

  .c-team-player-profile__column
    span.team__field-label {{ $t('cTeamPlayerProfile.profile.streamingLink') }}
    span.team__field-data {{ profile('twitchName') }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.instagramLink') }}
    span.team__field-data {{ profile('instagramName') }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.youtubeLink') }}
    span.team__field-data {{ profile('youtubeName') }}

  .c-team-player-profile__column
    span.team__field-label {{ $t('cTeamPlayerProfile.profile.playstationGamingID') }}
    span.team__field-data {{ profile('playstationGamingId') }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.xboxGamingID') }}
    span.team__field-data {{ profile('xboxGamingId') }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.isStreaming') }}
    span.team__field-data {{ profile('isStreamer') == 1 ? $t('cTeamPlayerProfile.profile.isStreamingYes') : $t('cTeamPlayerProfile.profile.isStreamingNo') }}

    span.team__field-label {{ $t('cTeamPlayerProfile.profile.searchingClub') }}
    span.team__field-data {{ profile('isSearching') == 1 ? $t('cTeamPlayerProfile.profile.searchingClubYes') : $t('cTeamPlayerProfile.profile.searchingClubNo') }}
</template>

<script>
export default {
  name: "CTeamPlayerProfile",
  props: ['playerData'],
  setup(props) {
    const profile = key => {
      return props.playerData[key] || "-";
    };

    return {
      profile
    };
  },
};
</script>

<style lang="sass">
.c-team-player-profile
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
        &-fullname
        &-name
            font-size: 1.5em
    &__send-email
        align-self: flex-start
        padding: 10px 20px
        color: cmb(c_white(), 20)
        font-size: .75em
        text-decoration: none
        background: c_button_bg()
        border: none
        border-radius: 5px
        cursor: pointer
        &:disabled
          filter: blur(.1em)
          cursor: not-allowed
          &:hover
            filter: blur(.05em)
    &__column
        display: flex
        flex-direction: column
        width: 33.333%
        min-width: 180px
        padding: 0 20px 0 0

    +media(screen(sm))
        &__top-line
            flex-direction: column
</style>
