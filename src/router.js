import Vue from 'vue'
import VueRouter from 'vue-router'
import schedule from './views/schedule.vue'
import panel from './views/panel.vue'
import change_password from './views/password.vue'
import settings from './views/settings.vue'
import members from './views/members.vue'
import seperate_settings from './views/seperate-settings.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'schedule',
		component: schedule
	},
	{
		path: '/panel',
		name: 'panel',
		component: panel,
		children: [
			{
				path: '/change-password',
				name: 'change_password',
				component: change_password
			}, 
			{
				path: '/panel/settings',
				name: 'settings',
				component: settings
			}, 
			{
				path: '/panel/members',
				name: 'members',
				component: members
			}, 
			{
				path: '/panel/seperate-settings',
				name: 'seperate_settings',
				component: seperate_settings
			}, 
		]
	}, 	
]

const router = new VueRouter({
	routes
})

export default router