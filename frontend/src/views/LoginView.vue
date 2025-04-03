<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { requiredMessage, emailMessage, minLengthMessage } from "../plugin/validatorMessage"
import { useRoute } from "vue-router";

const route = useRoute();

const status: number | null = window.history.state.status;
console.log(status);

const message = ref<string>("登録成功しました！"); // メッセージ用のリアクティブ変数
const showMessage = ref<boolean>(false); // 表示・非表示の状態

onMounted(() => {
	if (window.history.state.status) {
		showMessage.value = true;
		// 3秒後にフェードアウト
		setTimeout(() => {
		showMessage.value = false;
		// メッセージをクリア（URLをクリーンにする）
		history.replaceState({}, "", "/login");
		}, 3000);
	}
});

const state = reactive({
	email: "",
	password: "",
});

const rules = {
	email: {
		required: helpers.withMessage(requiredMessage("メールアドレス"), required),
		email: helpers.withMessage(emailMessage, email),
	},
	password: {
		required: helpers.withMessage(requiredMessage("パスワード"), required),
		minLengthValue: helpers.withMessage(
			minLengthMessage("パスワード", 8),
			minLength(8)
		),
	},
};

const v$ = useVuelidate(rules, state);

const login = async () => {
	console.log("login called");
	
}
const isinputDataDisabled = computed(() => {
	return state.email === "" || state.password === "" || v$.value.$errors.length > 0
})

const isinputDataBtnColor = computed(() => 
	state.email === "" || state.password === "" || v$.value.$errors.length > 0
		? "bg-sky-700 transition-all duration-300"
		: "bg-sky-400 transition-all duration-300"
)

</script>

<template>
	<main>
		<div class="bg-gray-100 min-h-screen flex items-center justify-center">
			<div class="bg-white p-8 rounded-lg shadow-lg w-2/5">
				<transition name="fade">
					<span class="text-lg font-medium p-4 bg-sky-600 rounded-md text-white" v-if="showMessage">{{ message }}</span>
				</transition>
				<h2 class="text-2xl font-bold mb-6 text-center text-gray-800">ログイン</h2>
				<form action="#" method="POST" @submit.prevent="login">
					<div class="mb-4">
						<label for="email" class="block text-sm font-medium text-gray-700">メールアドレス</label>
						<input v-model="state.email" @blur="v$.email.$touch()" type="email" id="email" name="email" placeholder="your@example.com" autocomplete="username" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
						<p v-if="v$.email.$errors.length" class="mt-2 text-red-500">{{ v$.email.$errors[0].$message }}</p>
					</div>
					<div class="mb-6 relative">
						<label for="password" class="block text-sm font-medium text-gray-700">パスワード</label>
						<div class="relative">
							<input v-model="state.password" @input="v$.password.$touch();" type="password" minlength="8" maxlength="16" id="password" name="password" placeholder="••••••••" autocomplete="current-password" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
							<p v-if="v$.password.$errors.length" class="mt-2 text-red-500">{{ v$.password.$errors[0].$message }}</p>
						</div>
					</div>
					<button type="submit" :disabled="isinputDataDisabled" :class="isinputDataBtnColor" class="w-full text-white py-2 px-4 rounded-md shadow">
						ログイン
					</button>
				</form>
				<p class="mt-4 text-cyan-800 underline"><RouterLink to="/register">新規ユーザー登録はこちら</RouterLink></p>
			</div>
		</div>
	</main>
</template>

<style scoped>
	.fade-enter-active, .fade-leave-active {
	transition: opacity 1s ease;
	}

	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	opacity: 0;
	}
</style>