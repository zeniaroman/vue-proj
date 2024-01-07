<template lang="pug">
.layout-auth(v-if="show")
	.layout-auth__header.header-auth
		router-link(:to="{name: 'AuthLogin'}")
			img.header-auth__logo(src="@/assets/logo.png")
		nav.header-auth__servers(v-if="$route.name == 'AuthLogin'")
			a.header-auth__servers-link(href="#") {{ $t('authLogin.header.server1') }}
			span.header-auth__servers-separator |
			a.header-auth__servers-link(href="#") {{ $t('authLogin.header.server2') }}
			span.header-auth__servers-separator |
			a.header-auth__servers-link(href="#") {{ $t('authLogin.header.server3') }}
		nav.header-auth__servers(v-else)
			span &nbsp;
	.layout__content
		router-view(v-slot="{ Component }").auth
			transition(name="fade" mode="out-in")
				component(:is="Component")
	CFooter
.layout-auth.layout-auth_empty(v-else)
	img.header-auth__logo(src="@/assets/logo.png")
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	name: 'LayoutAuth',
	setup() {
		const router = useRouter();
		const store = useStore();
		const show = ref(false);
		const authData = store.getters.getAuthData;

		if(authData.token) {
			router.push({ name: authData.userRole + 'Profile' });
			return
		}

		show.value = true;

		return {
			show
		}
	}
}
</script>

<style lang="sass">
.layout-auth
	flex-direction: column
	padding-top: 50px
	background: c_layout_main() url('./../assets/bg-main.png') no-repeat 50%
	background-size: cover
	&_empty
		align-items: center
		justify-content: center

	.header-auth
		display: flex
		align-items: center
		justify-content: space-between
		&__logo
			width: 100%
			max-width: 280px
			height: 47px
		&__servers
			&-link
				color: c_text_gray()
				text-decoration: none
				&:hover
					text-decoration: underline
			&-separator
				margin: 0 10px
				color: c_text_gray()

	.auth
		display: flex

	+media(screen(md))
		.header-auth
			flex-direction: column
			&__logo
				margin-bottom: 20px
</style>
