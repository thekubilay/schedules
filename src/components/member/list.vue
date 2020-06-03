<template>
    <table class="member-table">
        <thead>
            <tr>
                <th class="member-item">#</th>
                <th class="member-item">名前</th>
                <th class="member-item">修正</th>
                <th class="member-item">削除</th>
            </tr>
        </thead>
        <draggable v-model="drag_user" tag="tbody">
            <app-member-items v-for="(member, index) in get_schedules" :key="index" :member="member" :index="index" />
        </draggable>
    </table>
</template>
<script>
import appMemberItems from "./list-items"
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
    components: {
        appMemberItems,
        draggable
    },
    computed: {
        ...mapGetters([
            "get_schedules",
            "get_selected_date",
        ]),
        drag_user: {
            set(val){
                this.$store.commit("set_schedules", val)
                let schedule_list = []
                this.get_schedules.forEach((element, index) => {
                    let new_index = index+1
                    let orders = {
                        "id": element.id,
                        "order_id": new_index
                    }
                    schedule_list.push(orders)
                });
                this.$store.dispatch("insert_new_order_id", {"orders":schedule_list})
            },
            get(){
                return this.$store.state.schedule.schedules
            }
        }
    },
}
</script>
