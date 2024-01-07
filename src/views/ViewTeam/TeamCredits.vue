<template lang="pug">
.team-credits(v-if="loaded")
	.team__section
		transition(name="fade" mode="out-in")
			form(v-if="!isCheckout" onsubmit="return false").form.form_credits
				span.team__title {{ $t('teamCredits.formCredits.title') }}
				span.team__field-label {{ $t('teamCredits.formCredits.yourCredits') }}
				span.form__credits-amount {{ creditsData.result.userCredits }}
				p.form__description {{ $t('teamCredits.formCredits.description') }}
				label.form__label(for="team-credits-want-to-buy") {{ $t('teamCredits.formCredits.wantToBuyLabel') }}
				input.form__input(v-model="wantToBuy" id="team-credits-want-to-buy" type="text" placeholder="100" autocomplete="off")
				span.form__error(v-if="wantToBuyValidator.wantToBuy.$error") {{ $t(`teamCredits.formCredits['${wantToBuyValidator.wantToBuy.$errors[0].$validator}WantToBuy']`) }}
				span.team__field-label.form__label-total-price {{ $t('teamCredits.formCredits.totalPrice') }}
				span.form__price
					| {{ totalPrice }}
					span.team__field-label {{ $t('teamCredits.formCredits.totalPriceEuro') }}
				input.form__input.form__submit(@click="submitHandler" type="submit" :value="$t('teamCredits.formCredits.submit')")

			form(v-else onsubmit="return false").form.form_checkout
				template(v-if="isCheckoutReady")
					span.team__title {{ $t('teamCredits.formCheckout.title') }}
					span.team__field-label {{ $t('teamCredits.formCheckout.totalPrice') }}
					span.form__price {{ totalPrice }} {{ $t('teamCredits.formCheckout.totalPriceEuro') }}
					label.form__radio-container
						input.form__radio(v-model="checkoutData.method" type="radio" value="card")
						span.form__label-text
							span.form__label-text-content {{ $t('teamCredits.formCheckout.cardTitle') }}
							span.team__field-label {{ $t('teamCredits.formCheckout.cardSubtitle') }}
					span.team__field-label(for="team-checkout-card") {{ $t('teamCredits.formCheckout.cardLabel') }}
					input.form__input.form__input-card(v-model="checkoutData.card" id="team-checkout-card" type="text" placeholder="5990 1234 5678 1234" :disabled="checkoutData.method != 'card'" autocomplete="off")
					.form__row
						.form__input-container
							input.form__input(v-model="checkoutData.cardExpiryDate" id="team-checkout-card-expiry-data" type="text" :placeholder="$t('teamCredits.formCheckout.cardExpiryDate')" :disabled="checkoutData.method != 'card'" autocomplete="off")
						.form__input-container
							input.form__input(v-model="checkoutData.cardVCC" id="team-checkout-card-vcc" type="text" maxlength="3" :placeholder="$t('teamCredits.formCheckout.cardVCC')" :disabled="checkoutData.method != 'card'" autocomplete="off")
					span.form__error(v-if="checkoutDataValidator.card.$error") {{ $t(`teamCredits.formCheckout['${checkoutDataValidator.card.$errors[0].$validator}CardNumber']`) }}
					span.form__error(v-else-if="checkoutDataValidator.cardExpiryDate.$error") {{ $t(`teamCredits.formCheckout['${checkoutDataValidator.cardExpiryDate.$errors[0].$validator}CardExpiryDate']`) }}
					span.form__error(v-else-if="checkoutDataValidator.cardVCC.$error") {{ $t(`teamCredits.formCheckout['${checkoutDataValidator.cardVCC.$errors[0].$validator}CardVCC']`) }}


					label.form__radio-container.form__radio-container_paypal
						input.form__radio(v-model="checkoutData.method" type="radio" value="paypal")
						span.form__label-text
							span.form__label-text-content {{ $t('teamCredits.formCheckout.paypalTitle') }}
							span.team__field-label {{ $t('teamCredits.formCheckout.paypalSubtitle') }}
					label.form__checkbox-label
						input.form__checkbox(v-model="checkoutData.accept" type="checkbox")
						| {{ $t('teamCredits.formCheckout.accept') }}
					span.form__error.form__error_accept(v-if="checkoutDataValidator.accept.$error") {{ $t(`teamCredits.formCheckout['${checkoutDataValidator.accept.$errors[0].$validator}Accepted']`) }}
					input.form__input.form__submit(@click="checkoutHandler" type="submit" :value="$t('teamCredits.formCheckout.submit')")
				template(v-else)
					span.team__title Your credits request was successfully made.
						br
						| An admin will shortly get in touch with you
					button-link.form__input.form__submit(@click="$router.push({name: 'TeamSearchPlayers'})") Search Players
	.team__section.team-credits__history
		CTable.results__table
			thead
				tr
					th ID
					th Date
					th Spend on user
					th Changed
			tbody
				tr(v-for="item in creditsHistory.result")
					td {{ item.id }}
					td {{ item.timeStamp }}
					td {{ item.spentOnUserId || '-' }}
					td {{ item.amountChanged }}
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf } from '@vuelidate/validators'


import CTable from "@/components/CTable";
export default {
	name: 'TeamCredits',
	components: {
		CTable
	},
	setup() {

		const store = useStore();		
		const creditsData = reactive({});
		const creditsHistory = reactive({});
		const loaded = ref(false);

		onMounted(async () => {
			await store
				.dispatch("getCredits")
				.then((res) => {
					creditsData.result = res.data;  
					creditsHistory.result = res.data.creditHistory   
					console.log(creditsData.result);
					loaded.value = true;
				})
				.catch((err) => {
				console.log("Error: ", err);
				// return;
				});			
			});

		const isCheckout = ref(false);
		const isCheckoutReady = ref(false);

		const wantToBuy = ref(null);
		const wantToBuyRules = {
			wantToBuy: {
				required,
				isNumber() {
					wantToBuy.value = wantToBuy.value.replace(/^0|\D/g, '');
					return wantToBuy.value;
				}
			}
		};
		const wantToBuyValidator = useVuelidate(
			wantToBuyRules,
			{ wantToBuy }
		);
		const totalPrice = computed(() => wantToBuy.value * creditsData.result.currentPricePerCredit);
		const submitHandler = async () => {
			wantToBuyValidator.value.$touch();

			if(wantToBuyValidator.value.$invalid) {
				return;
			}

			await store.dispatch('teamCreditsRequest', wantToBuy.value)
			isCheckout.value = true;
		};

		const checkoutData = reactive({
			method: 'card',
			card: null,
			cardExpiryDate: null,
			cardVCC: null,
			accept: false
		});
		const isMethod = (method) => {
			return checkoutData.method === method;
		}
		const checkoutDataRules = {
			card: {
				required: requiredIf(() => isMethod('card')),
				isCard(card) {
					if(!isMethod('card')) return true;

					const c = checkoutData.card.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
					checkoutData.card = !c[2] ? c[1] : '' + c[1] + ' ' + c[2] + (c[3] ? ' ' + c[3] : '') + (c[4] ? ' ' + c[4] : '');

					const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
					return regex.test(card.replaceAll(' ', ''));
				}
			},
			cardExpiryDate: {
				required: requiredIf(() => isMethod('card')),
				isExpiry(exp) {
					if(!isMethod('card')) return true;

					const e = checkoutData.cardExpiryDate.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
					checkoutData.cardExpiryDate = !e[2] ? e[1] : '' + e[1] + ' / ' + e[2];

					if(new Date().getMonth() > e[1]) {
						return false;
					}

					const regex = /^(0[1-9]|1[0-2])(2[1-9]{1})$/;
					return regex.test(exp.replace(' / ', ''));
				}
			},
			cardVCC: {
				required: requiredIf(() => isMethod('card')),
				isVCC(vcc) {
					if(!isMethod('card')) return true;

					checkoutData.cardVCC = checkoutData.cardVCC.replace(/\D/g, '');
					return vcc.length == 3;
				}
			},
			accept: {
				isAccept(accept) {
					return accept;
				}
			}
		};
		const checkoutDataValidator = useVuelidate(
			checkoutDataRules,
			checkoutData
		);
		watch(
			() => checkoutData.method,
			() => {
				checkoutDataValidator.value.$touch();
				checkoutDataValidator.value.card.$reset();
				checkoutDataValidator.value.cardExpiryDate.$reset();
				checkoutDataValidator.value.cardVCC.$reset();
				checkoutDataValidator.value.accept.$reset();
			}
		);
		const checkoutHandler = () => {
			checkoutDataValidator.value.$touch();

			if(checkoutDataValidator.value.$invalid) {
				console.log('error')
				return;
			}

			console.log('good')
		};		

		return {
			isCheckout,
			isCheckoutReady,
			wantToBuy,
			wantToBuyValidator,
			totalPrice,
			submitHandler,
			checkoutData,
			checkoutDataValidator,
			checkoutHandler,
			creditsData,
			creditsHistory,
			loaded
		};
	}
}
</script>

<style lang="sass">
.team-credits
	.team__section
		background: c_black() url('./../../assets/bg-main.png')
	&__history.team__section
		margin-top: 20px
		background: c_black()

	.form
		display: flex
		flex-direction: column
		width: 100%
		max-width: 600px
		margin: 0 auto
		.team__title
			margin-top: 15px
		&__credits-amount
			margin-bottom: 20px
			font-size: 4em
		&__description
			max-width: 300px
			margin-bottom: 60px
			color: c_text_gray()
			font-size: .8em
		&__label
			max-width: 300px
			padding-bottom: 10px
			cursor: pointer
		&__input
			max-width: 300px
			margin-bottom: 20px
			padding: 12px 15px
			color: c_white()
			font-size: 1em
			background: c_input_bg()
			border: none
			border-radius: 5px
			outline: none
			appearance: none
			&::placeholder
				color: c_placeholder()
			&:disabled
				cursor: not-allowed
			&-card
				margin-bottom: 10px
		&__error
			position: relative
			top: -18px
			height: 0
			padding-left: 15px
			color: c_action()
			font-size: .8em
			&_accept
				padding-left: 33px
		&__label-total-price
			margin-top: 20px
		&__price
			margin-bottom: 20px
			font-size: 2em
			.team__field-label
				margin-left: 10px
				font-size: .75rem
		&__radio-container
			display: flex
			align-items: center
			margin: 0 0 20px -50px
			padding: 20px
			background: c_black()
			border-radius: 5px
			cursor: pointer
			&_paypal
				margin-top: 20px
			.form__radio
				margin-right: 20px
				cursor: pointer
			.form__label-text
				display: flex
				flex-direction: column
		&__row
			display: flex
			max-width: 300px
		&__input-container
			display: flex
			flex-direction: column
			width: 50%
			padding: 0 5px
			&:first-child
				padding-left: 0
			&:last-child
				padding-right: 0
		&__checkbox-label
			display: flex
			align-items: center
			margin-bottom: 20px
			color: c_white()
			font-size: .8em
			cursor: pointer
		&__checkbox
			margin-right: 20px
			cursor: pointer
		&__submit
			max-width: 300px
			margin-top: 20px
			color: c_white()
			background: c_action()
			cursor: pointer
			&:hover
				background: cmb(c_action(), 10)
</style>
