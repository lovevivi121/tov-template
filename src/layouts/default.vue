<template>
	<el-container style="height: 100%">
		<el-header>
			<el-row :gutter="20" type="flex">
				<el-col :span="1">
					<button @click="toPage('home')">首页</button>
				</el-col>
				<el-col :span="1" :pull="0">
					<button @click="toPage('login')">登录</button>
				</el-col>
				<el-col :span="1" :offset="0">
					<button @click="toPage('register')">注册</button>
				</el-col>
				<el-col :span="1.5" :pull="0">
					<div class="cursor-pointer" @click="toggleDark()">
						theme: {{ theme }}
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-main style="height: 100%">
			<transition name="el-fade-in-linear">
				<router-view />
			</transition>
		</el-main>
	</el-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const { isDark, toggleDark } = useDarks()
const theme = computed(() => (isDark.value ? 'dark' : 'light'))

const toPage = (path: any) => router.push(path)
</script>
