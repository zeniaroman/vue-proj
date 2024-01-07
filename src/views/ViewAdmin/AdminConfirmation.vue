<template lang="pug">
.admin-confirmation(v-if="loaded")
	h1.admin__title {{ $t('adminConfirmation.title') }}
	transition(name="fade" mode="out-in")
		template(v-if="!$route.params.confirmationId")
			.admin-confirmation__confirmations
				CTable.admin-confirmation__table
					thead
						tr
							th {{ $t('adminConfirmation.table.playerName') }}
							th {{ $t('adminConfirmation.table.totalWin') }}
							th {{ $t('adminConfirmation.table.totalLost') }}
							th {{ $t('adminConfirmation.table.periodeWeek') }}
							th {{ $t('adminConfirmation.table.submitData') }}
							th &nbsp;
					tbody
						tr(v-for="conf in confirmationData.result.adminConfirmationOverviews")
							td {{ conf.playerName }}
							td {{ conf.totalWin }}
							td {{ conf.totalLosses }}
							td {{ conf.weekendLeagueStardDate }}
							td {{ conf.dataSubmittedTimePassedString }}
							td
								button(@click="$router.push({ name: 'AdminConfirmation', params: { confirmationId: conf.gameResultId }, query: { player: conf.playerName }})") {{ $t('adminConfirmation.table.buttonSeeDetails') }}
		template(v-else)
			.layout__section.admin-confirmation__player
				.layout__column
					span.layout__field-label Player Name
					span.layout__field-data {{ $route.query.player || '-' }}

					span.layout__field-label Total Win
					span.layout__field-data {{ detail('totalWins') }}

				.layout__column
					span.layout__field-label Submission Date
					span.layout__field-data {{ detail('submitted').split('T')[0] }}

					span.layout__field-label Total Lost
					span.layout__field-data {{ detail('totalLosses') }}

				.layout__column
					span.layout__field-label Weekend League Period
					span.layout__field-data {{ detail('weekendLeaguePeriod') }}

				.layout__column.layout__column_full
					span.layout__field-label WL Proof
					span.layout__field-data(v-if="!detail('gameresultProofs').length") Proof is empty!
					a(v-for="proof in detail('gameresultProofs')" :href="proof.proofUrl" target="_blank")
						img.layout__field-data.admin-confirmation__proof-img(:src="proof.proofUrl")

				.layout__column.layout__column_full
					textarea.admin-confirmation__player-comment(v-model="confirmationComment" placeholder="Comment (optional)")
					.button.admin-confirmation__player-actions
						button.admin-confirmation__player-action.admin-confirmation__player-action_approve(@click="confirmationHandler(1)") Approve
						button.admin-confirmation__player-action.admin-confirmation__player-action_decline(@click="confirmationHandler(2)") Decline
</template>

<script>
import CTable from '@/components/CTable';
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from "vuex";

export default {
	name: "AdminConfirmation",
	components: {
		CTable
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const store = useStore();

		const loaded = ref(false);
		const confirmationData = reactive({
			result: {}
		});
		const confirmationDetail = reactive({
			result: {}
		});
		const confirmationComment = ref('');
		
		onMounted(async () => {
			await prepareConfirmation(route.params.confirmationId);
		});

		watch(
			() => route.params.confirmationId,
			async confirmationId => {
				loaded.value = false;

				await prepareConfirmation(confirmationId);
			}
		);

		const prepareConfirmation = async confirmationId => {
			confirmationId
				? await setConfirmationDetail(confirmationId)
				: await setConfirmationOverview();

			loaded.value = true;
		};

		const setConfirmationDetail = async confirmationId => {
			confirmationDetail.result = {};
			await store.dispatch('getGameResultConfirmationDetail', confirmationId)
				.then(res => {
					console.log(res);
					confirmationDetail.result = res.data;
				});

			await store.dispatch('getWeekendleagueInfos', detail('gameId'))
				.then(res => {
					const weekendLeague = res.data.weekendLeagues.find(wl => wl.id == detail('weekendLeagueId'));
					confirmationDetail.result.weekendLeaguePeriod = weekendLeague.startDateTime.split(' ')[0] + ' - ' + weekendLeague.endDateTime.split(' ')[0];
				});
		};

		const detail = key => {
			return confirmationDetail.result[key];
		}

		const setConfirmationOverview = async () => {
			await store
				.dispatch("getGameresultConfirmationOverview")
				.then((res) => {
					confirmationData.result = res.data;        
					console.log(confirmationData.result);
				})
				.catch((err) => {
					console.log("Error: ", err);
				});
		};

		const confirmationHandler = status => {
			store.dispatch('adminConfirmationPlayer', {
				ProofId: detail('gameresultProofs')[0].proofId,
				ApprovalStatusCode: status,
				Comment: confirmationComment.value
			})
				.then(res => {
					console.log(res);
					router.push({name: 'AdminConfirmation'});
				})
		}

		return {
			loaded,
			confirmationData,
			detail,
			confirmationComment,
			confirmationHandler
		};
	}
};
</script>

<style lang="sass">
.admin-confirmation
	&__confirmations
		overflow-x: scroll
	&__player
		display: flex
		flex-wrap: wrap
		background: linear-gradient(c_black(), c_dark_blue_bg())
		&-wl-proof
			width: 100%
		&-comment
			width: 100%
			max-width: 400px
			height: 70px
			margin-bottom: 20px
			padding: 10px
			border-radius: 5px
			outline: none
		&-action
			margin-right: 20px
			padding: 10px
			color: c_white()
			background: c_action()
			border: none
			border-radius: 5px
			cursor: pointer
			appearance: none
			outline: none
			&:hover
				background: cmb(c_action(), 10)
			&_decline
				color: c_text_gray()
				background: c_black()
				&:hover
					background: cmb(c_black(), 10)
		.layout__field-data
			min-height: 22px
	&__proof-img
		width: 100%
</style>
