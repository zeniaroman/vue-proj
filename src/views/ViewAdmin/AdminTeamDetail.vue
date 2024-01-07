<template lang="pug">
.admin-team-detail
  .admin-team-detail__team
    img.admin-team-detail__team-avatar
    .admin-team-detail__team-line
      span.admin-team-detail__field-label {{ detail.result.contactName }}
      span.admin-team-detail__team-name {{ detail.result.teamName }}
  CForm.admin-team-detail__form(onsubmit="return false")
    span.layout__field-label Profile Status
    select.form__input.form__select.admin-team-detail__form-select-team-status(
      v-model="status",
      :class="'admin-team-detail__form-select-team-status_' + status"
    )
      option(value="pending") pending
      option(value="active") active
      option(value="locked") locked
  h1.admin__title.admin-team-detail__title Team Profile
  CForm.admin-team-detail__form(onsubmit="return false")
    .form__column.admin-team-detail__user-column
      span.layout__field-label Full Name
      input.layout__field-data.form__input(v-model="detail.result.contactName")

      //- span.layout__field-label Date Of Birth
      //- input.layout__field-data.form__input(v-model="detail.result.dateOfBirth" type="date")

      span.layout__field-label Email
      input.layout__field-data.form__input(v-model="detail.result.contactEmail")

      span.layout__field-label Phone Number
      input.layout__field-data.form__input(v-model="detail.result.phoneNumber")

      span.layout__field-label Address
      textarea.layout__field-data.form__input(v-model="detail.result.street")

      span.layout__field-label ZipCode
      input.layout__field-data.form__input(v-model="detail.result.zipCode")

      span.layout__field-label City
      input.layout__field-data.form__input(v-model="detail.result.city")

      span.layout__field-label State
      select.layout__field-data.form__input(v-model="detail.result.stateId")
        option(
          v-for="state in dropdownFilter.states",
          v-bind:value="state.stateId"
        ) {{ state.name }}

      span.layout__field-label Country
      select.layout__field-data.form__input(
        v-model="detail.result.countryId",
        @change="changeCountry"
      ) 
        option(
          v-for="country in dropdownFilter.countries",
          v-bind:value="country.countryId"
        ) {{ country.countryName }}

    .form__column.admin-team-detail__user-column
      span.layout__field-label Platform
      input.layout__field-data.form__input(v-model="detail.result.fullName")

      span.layout__field-label Gaming ID
      input.layout__field-data.form__input(v-model="detail.result.gamingId")

      span.layout__field-label Searching for Esport Club
      input.layout__field-data.form__input(
        v-model="detail.result.isSearchingForTeam"
      )

      span.layout__field-label Is Streaming
      input.layout__field-data.form__input(v-model="detail.result.isStreamer")

      span.layout__field-label Instagram link
      input.layout__field-data.form__input(
        v-model="detail.result.instagramName"
      )

      span.layout__field-label Website
      input.layout__field-data.form__input(v-model="detail.result.websiteUrl")

      input.form__input.form__submit(
        @click="submitHandler",
        type="submit",
        value="Save Changes"
      )
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import CForm from "@/components/CForm";

export default {
  name: "AdminTeamDetail",
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

      await store.dispatch("adminGetTeamDetailById", route.params.teamId);
      detail.result = store.getters.getAdminTeamDetail;
      status.value = detail.result.profileStatus;

      if (detail.result.countryId != null)
        dropdownFilter.states =
          dropdownFilter.countries[detail.result.countryId - 1].states;
    });

    watch(status, async () => {
      console.log("HERE: ", store.getters.getAdminTeamDetail);
      if (!store.getters.getAdminTeamDetail) {
        return;
      }

      const payload = {
        userId: store.getters.getAdminTeamDetail.userId,
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

      detail.result.id = detail.result.teamId;
      delete detail.result.teamId;

      detail.result.verified = 0;
      
      store.commit('setTeamProfileData', detail.result);
      await store.dispatch(
        "teamProfileUpdate"
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
.layout-admin .admin-team-detail
    &__title
        margin-bottom: 20px
    &__form
        flex-wrap: wrap
        flex-direction: row
        max-width: 700px
        &-select-team-status
            width: 100%
            min-width: 100%
            &_pending
                color: c_results_select_pending()
            &_active
                color: cmb(c_white(), 30)
            &_locked
                color: c_results_select_locked()
    &__top-line
        display: flex
        justify-content: space-between
        width: 100%
    &__team
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
