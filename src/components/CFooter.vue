<template lang="pug">
footer.footer
	.footer__copyright {{ $t('footer.copyright') }} &copy; {{ new Date().getFullYear() }} Triplil.com
	.footer__language
		button.footer__language-button(@click="langHandler('en')" :class="{'lang-btn_active': locale == 'en'}" :disabled="locale == 'en'") English
		button.footer__language-button(@click="langHandler('de')" :class="{'lang-btn_active': locale == 'de'}" :disabled="locale == 'de'") Deutsch
	.footer__socials.socials
		a.socials__item.socials__item_instagram(href="#" target="_blank")
		a.socials__item.socials__item_facebook(href="#" target="_blank")
		a.socials__item.socials__item_youtube(href="#" target="_blank")
		a.socials__item.socials__item_twitter(href="#" target="_blank")
</template>

<script>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
	name: 'CFooter',
	setup() {
		const router = useRouter()
		const { locale } = useI18n()

		function langHandler(lang) {
			locale.value = lang
			router.push({
				params: {
					lang: lang
				}
			})
		}

		return {
			locale,
			langHandler
		}
	}
}
</script>

<style lang="sass">
.footer
	display: flex
	align-items: center
	justify-content: flex-start
	margin: 60px 0 30px

	&__copyright
		flex: 1
		margin-right: 20px
		color: c_text_gray()
		font-size: .8em

	&__language
		margin-right: 10px
		border-radius: 5px
		overflow: hidden
		&-button
			padding: 5px
			color: c_black()
			background: c_gray()
			border: none
			cursor: pointer
			outline: none
			&:hover
				background: cmb(c_gray(), 5)
			&:disabled
				background: c_gray()
				opacity: .75
				cursor: default

	.socials
		display: flex
		&__item
			display: flex
			width: 26px
			height: 26px
			margin-left: 10px
			background-image: linear-gradient(to top, c_gray(), c_gray())
			background-size: 100%
			border-radius: 50%
			&_instagram
				background-image: url('./../assets/social-icons/icon-instagram.png')
			&_facebook
				background-image: url('./../assets/social-icons/icon-facebook.png')
			&_youtube
				background-image: url('./../assets/social-icons/icon-youtube.png')
			&_twitter
				background-image: url('./../assets/social-icons/icon-twitter.png')
			&:hover
				transform: scale(1.05)


	+media(screen(sm))
		flex-direction: column
		&__language
			order: -1
			margin-bottom: 10px
		&__copyright
			margin-bottom: 10px
</style>
