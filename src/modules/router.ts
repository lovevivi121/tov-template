import type { App } from 'vue'
import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes as fileRoutes } from 'vue-router/auto/routes'
import { ElMessage } from 'element-plus'

export const router = createRouter({
	history: createWebHistory(),
	routes: setupLayouts(fileRoutes),
})

router.beforeEach((to, from, next) => {
	if(to.path === '/') next()
	else {
		const token = window.sessionStorage.getItem('token')
		if(token) {
			if(to.path === '/login') {
				ElMessage.warning('请不要重复登录')
				next({name: from.path})
			}
			next()
		} else {
			if(to.path === '/login' || to.path === '/register') {
				return next()
			}
			ElMessage.error('请先登录或注册')
			return next({name: '/login'})
		}
	}
})

export default (app: App) => app.use(router)
