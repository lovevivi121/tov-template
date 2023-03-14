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
		<el-form-item label="再次输入密码" prop="repassword">
			<el-input v-model="ruleForm.repassword" type="password" />
		</el-form-item>
		<el-form-item label="用户名" prop="username">
			<el-input v-model="ruleForm.username" />
		</el-form-item>
		<el-form-item label="手机号" prop="telephone">
			<el-input v-model="ruleForm.telephone" />
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="ruleForm.email" />
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)">
				注册
			</el-button>
			<el-button @click="resetForm(ruleFormRef)">清空</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
	password: 'Wang0989',
	repassword: 'Wang0989',
	sno: 'A13210491',
	telephone: '15039738621',
	username: '01ljw',
	email: '1842568012@qq.com',
})

const rules = reactive<FormRules>({
	sno: [
		{ required: true, message: '请输入学号', trigger: 'blur' },
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	repassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
	telephone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
	email: [{ required: true, message: '请输入学号', trigger: 'blur' }],
})

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
			await fetch('http://106.55.103.105:8083/v1/user/register', options)
				.then(async (res) => {
					let text = await res.json()
					console.log('res', text)
					if (res.status == 200) {
						ElMessage.success({
							message: text.msg,
						})
					} else {
						return Promise.reject({
							res: text,
						})
					}
				})
				.catch(async (err) => {
					// let text = await err.json()
					console.log(err.res, 'test')
					if (err.res.msg === '请求参数有误') {
						ElMessage.error({
							message: err.res.data,
						})
					} else {
						ElMessage.error({
							message: err.res.msg,
						})
					}
				})
		} else {
			ElMessage.warning({
				message: '请填写相关信息',
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
.login-container {
	height: 100%;
	/* background-color: #3498db; */
}
.el-card {
	margin-top: 10px !important;
}

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
