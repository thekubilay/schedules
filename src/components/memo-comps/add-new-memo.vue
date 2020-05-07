<template>
    <div class="popup-bg" v-if="new_memo_form">
        <div class="blurred"></div>
        <div class="new-memo-form">
            <div class="flex align-ver align-hor close-bar" @click="close()"><i class="fas fa-times"></i></div>
            <h3 class="dialog-title">メモ入力フォーム</h3>
            <textarea rows="4" cols="50" v-model="memo"></textarea>

            <button
                @click="add_new_memo()"
                class="add-btn"
            >
                {{schedule_memo}}
            </button>        
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return {
            memo: "",
        }
    },
    methods: {
        close(){
            this.$store.state.memos.new_memo_form = false;
        },
        add_new_memo(position = null, color){
            this.$store.state.memos.new_memo_form = false;
            let payload = {
                "memo": this.memo,
                "created_at": this.selected_date
            }
            this.$store.dispatch("insert_memos", payload)
            this.$store.state.members.popup = false;
        }
    },
    computed: {
        ...mapGetters({
            setting:"get_settings",
            new_memo_form:"get_new_memo_form",
            selected_date:"get_selected_date",
            vuex_memo:"get_memos",
        }),
        close_form: {
            set(val){
                this.$store.commit("set_new_memo_form", val)
            }, 
            get(){
                return this.new_memo_form
            },
        },
        schedule_memo(){
            let str = "メモ追加"
            if(this.vuex_memo.length){
                this.memo = this.vuex_memo[0].memo;
            } else {
                this.memo = ""
            }
            return str
        }
    }
}
</script>
<style>
.popup-bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: .3s ease;
}
.popup-bg .new-memo-form .close-bar {
    top: -10px;
    cursor: pointer;
    right: -10px;
    position: absolute;
    z-index: 12;
    width: 40px;
    background-color: white;
    height: 40px;
    -webkit-box-shadow: 0px 2px 56px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 56px -9px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 56px -9px rgba(0,0,0,0.75);
}
.popup-bg .new-memo-form .close-bar .fa-times {
    font-size: 25px;
}
.popup-bg .blurred {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.308);
}
.popup-bg .new-memo-form {
    top: 45%;
    left: 50%;
    transform: translate(-50%,-42%);
    width: 500px;
    z-index: 11;
    background-color: white;
    padding: 25px;
}
.popup-bg .new-memo-form h3.dialog-title {
    margin: 15px 0;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}
.popup-bg .new-memo-form textarea {
    padding: 15px;
    width: 100%;
    margin-bottom: 15px;
}
.popup-bg .new-memo-form button.add-btn {
    transform: translateY(3px);
    outline: 0;
    border: 0;
    margin-top: 15px;
    display: block;
    margin: auto;
    width: 75%;
    min-width: 125px;
    height: 38px;
    font-size: 14px;
    color: whitesmoke;
    background-color: #2f3542;
    transition: .2s ease;
}
.popup-bg .new-memo-form button.add-btn:hover {
    transform: translateY(0);
    -webkit-box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
    -moz-box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
    box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
}

</style>