<template>
	<div id="app">
		<router-view />
		<app-footer v-if="this.$route.name != 'panel'" />
	</div>
</template>
<script>
import appFooter from "./components/footer"
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
	}
}
</script>
<style>
@import "./assets/css/reset.css";
@import "./assets/css/master.css";

</style>