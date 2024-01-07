import { createWebHistory, createRouter } from 'vue-router'
import i18n from './../i18n'
import LayoutMain from '@/layouts/LayoutMain'
// import { store } from '../store/index.js'

const locale = i18n.global.locale.value
const routes = [
	{
		path: '/',
		name: 'Direct',
		redirect: '/' + locale + '/home'
	},
	{
		path: '/:lang',
		name: 'Main',
		meta: {
			title: {
				en: 'Home',
				de: 'Zuhause'
			}
		},
		component: LayoutMain,
		children: [
			{
				path: '',
				redirect: '/' + locale + '/home'
			},
			{
				path: 'home',
				name: 'LayoutIndex',
				meta: {
					title: {
						en: 'Index',
						de: 'Index'
					}
				},
				component: () => import('@/layouts/LayoutIndex'),
				children: [
					{
						path: '',
						name: 'IndexHome',
						meta: {
							title: {
								en: 'Home',
								de: 'Home'
							}
						},
						component: () => import('@/views/ViewIndex/IndexHome')
					},
					{
						path: 'rent/:id?',
						name: 'IndexRent',
						meta: {
							title: {
								en: 'Rent',
								de: 'Rent'
							}
						},
						component: () => import('@/views/ViewIndex/IndexRent')
					},
					{
						path: 'forgot-password',
						name: 'AuthForgotPassword',
						meta: {
							title: {
								en: 'Forgot password',
								de: 'Passwort vergessen'
							}
						},
						component: () => import('@/views/ViewAuth/AuthForgotPassword')
					},
					{
						path: 'register',
						name: 'AuthRegister',
						meta: {
							title: {
								en: 'Register',
								de: 'Registrieren'
							}
						},
						component: () => import('@/views/ViewAuth/AuthRegister')
					},
					{
						path: 'register/confirm',
						name: 'AuthRegisterConfirm',
						meta: {
							title: {
								en: 'Register Confirm',
								de: 'Registrieren Confirm'
							}
						},
						component: () => import('@/views/ViewAuth/AuthRegisterConfirm')
					},
					{
						path: 'register/player',
						name: 'AuthRegisterPlayer',
						meta: {
							title: {
								en: 'Complete your player profile',
								de: 'Registrieren'
							}
						},
						component: () => import('@/views/ViewAuth/AuthRegisterPlayer'),
					},
					{
						path: 'register/team',
						name: 'AuthRegisterTeam',
						meta: {
							title: {
								en: 'Complete your team profile',
								de: 'Registrieren'
							}
						},
						component: () => import('@/views/ViewAuth/AuthRegisterTeam'),
					},
					{
						path: 'reset-password',
						name: 'AuthResetPassword',
						meta: {
							title: {
								en: 'Reset your password',
								de: 'Passwort zurücksetzen'
							}
						},
						component: () => import('@/views/ViewAuth/AuthResetPassword'),
					}
				]
			},
			{
				path: 'player',
				name: 'LayoutPlayer',
				meta: {
					auth: true,
					role: 'Player',
					title: {
						en: 'Player Dashboard',
						de: 'Spieler-Dashboard'
					}
				},
				component: () => import('@/layouts/LayoutPlayer'),
				children: [
					{
						path: '',
						name: 'PlayerProfile',
						meta: {
							title: {
								en: 'Player Dashboard',
								de: 'Spieler-Dashboard'
							}
						},
						component: () => import('@/views/ViewPlayer/PlayerProfile')
					},
					{
						path: 'statistics',
						name: 'PlayerStatistics',
						meta: {
							title: {
								en: 'Player Statistics',
								de: 'Spielerstatistik'
							}
						},
						component: () => import('@/views/ViewPlayer/PlayerStatistics')
					},
					{
						path: 'upload',
						name: 'PlayerUploadNewData',
						meta: {
							title: {
								en: 'Upload New Data',
								de: 'Upload New Data'
							}
						},
						component: () => import('@/views/ViewPlayer/PlayerUploadNewData')
					}
				]
			},
			{
				path: 'team',
				name: 'LayoutTeam',
				meta: {
					auth: true,
					role: 'Team',
					title: {
						en: 'Team Dashboard!',
						de: 'Team-Dashboard'
					}
				},
				component: () => import('@/layouts/LayoutTeam'),
				children: [
					{
						path: '',
						name: 'TeamProfile',
						meta: {
							title: {
								en: 'Team Dashboard',
								de: 'Team-Dashboard'
							}
						},
						component: () => import('@/views/ViewTeam/TeamProfile')
					},
					{
						path: 'search-players',
						name: 'TeamSearchPlayers',
						meta: {
							title: {
								en: 'Team Search Players',
								de: 'Team Search Players'
							}
						},
						component: () => import('@/views/ViewTeam/TeamSearchPlayers')
					},
					{
						path: 'unlocked-players',
						name: 'TeamUnlockedPlayers',
						meta: {
							title: {
								en: 'Team Unlocked Players',
								de: 'Team Unlocked Players'
							}
						},
						component: () => import('@/views/ViewTeam/TeamUnlockedPlayers')
					},
					{
						path: 'unlocked-player/:userId',
						name: 'TeamUnlockedPlayer',
						meta: {
							title: {
								en: 'Team Unlocked Player',
								de: 'Team Unlocked Player'
							}
						},
						component: () => import('@/views/ViewTeam/TeamUnlockedPlayer')
					},
					{
						path: 'unlock-player/:userId',
						name: 'TeamUnlockPlayer',
						meta: {
							title: {
								en: 'Team Unlock Player',
								de: 'Team Unlock Player'
							}
						},
						component: () => import('@/views/ViewTeam/TeamUnlockPlayer')
					},
					{
						path: 'credits',
						name: 'TeamCredits',
						meta: {
							title: {
								en: 'Buy more credits',
								de: 'Buy more credits'
							}
						},
						component: () => import('@/views/ViewTeam/TeamCredits')
					}
				]
			},
			{
				path: 'admin',
				name: 'LayoutAdmin',
				meta: {
					auth: true,
					role: 'Admin',
					title: {
						en: 'Admin Dashboard',
						de: 'Admin-Dashboard'
					}
				},
				component: () => import('@/layouts/LayoutAdmin'),
				children: [
					{
						path: '',
						name: 'AdminProfile',
						meta: {
							title: {
								en: 'Admin Dashboard',
								de: 'Admin-Dashboard'
							}
						},
						component: () => import('@/views/ViewAdmin/AdminProfile')
					},
					{
						path: 'player/:playerId',
						name: 'AdminPlayerDetail',
						meta: {
							title: {
								en: 'Player Profile',
								de: 'Spieler-Profil'
							}
						},
						component: () => import('@/views/ViewAdmin/AdminPlayerDetail')
					},
					{
						path: 'team/:teamId',
						name: 'AdminTeamDetail',
						meta: {
							title: {
								en: 'Team Profile',
								de: 'Team-Profil'
							}
						},
						component: () => import('@/views/ViewAdmin/AdminTeamDetail')
					},
					{
						path: 'confirmation/:confirmationId?',
						name: 'AdminConfirmation',
						meta: {
							title: {
								en: 'Admin Confirmation',
								de: 'Admin-Confirmation'
							}
						},
						component: () => import('@/views/ViewAdmin/AdminConfirmation')
					},
					// {
					// 	path: 'confirmation/:confirmationId?',
					// 	name: 'AdminConfirmationDetail',
					// 	meta: {
					// 		title: {
					// 			en: 'Confirmation Detail',
					// 			de: 'Confirmation-Detail'
					// 		}
					// 	},
					// 	component: () => import('@/views/ViewAdmin/AdminConfirmationDetail')
					// }
				]
			}
		]
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/' + locale + '/home'
	}
];

const router = createRouter({
	base: '/',
	history: createWebHistory(),
	routes
});

// router.beforeEach(async (to, from, next) => {
// 	// console.log(store.getters.getAuthData);

// 	if (!store.getters.getAuthData.token) {
// 		const access_token = localStorage.getItem("access_token");
// 		const refresh_token = localStorage.getItem("refresh_token");
		
// 		if (access_token) {
// 			const data = {
// 				token: access_token,
// 				refreshToken: refresh_token
// 			};		
// 			store.commit('saveTokenData', data);
// 		}
// 	}

// 	const authData = store.getters.getAuthData

// 	if (to.matched.some(m => m.meta.auth) && !authData.token) {
// 		next('/');
// 		return;
// 	}

// 	if(!to.matched.some(m => m.meta.role == authData.userRole) && to.matched.some(m => m.meta.role)) {
// 		next('/');
// 		return;
// 	}

// 	const appName = 'Transferino | ';
// 	let lang = to.params.lang;

// 	if (!i18n.global.availableLocales.includes(lang)) {
// 		router.push({
// 			params: {
// 				lang: 'en'
// 			}
// 		});
// 	}
// 	i18n.global.locale.value = lang

// 	const nearestTitle = to.matched
// 		.slice()
// 		.reverse()
// 		.find((r) => r.meta && r.meta.title);
// 	document.title = appName + nearestTitle.meta.title[lang];

// 	console.log('Auth: ', store.getters.isTokenActive)
// 	if(authData.token && !store.getters.isTokenActive) {
// 		await store.dispatch('login', {
// 			refresh: true,
// 			token: authData.token,
// 			refreshToken: authData.refreshToken
// 		})
// 	}
// 	if(!store.getters.isTokenActive && authData.token) {
// 		store.commit('logout');
// 		next('/');
// 		return
// 	}
// 	console.log('Auth: ', store.getters.isTokenActive)

// 	next();
// })

export default router