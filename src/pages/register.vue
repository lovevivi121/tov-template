<template>
	<div class="login-container">
		<el-row :gutter="20" type="flex" align="bottom">
			<el-col :span="8" :offset="8">
				<registerForm></registerForm>
			</el-col>
		</el-row>
	</div>
</template>

<style>
.login-container {
	margin-top: 4%;
	height: 100%;
	/* background-color: #3498db; */
}
</style>
