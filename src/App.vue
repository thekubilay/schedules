<template>
	<div id="app" :class="{appHeigth: get_users.length > 7 && this.$route.name != 'panel'}" class="flex column between align-ver app-class">
		<router-view class="mains" :class="{appHeigth: get_users.length > 7 && this.$route.name != 'panel'}"/>
		<app-footer />
	</div>
</template>
<script>
import appFooter from "./components/footer"
import axios from "axios"
import { mapGetters } from 'vuex';
export default {
	components: {
		appFooter,
	},
	data(){
		return {
			pays: {
				id: "",
				content: null,
            holiday_work_start: null,
            holiday_work_finish: null,
            return_date: null,
				return_time: null,
            display_returns: true,
            direct_returns: false,
            remarks: null,
			}
		}
	},
	created(){
		this.$store.dispatch("load_users")
		this.$store.dispatch("load_settings")

		let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		if(dd<10) 
		{
			dd='0'+dd;
		} 

		if(mm<10) 
		{
			mm='0'+mm;
		} 

		today = yyyy+'-'+mm+'-'+dd;


		this.$store.dispatch("load_schedules", {"date":today})		
		this.$store.dispatch("load_memos", {"date":today})
		this.$store.state.schedule.selected_date = today		

		// every 15 min
		setTimeout(() => {
			window.location.reload();
		}, 15 * 60 * 1000);
	},	
	computed: {
		...mapGetters([
			"get_users",
			"get_empty_row",
			"get_schedules",
			"get_yesterday_schedules",
		])
	}
}
</script>
<style>
@import "./assets/css/reset.css";
@import "./assets/css/master.css";

.app-class {
	height: 100vh;
}
.appHeigth {
	height: 100% !important;
}
.mains {
	margin-bottom: 150px;
}

/* router transitions */
/* it's called for main routes and panel's routes */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transition: opacity .5s;
  opacity: 0;
}

</style>