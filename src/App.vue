<template>
	<div id="app">
		<router-view />
		<app-footer v-if="this.$route.name != 'panel'" />
		{{ get_setting_load == 2 ? refreshing() : ""}}
	</div>
</template>
<script>
import appFooter from "./components/footer"
import { mapGetters } from 'vuex';
export default {
	components: {
		appFooter,
	},
	created(){
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


		this.$store.state.schedule.selected_date = today		
		this.$store.dispatch("load_schedule", {"date":today});
		this.$store.dispatch("load_memo", {"date":today})     
		this.$store.dispatch("load_setting");

		// every 15 min
	},
	methods: {
		refreshing(){
			setTimeout(() => {
				window.location.reload();
			}, this.update_time * 60 * 1000);
		},
	},
	computed: {
		...mapGetters([
			"get_settings",
			"get_setting_load",
		]),
		update_time(){
			if (this.get_setting_load == 2) {
				return this.get_settings[0].update_time				
			}
		}
	}
}
</script>
<style>
@import "./assets/css/reset.css";
@import "./assets/css/master.css";

</style>