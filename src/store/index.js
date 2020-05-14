// require('es6-promise').polyfill();
import Vue from 'vue'
import Vuex from 'vuex'
import {schedule} from "./schedule";
import {member} from "./member";
import {setting} from "./setting";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		schedule,
		member,
		setting,
	},	
})