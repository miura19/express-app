<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
	<main>
		<div class="bg-gray-100 min-h-screen flex items-center justify-center">
			<div class="bg-white p-8 rounded-lg shadow-lg w-2/5">
				<h2 class="text-2xl font-bold mb-6 text-center text-gray-800">ユーザー登録</h2>
				<form action="#" method="POST">
					<div class="mb-4">
						<label for="text" class="block text-sm font-medium text-gray-700">名前</label>
						<input type="text" id="text" name="text" placeholder="田中太郎" required
							class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
					</div>
					<div class="mb-4">
						<label for="email" class="block text-sm font-medium text-gray-700">メールアドレス</label>
						<input type="email" id="email" name="email" placeholder="your@example.com" required
							class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
					</div>
					<div class="mb-6 relative">
						<label for="password" class="block text-sm font-medium text-gray-700">パスワード</label>
						<div class="relative">
							<input type="password" id="password" name="password" placeholder="••••••••" required
								class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
						</div>
					</div>
					<button type="submit"
						class="w-full bg-sky-500 text-white py-2 px-4 rounded-md shadow hover:bg-sky-600">
						登録
					</button>
				</form>
				<p class="mt-4 text-cyan-800 underline"><RouterLink to="/login">登録済みの方はこちらからログイン</RouterLink></p>
			</div>
		</div>
	</main>
</template>
