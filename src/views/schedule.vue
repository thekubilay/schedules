<template>
	<div class="schedule">
		<app-add-new-schedule />
		<app-add-new-memo />
		<app-schedule-date />
		<!-- pc -->

		<div class="flex align-hor double-table">
			<app-schedule-list-a :class="{marginAuto: get_schedules.length <= 5 }" class="schedule-table--one" v-if="get_settings_loaded == 2 && get_schedules_loaded == 2" :schedules="schedules" />
			<app-schedule-list-b class="schedule-table--two" v-if="get_settings_loaded == 2 && get_schedules_loaded == 2 && get_schedules.length > get_settings[0].row_number" :schedules="schedules" />
		</div>

		<app-memo />
	</div>
</template>

<script>
import appScheduleDate from "../components/schedule-comps/schedule-date"
import appScheduleList from "../components/schedule-comps/schedule-list"
import appScheduleListA from "../components/schedule-comps/schedule-list-A"
import appScheduleListB from "../components/schedule-comps/schedule-list-B"
import appAddNewSchedule from "../components/schedule-comps/add-new-schedule"
import appMemo from "../components/memo-comps/memo"
import appAddNewMemo from "../components/memo-comps/add-new-memo"
import { mapGetters } from 'vuex'
export default {
	components: {
		appAddNewSchedule,
		appAddNewMemo,
		appScheduleDate,
		appScheduleList,
		appScheduleListA,
		appScheduleListB,
		appMemo
	},
	mounted(){
		this.$store.dispatch("load_schedules", {"date":this.get_selected_date})
	},
	computed: {
		...mapGetters([
			"get_settings",
			"get_schedules",
			"get_selected_date",
			"get_settings_loaded",
			"get_schedules_loaded",
		]),
		schedules(){
			let row_number = parseInt(this.get_settings[0].row_number)				

			if (this.get_schedules.length > row_number) {
				let obj = {
					"table_one": "",
					"table_two": "",
				}
				obj.table_one = this.get_schedules.slice(0,row_number)
				obj.table_two = this.get_schedules.slice(row_number)
	
				return obj

			} else {
				let obj = {
					"table_one": "",
					"table_two": "",
				}
				obj.table_one = this.get_schedules
				return obj			
			}
		}
	}

}
</script>
<style>
.schedule {
	width:97%;
}

.schedule h1.board-title {
	margin-top: 100px;
}
div.schedule-list-table-sp {
	display: none;
}

.schedule .single-table{
	display: none;
}
.schedule .double-table {
	padding-bottom: 50px;
}
.schedule .double-table .schedule-table--one, .schedule-table--two {
	width: 49%;
}
.schedule .double-table .schedule-table--one {
	margin-right: 10px;
}
.schedule .double-table table tr {
	cursor: default;
}
.schedule .marginAuto {
	margin: auto !important;
}


/* @media all and (-ms-high-contrast:none) {
	*::-ms-backdrop, .schedule .double-table .schedule-table--one {
		margin-right: 100px;
	}
} */

@media screen and (max-width: 736px){
	.schedule {
		width:97%;
	}
	.schedule .double-table .schedule-table--one {
		margin-right: 10px;
	}
	table.schedule-list-table {
		font-size: 12px;
	}
	table.schedule-list-table thead tr th.schedule-item:nth-child(1) {
		text-align: center;
		width: 125px;
		min-width: 60px;
	}
	table.schedule-list-table td.schedule-item button.name-btn {
		width: 60px;
	}
}

@media screen and (max-width: 500px) {
	.schedule-date .right-box {
		position: relative;
		flex-direction: column;
		align-items: flex-end;
	}
	.schedule-date h2.schedule-title {
		font-size: 15px;
		font-weight: 500;
	}

	h2.schedule-title span.warning {
		font-size: 10px !important;
	}
	.schedule-date .right-box p.date-txt {
		font-size: 15px;
		z-index: 2;
		right: 0;
		color: #00008b;
		position: absolute;
	}
	.schedule-date .right-box .vdpComponent input {
		width: 175px;
	}
	.schedule-date .right-box .update-button {
		margin-left: 10px;
		width: 75px;
		height: 30px;
	}

	table.schedule-list-table thead tr th.schedule-item:nth-child(1) {
		text-align: center;
		width: 125px;
		min-width: 40px;
	}
	table.schedule-list-table td.schedule-item button.name-btn {
		width: 35px;
	}
	table.schedule-list-table {
		font-size: 10px;
	}

	
	.popup-bg .new-memo-form {
		width: 85%;		
	}
	.popup-bg .new-member-form {
		width: 85% !important;		
	}
	.popup-bg .new-schedule-form .inner-form .parts .left-item {
		width: 25%;
		min-width: 25%;
	}
	.popup-bg .new-schedule-form .inner-form .parts .right-item {
		width: 75%;
		min-width: 75%;
	}
	.popup-bg .inner-form {
		font-size: 12px;
	}
	.popup-bg .new-schedule-form .inner-form .parts .left-item {
		font-size: 12px;
	}
	.popup-bg .new-schedule-form .inner-form .parts .dates input {
		font-size: 12px;
		width: 80px;
		padding-left: 5px;
	}
	.popup-bg .new-schedule-form .schedule-add-btn {
		font-size: 12px;
		font-weight: 400;
	}

	footer ul.footer-inner {
		width: 270px;
		font-size: 14px;
	}
}
</style>