<template lang="pug">
router-view.layout
</template>

<script>
export default {
  name: 'LayoutMain'
}
</script>

<style lang="sass">
.layout
	flex: 1
	display: flex
	flex-direction: column
	width: 100%
	max-width: 1900px
	margin: 0 auto
	padding: 0 5%
	&__section
		padding: 40px
		border-radius: 20px
	&__row
		flex: 1
		display: flex
	&__column
		display: flex
		flex-direction: column
		width: 33.333%
		min-width: 180px
		padding: 0 20px 0 0
		&_middle
			align-self: center
		&_full
			width: 100%
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

	&__side-nav
	.side-nav
		display: flex
		flex-direction: column
		width: 220px
		margin-right: 50px
		padding-top: 150px
		&__logo-wrap
			align-self: flex-end
			width: 100%
			max-width: 180px
			margin-bottom: 50px
		&__logo
			width: 100%
			max-width: 180px
			height: 30px
		&__item
			margin-bottom: 20px
			padding: 15px 15px 15px 50px
			color: c_side_nav_main()
			text-decoration: none
			border-radius: 10px
			cursor: pointer
			&_with-bg
				color: c_side_nav_active()
				background: c_side_nav_bg()
		&__item.router-link-exact-active
			color: c_side_nav_active()

	&__content
		flex: 1
		// margin-top: 50px
</style>
