<template lang="pug">
.layout-admin
	.layout__row
		nav.layout__side-nav.side-nav
			.side-nav__logo-wrap
				router-link(:to="{name: 'AdminProfile'}")
					img.side-nav__logo(src="@/assets/logo.png" alt="Transferino")
			router-link.side-nav__item(:to="{ name: 'AdminProfile' }") {{ $t('layoutAdmin.nav.allDatabase') }}
			router-link.side-nav__item(:to="{ name: 'AdminConfirmation' }") {{ $t('layoutAdmin.nav.confirmation') }}
			span.side-nav__item(@click="logout") {{ $t('layoutAdmin.nav.logout') }}
		.layout__content
			.layout-admin__hello
				span.layout-admin__hello-label {{ $t('layoutAdmin.hello') }}
				span.layout-admin__hello-email {{ store.getters.getAuthData.userId }}
			router-view(v-slot="{ Component }").admin
				transition(name="fade" mode="out-in")
					component(:is="Component")
	CFooter
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	name: 'LayoutAdmin',
	setup() {
		const router = useRouter();
		const store = useStore();

		const logout = () => {
			store.commit('logout');
			router.push({ name: 'AuthLogin' });
		};

		return {
			store,
			logout
		};
	}
}
</script>

<style lang="sass">
.app
	background: c_layout_admin()

.layout-admin
	background: c_layout_admin()
	background-image: url('./../assets/bg-main.png')
	background-position: 50% 0%
	background-repeat: no-repeat
	background-size: 100%
	.layout__content
		display: flex
		flex-direction: column
		padding-top: 40px
		overflow-x: hidden
		.layout-admin__hello
			align-self: flex-end
			display: flex
			flex-direction: column
			align-items: flex-end
			margin-bottom: 20px
			&-label
				margin-bottom: 5px
				color: c_text_gray()
				font-size: .75em
				font-weight: 600
			&-email
				font-size:
	.admin
		&__title
			margin-bottom: 40px
			font-size: 1.75em
			font-weight: 500
</style>
