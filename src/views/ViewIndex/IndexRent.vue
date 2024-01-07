<template lang="pug">
.index-rent
	CRent(v-if="$route.params.id" :rentData="rentById" :isFull="true")
	CRent(v-else v-for="rent of rentData" :rentData="rent" :rent="rent" :isFull="false")
	//- span test
	//- span {{ $route.params.id }}
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
// import { reactive } from "vue";
// import { useRouter } from 'vue-router';
// import { useStore } from "vuex";
// import { useVuelidate } from "@vuelidate/core";
// import { required, email } from "@vuelidate/validators";

import CRent from '@/components/CRent';

export default {
	name: "IndexRent",
	components: {
		CRent
	},
	setup() {
		const route = useRoute();
		const rentData = ref(
			[
				{
					id: 12,
					images: ['./../assets/1.jpg'],
					title: 'Test 1',
					location: 'Tenerife',
					description: 'Desc',
					// isFull: true
				},
				{
					id: 13,
					images: ['./../assets/1.jpg'],
					title: 'Test 2',
					location: 'Tenerife',
					description: 'Desc',
					// isFull: true
				},
				{
					id: 14,
					images: ['./../assets/1.jpg'],
					title: 'Test 3',
					location: 'Tenerife',
					description: 'Desc',
					// isFull: true
				},
				{
					id: 15,
					images: ['./../assets/1.jpg'],
					title: 'Test 4',
					location: 'Tenerife',
					description: 'Desc',
					// isFull: true
				}
			]
		);

		console.log(route.params.id)

		const rentById = computed(() =>
			rentData.value.find(el => el.id == route.params.id)
		);

		console.log(rentById)

		return {
			rentById,
			rentData
		};
		// const loginSubmit = ref();
		// const router = useRouter();
		// const store = useStore();
		// const userData = reactive({
		//   email: null,
		//   password: null,
		// });

		// const userDataRules = {
		//   email: {
		//     required,
		//     email,
		//   },
		//   password: {
		//     required,
		//   },
		// };

		// const validator = useVuelidate(userDataRules, userData);

		// async function submitHandler() {
		//   validator.value.$touch();

		//   if (validator.value.$invalid) {
		//     return;
		//   }

		//   loginSubmit.value.disabled = true;

		//   await store.dispatch("login", {
		//     Email: userData.email,
		//     Password: userData.password,
		//   });

		//   console.log(store.getters.getLoginStatus);
		//   console.log(store.getters.getAuthData);

		//   if (store.getters.getLoginStatus === "success") {
		//     router.push({ name: store.getters.getAuthData.userRole + "Profile" });
		//   } else {
		//     userData.password = null;
		//     loginSubmit.value.disabled = false;
		//     alert("failed to login");
		//   }

		//   console.log("Email: ", userData.email);
		//   console.log("Password: ", userData.password);
		// }

		// return {
		//   userData,
		//   validator,
		//   loginSubmit,
		//   submitHandler,
		// };
	},
};
</script>

<style lang="sass">
.index-rent
	flex-wrap: wrap
	// flex-direction: column
	// align-items: center
	justify-content: center

</style>
