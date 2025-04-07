<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from "axios";

type User = {
	id: number,
	name: string,
};
const users_array = ref<User[]>([])
const error_message = ref<string | null>(null)

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
		<ul>
			<li v-for="user in users_array" :key="user.id">{{ user.name }}</li>
		</ul>
	</main>
</template>
