<template>
	<div class="login-container">
		<el-row :gutter="20" type="flex" align="bottom">
			<el-col :span="8" :offset="8">
				<LoginForm></LoginForm>
			</el-col>
		</el-row>
	</div>
</template>

<style>
.login-container {
	height: 100%;
	padding-top: 10%;
	/* background-color: #3498db; */
}
</style>
