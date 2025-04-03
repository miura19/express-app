<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { RouterLink } from 'vue-router'
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { requiredMessage, emailMessage, minLengthMessage } from "../plugin/validatorMessage"

const name = ref<string>("");
const duplicateEmailFlag = ref<boolean>(false);
const duplicateEmailMessage = ref<string>("メールアドレスが重複しています");
const errors = ref<any>([]);

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

const registUser = async () => {
	console.log("register called");
	try {
		const response = await axios.post("http://localhost:3000/users", {
			name: name.value,
			email: state.email,
			password: state.password
		})		
		console.log(response.data);
	} catch (error: any) {
		if (error.response.status === 400) {
			errors.value = error.response.data.errors
			console.error('❌ 登録失敗' , error.response.data.errors);
		} else {
			console.error('❌ サーバーエラー' , error);
			alert("❌ サーバーエラーが発生しました。しばらく時間をおいて再度お試しください")
		}
		
	}
}

const checkExistsEmail = async () => {
	console.log("checkExistsEmail called");
	try {
		const response = await axios.get("http://localhost:3000/users/check-email", {
			params: {email : state.email}
		})		
		console.log(response.data);
		duplicateEmailFlag.value = response.data.duplicateFlag
	} catch (error) {
		console.error('❌ メール重複確認失敗' , error);
	}
	
}

const isinputDataDisabled = computed(() => {
	return name.value === "" || state.email === "" || state.password === "" || duplicateEmailFlag.value || v$.value.$errors.length > 0
})

const isinputDataBtnColor = computed(() => 
	name.value === "" || state.email === "" || state.password === "" || duplicateEmailFlag.value || v$.value.$errors.length > 0
		? "bg-sky-700 transition-all duration-300"
		: "bg-sky-400 transition-all duration-300"
)

</script>

<template>
	<main>
		<div class="bg-gray-100 min-h-screen flex items-center justify-center">
			<div class="bg-white p-8 rounded-lg shadow-lg w-2/5">
				<h2 class="text-2xl font-bold mb-6 text-center text-gray-800">ユーザー登録</h2>
				<form action="#" method="POST" @submit.prevent="registUser">
					<div v-if="errors.length">
						<p v-for="(error, index) in errors" :key="index" class="mt-2 text-red-500">
							{{ error.msg }}
						</p>
					</div>
					<div class="mb-4">
						<label for="text" class="block text-sm font-medium text-gray-700">名前</label>
						<input v-model="name" type="text" id="text" name="text" placeholder="田中太郎" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
					</div>
					<div class="mb-4">
						<label for="email" class="block text-sm font-medium text-gray-700">メールアドレス</label>
						<input v-model="state.email" @blur="checkExistsEmail(); v$.email.$touch();" type="email" id="email" name="email" placeholder="your@example.com" autocomplete="username" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
						<p v-if="duplicateEmailFlag" class="mt-2 text-red-500">{{ duplicateEmailMessage }}</p>
						<p v-if="v$.email.$errors.length" class="mt-2 text-red-500">{{ v$.email.$errors[0].$message }}</p>
					</div>
					<div class="mb-6 relative">
						<label for="password" class="block text-sm font-medium text-gray-700">パスワード</label>
						<div class="relative">
							<input v-model="state.password" @input="v$.password.$touch();" type="password" minlength="8" maxlength="16" id="password" name="password" placeholder="••••••••" autocomplete="off" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
							<p v-if="v$.password.$errors.length" class="mt-2 text-red-500">{{ v$.password.$errors[0].$message }}</p>
						</div>
					</div>
					<button type="submit" :disabled="isinputDataDisabled" :class="isinputDataBtnColor" class="w-full text-white py-2 px-4 rounded-md shadow">
						登録
					</button>
				</form>
				<p class="mt-4 text-cyan-800 underline"><RouterLink to="/login">登録済みの方はこちらからログイン</RouterLink></p>
			</div>
		</div>
	</main>
</template>
