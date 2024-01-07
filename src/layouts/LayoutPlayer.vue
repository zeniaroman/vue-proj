<template lang="pug">
.layout-player
	.layout__row
		nav.layout__side-nav.side-nav
			.side-nav__logo-wrap
				router-link(:to="{name: 'PlayerProfile'}")
					img.side-nav__logo(src="@/assets/logo.png" alt="Transferino")
			router-link.side-nav__item(:to="{ name: 'PlayerProfile' }") {{ $t('layoutPlayer.nav.myProfile') }}
			router-link.side-nav__item(:to="{ name: 'PlayerStatistics' }") {{ $t('layoutPlayer.nav.myStatistics') }}
			router-link.side-nav__item.side-nav__item_with-bg(:to="{ name: 'PlayerUploadNewData' }") {{ $t('layoutPlayer.nav.uploadNewData') }}
			span.side-nav__item(@click="logout") {{ $t('layoutPlayer.nav.logout') }}
		.layout__content
			router-view(v-slot="{ Component }").player
				transition(name="fade" mode="out-in")
					component(:is="Component")
	CFooter
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	name: 'LayouPlayer',
	setup() {
		const router = useRouter();
		const store = useStore();

		const logout = () => {
			store.commit('logout');
			router.push({ name: 'AuthLogin' });
		};

		return {
			logout
		};
	}
}
</script>

<style lang="sass">
.layout-player
	.player
		padding-top: 50px
		&__section
			padding: 40px
			border-radius: 20px
		&__title
			display: inline-block
			width: 100%
			margin-bottom: 40px
			font-size: 1.1em
		&__field-label
			margin-bottom: 5px
			color: c_text_gray()
			font-size: .75em
			font-weight: 600
		&__field-data
			margin-bottom: 30px
			padding: 2px 1px
			color: cmb(c_white(), 20)
			word-wrap: break-word
			&[contenteditable="true"]
				background: c_input_bg()
				border-radius: 5px
				outline: none

+media(screen(md))
	.layout
		&__row
			flex-direction: column
		.side-nav
			flex-wrap: wrap
			flex-direction: row
			width: 100%
			margin-right: 0
			padding-top: 50px
			&__logo-wrap
				max-width: none
				margin-bottom: 20px
			&__item
				margin-bottom: 0
				padding: 15px
		&__content
			margin-top: 0

+media(screen(sm))
	.layout
		.side-nav
			&__logo-wrap
				text-align: center
</style>
