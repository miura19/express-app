<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from "axios";

type User = {
	id: number,
	name: string,
};
const users_array = ref<User[]>([])
const error_message = ref<string | null>(null)
const status: number | null = window.history.state.status;
const showMessage = ref<boolean>(false); // 表示・非表示の状態
const message = ref<string>("ログイン成功しました！"); // メッセージ用のリアクティブ変数

onMounted(() => {
	if (window.history.state.status) {
		showMessage.value = true;
		// 3秒後にフェードアウト
		setTimeout(() => {
		showMessage.value = false;
		// メッセージをクリア（URLをクリーンにする）
		history.replaceState({}, "", "/home");
		}, 3000);
	}
});

const getAllUsers = async () => {
	try {
		const fetch_data = await axios.get('http://localhost:3000/users', {
			withCredentials: true
		});
		if (fetch_data.status !== 200) {
			throw new Error(`APIエラー ${fetch_data.status} ${fetch_data.statusText}`);
		}
		const users: User[] = fetch_data.data;
		console.log(users);
		users_array.value = users

	} catch (error) {
		console.error(error);
		error_message.value = "ユーザーの取得に失敗しました。時間をおいて再試行してください。"
	}
}

onMounted(() => {
	getAllUsers()
})


</script>

<template>
	<main>
		<h2 v-if="error_message">{{ error_message }}</h2>
		<h2 v-else>ユーザ一覧</h2>
		<transition name="fade">
			<span class="text-lg font-medium p-4 bg-sky-600 rounded-md text-white" v-if="showMessage">{{ message }}</span>
		</transition>
		<ul>
			<li v-for="user in users_array" :key="user.id">{{ user.name }}</li>
		</ul>
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
