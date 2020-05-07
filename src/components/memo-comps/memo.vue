<template>
    <div class="flex column schedule-memo">
        <div class="flex between">
            <div>
                <button v-if="settings.length && settings[0].memo_field == 1" @click="add_new_memo()"
                    class="add-btn">
                    連絡メモ
                </button>
            </div>
            <!-- <button @click="add_row()" class="add-btn">
                空白行追加
            </button> -->
        </div>
        <div class="memo-container" v-if="memo.length && settings[0].memo_field == 1">
            {{memo[0].memo}}
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
    components: {},
    methods: {
        add_new_memo() {
            this.$store.state.memos.new_memo_form = true;
        },
        add_row() {
            this.$store.dispatch("add_empty_row", {date:this.date}) 
            setTimeout(() => {
                this.$store.dispatch("load_schedules", {date:this.date})                    
            }, 200);   
        }
    },
    computed: {
        ...mapGetters({
            rows: "get_empty_row",
            date: "get_selected_date",
            schedules: "get_schedules",
            new_memo_form: "get_new_memo_form",
            memo: "get_memos",
            settings: "get_settings",

        }),
    },
}
</script>
<style>
.schedule-memo {
    margin-top: 25px;
}

.schedule-memo .memo-container {
    margin-top: 10px;
    padding-left: 10px;
}

.schedule-memo button.add-btn {
    height: 38px;
    font-size: 14px;
    width: 125px;
    background-color: #2f3542;
    color: whitesmoke;
    margin-top: 10px;
    width: 100px;
    font-weight: 400;
    transition: .2s ease;
    outline: 0;
    border: 0;
}
.schedule-memo button.add-btn:hover {
 transform: translateY(-3px);
}
</style>