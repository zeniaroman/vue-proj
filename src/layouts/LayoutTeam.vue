<template lang="pug">
.layout-team
	.layout__row
		nav.layout__side-nav.side-nav
			.side-nav__logo-wrap
				router-link(:to="{name: 'TeamProfile'}")
					img.side-nav__logo(src="@/assets/logo.png" alt="Transferino")
			router-link.side-nav__item(:to="{ name: 'TeamProfile' }") {{ $t('layoutTeam.nav.myProfile') }}
			router-link.side-nav__item(:to="{ name: 'TeamSearchPlayers' }") {{ $t('layoutTeam.nav.searchPlayers') }}
			router-link.side-nav__item(:to="{ name: 'TeamUnlockedPlayers' }") {{ $t('layoutTeam.nav.unlockedPlayers') }}
			router-link.side-nav__item(:to="{ name: 'TeamCredits' }") {{ $t('layoutTeam.nav.credits') }}
			span.side-nav__item(@click="logout") {{ $t('layoutTeam.nav.logout') }}
		.layout__content
			router-view(v-slot="{ Component }").team
				transition(name="fade" mode="out-in")
					component(:is="Component")
	CFooter
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'LayoutTeam',
  setup() {
		const router = useRouter();
		const store = useStore();

		const logout = () => {
			store.commit('logout');
			router.push({ name: 'AuthLogin' });
		}

		return {
			logout
		}
	}
}
</script>

<style lang="sass">
.layout-team
	.layout__content
		overflow-x: hidden
	.team
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
			color: cmb(c_white(), 20)
			word-wrap: break-word
			span[contenteditable="true"]
				display: inline-block
				width: 100%
				background: c_input_bg()
				border-radius: 5px
				outline: none
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
