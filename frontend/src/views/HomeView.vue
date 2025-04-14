<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from "axios";
import { RouterLink, useRouter } from 'vue-router'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const router = useRouter();

type User = {
	id: number,
	name: string,
	email: string,
	created_at: string,
	updated_at: string,
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
	getAllUsers()
});

const formated_date = (dateString: string) => {
  	return dayjs.utc(dateString)            // UTCとして解釈
			.format("YYYY/MM/DD HH:mm:ss");  // 希望のフォーマットで表示
};

const getAllUsers = async () => {
	try {
		const fetch_data = await axios.get(import.meta.env.VITE_API_URL + "/api/users", {
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

const logout = () => {
	console.log("logout called");
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	router.push({ name: 'login' });
}

</script>

<template>
	<main>
		<section class="text-gray-600 body-font">
			<transition name="fade">
				<span class="text-lg font-medium p-4 bg-sky-600 rounded-md text-white" v-if="showMessage">{{ message }}</span>
			</transition>
			<div class="container mx-auto">
				<div class="mt-8"><button @click="logout" class="text-lg font-medium p-4 bg-sky-600 rounded-md text-white hover:bg-sky-400 transition-all duration-200">ログアウト</button></div>
				<div class="flex flex-col text-center w-full mb-12">
					<div v-if="error_message">{{ error_message }}</div>
					<div v-else class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">ユーザ一覧</div>
				</div>
				<div v-if="!error_message" class="lg:w-2/3 w-full mx-auto overflow-auto">
					<table class="table-auto w-full text-left whitespace-no-wrap">
						<thead>
							<tr>
								<th
									class="text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
									Id</th>
								<th
									class="text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
									Name</th>
								<th
									class="text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
									Email</th>
								<th
									class="text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
									Created_at</th>
								<th
									class="text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
									Updated_at</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="user in users_array" :key="user.id">
								<td class="px-4 py-3 text-center">{{ user.id }}</td>
								<td class="px-4 py-3 text-center">{{ user.name }}</td>
								<td class="px-4 py-3 text-center">{{ user.email }}</td>
								<td class="px-4 py-3 text-center">{{ formated_date(user.created_at) }}</td>
								<td class="px-4 py-3 text-center">{{ formated_date(user.updated_at) }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
	{
	opacity: 0;
}
</style>
