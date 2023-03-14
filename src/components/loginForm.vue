<template>
	<el-form
		ref="ruleFormRef"
		:model="ruleForm"
		:rules="rules"
		label-width="120px"
		class="demo-ruleForm"
		status-icon
	>
		<el-form-item label="学号" prop="sno">
			<el-input v-model="ruleForm.sno" />
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="ruleForm.password" type="password" />
		</el-form-item>
		<el-form-item class="btns">
			<el-button type="primary" @click="submitForm(ruleFormRef)"
				>登录</el-button
			>
			<el-button @click="resetForm(ruleFormRef)">清空</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
// import {login} from '@/api/api'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
	sno: 'A13210490',
	password: '123456',
})

const rules = reactive<FormRules>({
	sno: [
		{ required: true, message: '请输入学号', trigger: 'blur' },
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

// const loginApi =async () => {
// 	const await login(JSON.stringify(ruleForm))
// }

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate(async (valid) => {
		if (valid) {
			const options = {
				method: 'POST',
				headers: {
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				},
				body: JSON.stringify(ruleForm),
			}
			await fetch('http://106.55.103.105:8083/v1/user/login', options)
				.then(async (res) => {
					let text = await res.json()
					if (res.status == 200) {
						// console.log(text);

						window.sessionStorage.setItem('token', text.data.token)
						// jsCookie.set('sno',ruleForm.sno)
						// console.log("token",window.sessionStorage.getItem("token"));

						ElMessage.success({
							message: text.msg,
						})
						router.push('/home')
					} else {
						return Promise.reject({
							status: res.status,
							statusText: res.statusText,
							msg: text.msg,
						})
					}
				})
				.catch((err) => {
					console.log(err)
					ElMessage.error({
						message: err.msg,
					})
				})
		} else {
			ElMessage.warning({
				message: '请填写学号和密码',
			})
		}
	})
}

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}
</script>

<style scoped>
.el-form {
	background-color: #d9dce0;
	padding: 20px 10px;
	border-radius: 30px;
}

.el-input {
	width: 80%;
}

.btns {
	width: 83%;
	display: flex;
	justify-content: flex-end;
}
</style>
