import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import i18n from '@/i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'

import CFooter from '@/components/CFooter'

// Save it here for tests
// To test the login, I've created the user for us:
// E-Mail: zvaenr09@gmail.com
// Password: loginTest123!

// test-user for Team:

// Email: zvaenr@outlook.de
// Password: loginTest123!

// Admin-User:
// svenner09@outlook.de
// loginTest123!

axios.defaults.baseURL = store.getters.getApiURL

createApp(App)
	.use(router)
	.use(store)
	.use(i18n)
	.use(VueAxios, axios)
	.component('CFooter', CFooter)
	.mount('#app')

