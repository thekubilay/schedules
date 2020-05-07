<template>
    <table class="schedule-list-table singular-list">
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
        <draggable v-model="drag_list" tag="tbody"> 
            <app-schedules-items v-for="(schedule, index) in get_schedules" :key="index" :schedule="schedule" />
        </draggable>
    </table>
</template>
<script>
import appSchedulesItems from "./schedule-items"
import draggable from "vuedraggable";
import { mapGetters } from 'vuex'
export default {
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
        drag_list: {
            set(val){
                this.$store.commit("set_schedules", val)
                let schedule_list = []
                let empty_rows = []
                this.get_schedules.forEach((element,index) => {
                    let new_index = index+1
                    let orders = {
                        "id": element.id,
                        "order_id": new_index
                    }
                    if (element.name != '') {
                        schedule_list.push(orders) 
                    } else {
                        empty_rows.push(orders)
                    }
                });
                this.$store.dispatch("insert_new_order_id", {"orders":schedule_list})
                this.$store.dispatch("empty_row_order_id", {"orders":empty_rows})
            },
            get(){
                return this.$store.state.schedule.schedules
            }
        },
    },
}
</script>
<style>

/* table */
table.schedule-list-table {
    background-color: whitesmoke;
    border: 2px solid #00008b;
    font-size: 15px;
}

/* table headers */
table.schedule-list-table thead tr {
    background-color: white;
    
}
table.schedule-list-table thead tr th.schedule-item {
    text-align: center;
    font-weight: 500;
    padding: 15px 0;
    color: #00008b;    
    border-right: 2px solid #00008b;
}
table.schedule-list-table thead tr th.schedule-item:nth-child(1) {
    text-align: center;
    width: 125px;
    min-width: 125px;
}
/* table.schedule-list-table thead tr th.schedule-item:nth-child(2) {
    width: 74px;
    text-align: center;
} */
table.schedule-list-table thead tr th.schedule-item:nth-child(2) {
    width: 300px;
}

table.schedule-list-table thead tr th.schedule-item:nth-child(3), 
table.schedule-list-table thead tr th.schedule-item:nth-child(4) {
    width: 125px;
}
table.schedule-list-table thead tr th.schedule-item:nth-child(5) {
    width: 185px;
}
</style>