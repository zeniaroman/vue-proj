<template lang="pug">
.rent.rent_home.rent_service.rent_boat(:class="{'rent_full': isFull}")
	.rent__info(ref="infoEl")
		//- (:style={backgroundImage: 'url(' + rent.images + ')'})
		//-  :style="{backgroundImage: rent.images[0]}"
		.rent__title {{ rent.title }}
		//- .rent__reviews
		.rent__location {{ rent.location }}
		.rent__desc {{ rent.description }}
		router-link(v-if="!isFull" :to="{ name: 'IndexRent', params: {id: rent.id} }").rent__open More
		//- router-link(v-if="!rent.isFull" :to="`rent/` + rent.id").rent__open More
	.rent__contact(v-if="isFull")
		span Contact form component here
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
	name: 'CRent',
	props: ['rentData', 'isFull'],
	setup(props) {
		const rent = ref(props.rentData);
		const infoEl = ref(null)
		
		console.log('rent')
		console.log(rent)
		// getPreview()

		onMounted(() => {
			infoEl.value.style.backgroundImage = `url(${rent.value.images[0]})`
			// console.log()
			// infoEl.value.style.backgroundImage = 'url(' + rent.images[0] + ')'
		})

		return {
			rent,
			infoEl
		}
	}
}
</script>

<style lang="sass">
.rent

.rent
		display: flex
		flex-direction: column
		justify-content: flex-end
		width: 100%
		max-width: 25%
		min-width: 300px
		min-height: 300px
		// background: #f7f7f7
		border: 1px solid c_action()
		&_full
			max-width: 100%
			min-height: 600px
			margin-bottom: 40px
			// background: #ccc
			border: none
		&__info
			flex: 1
			display: flex
			flex-direction: column
			justify-content: flex-end
			color: c_white()
			// padding: 20px
			background-image: url('./../assets/1.jpg')
			background-repeat: no-repeat
			background-position: 50% 50%
			background-size: cover
		&__title
			padding: 5px 20px 0
			font-size: 1.15em
			font-weight: bold
			background: cma(c_white(), .35)
		&__location
			padding: 0 20px
			// font-style: italic
			background: cma(c_white(), .35)
		&__desc
			// margin-bottom: 10px
			padding: 0 20px
			font-size: .9em
			background: cma(c_white(), .35)
		&__open
			padding: 10px 20px
			color: c_action()
			font-weight: bold
			background: cma(c_white(), .35)

</style>
