<script setup lang="ts">
import { ElMessage } from 'element-plus'
const { t, toggleLocale, language } = useLanguage()
const open2 = () => {
	ElMessage({
		message: 'Congrats, this is a success message.',
		type: 'success',
		duration: 0,
	})
}
</script>

<template>
	<div class="m-6">Hello，This is the tov template！！</div>
	<div class="cursor-pointer mt-6 ml-6" @click="toggleLocale()">
		<div>language: {{ language }}</div>
		<div>base: {{ t('about') }}</div>
		<div>nesting: {{ t('nesting.sir') }} {{ t('nesting.lady') }}</div>
	</div>
	<el-button :plain="true" @click="open2">success</el-button>
	<Counter />
</template>
