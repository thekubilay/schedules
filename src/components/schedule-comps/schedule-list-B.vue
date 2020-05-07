<template>
    <table class="schedule-list-table">
        <thead>
            <tr>
                <th class="schedule-item">名前</th>
                <!-- <th class="schedule-item">在席</th> -->
                <th class="schedule-item">行先</th>
                <th class="schedule-item">休日予定</th>
                <th class="schedule-item">帰社日時</th>
                <th class="schedule-item">備考</th>
            </tr>
        </thead>
        <tbody> 
            <app-schedules-items v-for="schedule in schedules.table_two" :key="schedule.sec_index" :schedule="schedule" />
        </tbody>
    </table>
</template>
<script>
import appSchedulesItems from "./schedule-items"
import draggable from "vuedraggable";
import { mapGetters } from 'vuex'
export default {
    props: {
        schedules: Object,
    },
    components: {
        appSchedulesItems,
        draggable
    },
    data(){
        return {}
    },
    computed: {
        ...mapGetters([
            "get_schedules",
            "get_settings",
        ]),
        settings(){
            return this.get_settings[0]
        },
    },
}
</script>