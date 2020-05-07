<template>
    <div class="member-list">
        <app-add-new-member />
        <div class="flex between align-ver top-header">
            <h2 class="member-list-title" v-if="setting.length">利用者名の登録・削除・並び替え</h2>
            <h2 class="member-list-title member-title-sp" v-if="setting.length">利用者名の登録<br>削除・並び替え</h2>
            <button
                @click="add_new_member()"
                class="add-member-btn"
            >
                メンバー追加
            </button>
        </div>
        <table class="member-list-table">
            <thead>
                <tr>
                    <th class="member-item">#</th>
                    <th class="member-item">名前</th>
                    <th class="member-item">修正</th>
                    <th class="member-item">削除</th>
                </tr>
            </thead>
            <draggable v-model="drag_user" tag="tbody">
                <app-member-items v-for="(user,index) in users" :key="index" :user="user" :index="index" />
            </draggable>
        </table>
        <div class="flex between btn-wrap-mem">
            <button
                @click="return_to()"
                class="return-btn"
                shadow
                square
            >
                <i class="fas fa-arrow-left"></i>行動予定表
            </button>

            <button
                @click="add_row()"
                class="return-btn add-btn-mm"
                shadow
                square
            >
                白空行追加
            </button>
        </div>
    </div>
</template>
<script>
import appAddNewMember from "./add-new-member"
import appMemberItems from "./member-items"
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
    components: {
        appAddNewMember,
        appMemberItems,
        draggable
    },
    methods: {
        return_to(){
            this.$router.push({name:'schedule'})
        },
        add_new_member(){
            this.$store.state.members.popup = true;
        },
        add_row() {
            this.$store.dispatch("add_empty_row", {date:this.date}) 
            setTimeout(() => {
                let empty_rows = []
                let len = this.users.length
                let id = this.users[len-1].id
                let orders = {
                    "id": id,
                    "order_id": len
                }
                empty_rows.push(orders)
                this.$store.dispatch("empty_row_order_id", {"orders":empty_rows})
            }, 200);
        },
    },
    computed: {
        ...mapGetters({
            setting:"get_settings",
            new_member_form:"get_new_member_form",
            users:"get_schedules",
            date: "get_selected_date"
        }),
        drag_user: {
            set(val){
                this.$store.commit("set_schedules", val)
                let schedule_list = []
                let empty_rows = []
                this.users.forEach((element,index) => {
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
        }
    },
}
</script>
<style>
.member-list {
    width: 100%;
    color: #353b48;
    margin-bottom: 100px;
}
.member-list .top-header {
    padding: 10px 15px;
}
.member-list .top-header h2.member-list-title {
    font-size: 15px;
    font-weight: 500;
}
.member-list button {
    background-color: #2f3542;
    color: white;
    outline: 0;
    border: 0;
    width: 100px;
    height: 38px;
    font-size: 12px;
    font-weight: 500;
    transition: .2s ease;
}
.member-list .return-btn {
    width: 125px;
    display: block;
    margin: auto;
    margin-top: 50px;
}
.member-list button:hover {
    transform: translateY(-2px);
}
.member-list .return-btn .fa-arrow-left {
    background-color: #2f3542;
    margin-right: 10px;    
    color: white;
}



.member-list table.member-list-table {
    width: 100%;
    background-color: whitesmoke;
}

/* table headers */
.member-list table.member-list-table thead tr th.member-item {
    text-align: center;
    padding: 15px 0;
    border-right: 1px solid #ced6e0;
    border-bottom: 4px solid #a4b0be;
    font-weight: 500;
    font-size: 15px;
    
}
.member-list table.member-list-table thead tr th.member-item:nth-child(1) {
    width: 75px;
    min-width: 75px;
}
.member-list table.member-list-table thead tr th.member-item:nth-child(2) {
    width: 100%;
    text-align: left;
    padding-left: 15px;
}
.member-list table.member-list-table thead tr th.member-item:nth-child(3) {
    width: 75px;
    min-width: 75px;
    border-right: 0;
}
.member-list table.member-list-table thead tr th.member-item:nth-child(4) {
    width: 75px;
    min-width: 75px;
    border-right: 0;
}

/* table body */
.member-list table.member-list-table tbody tr td.member-item {
    height: 40px;
    border-right: 1px solid #ced6e0;
    border-bottom: 1px solid #ced6e0;
    vertical-align: middle;
    font-size: 13px;
}
.member-list table.member-list-table tbody tr td.member-item:nth-child(1) {
    text-align: center;
}
.member-list table.member-list-table tbody tr td.member-item:nth-child(2) {
    padding-left: 10px;
}
.member-list table.member-list-table tbody tr td.member-item:nth-child(4) {
    text-align: center;
    border-right: 0;
}

</style>