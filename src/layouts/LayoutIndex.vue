<template lang="pug">
.layout-index
	.layout-index__header.header-index
		router-link.header-index__link.header-index__link_home(:to="{name: 'IndexHome'}")
			strong Triplil.com
		nav.header-index__servers
			router-link.header-index__link(:to="{name: 'IndexRent'}") Rent
			a.header-index__link(href="#") Rest
			a.header-index__link(href="#") Buy
	.layout__content
		router-view(v-slot="{ Component }").index
			transition(name="fade" mode="out-in")
				component(:is="Component")
	CFooter
</template>

<script>
// import { ref } from 'vue';
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';

export default {
	name: 'LayoutIndex',
	setup() {
		// const router = useRouter();
		// const store = useStore();
		// const show = ref(false);
		// const indexData = store.getters.getindexData;

		// if(indexData.token) {
		// 	router.push({ name: indexData.userRole + 'Profile' });
		// 	return
		// }

		// show.value = true;

		// return {
		// 	show
		// }
	}
}
</script>

<style lang="sass">
.layout-index
	flex-direction: column
	padding-top: 50px
	background: c_layout_main()
	background-image: url('./../assets/lines.png')
	background-position: 50% 0%
	background-repeat: no-repeat
	background-size: 100%
	&_empty
		align-items: center
		justify-content: center

	.header-index
		display: flex
		align-items: center
		justify-content: space-between
		z-index: 10000
		&__link
			padding: 20px
			color: c_white()
			text-decoration: none
			&:hover
				color: c_white()
				background: c_action()
		&__link.router-link-exact-active
			color: c_white()
			background: c_action()

	.index
		display: flex

	+media(screen(md))
		.header-index
			flex-direction: column
			&__logo
				margin-bottom: 20px
</style>
