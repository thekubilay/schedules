// require('es6-promise').polyfill();
import Vue from 'vue'
import Vuex from 'vuex'
import {schedule} from "./schedule";
import {memos} from "./memos";
import {password} from "./password";
import {members} from "./members";
import {settings} from "./settings";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		schedule,
		memos,
		members,
		settings,
		password
	},	
})