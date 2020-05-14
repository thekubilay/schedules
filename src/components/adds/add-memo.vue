<template>
    <div class="popup-bg">
        <div class="blurred"></div>
        <div class="popup-frame add-member">
            <div @click="close_add_box()" class="flex align-ver align-hor close pointer"><i class="fas fa-times"></i></div>
            <h3 class="popup-frame-title">メモ入力フォーム</h3>
            <textarea rows="4" cols="50" v-model="memo"></textarea>
            <button @click="insert_memo()" class="popup-btn btn pointer">メンバー登録</button>
            {{empty_txt}}
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            memo: "",
        }
    },
    methods: {
        close_add_box(){
            this.$store.state.schedule.add_memo = false
        },
        insert_memo(){
            this.$store.state.schedule.add_memo = false;   
            let payload = {
                "memo": this.memo,
                "created_at": this.get_selected_date
            }
            this.$store.dispatch("insert_memo", payload)
        }
    },
    computed: {
        ...mapGetters([
            "get_users",
            "get_schedules",
            "get_selected_date",
            "get_memo"
        ]),
        empty_txt(){
            if (this.get_memo.length) {
                this.memo = this.get_memo[0].memo
            }

            return ""
        }
    }
}
</script>
<style>
.popup-bg .popup-frame textarea {
    width: 100%;
    font-size: 14px;
    margin-bottom: 15px;
    padding: 10px;
}

</style>