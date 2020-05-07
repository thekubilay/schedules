<template>
    <div class="popup-bg" v-if="popup">
        <div class="blurred"></div>
        <div class="new-member-form">
            <div class="flex align-ver align-hor close-bar" @click="close()"><i class="fas fa-times"></i></div>
            <h3 class="dialog-title">メンバー入力フォーム</h3>
            <input type="text"
                v-model="new_user"
                class="square-input"
                v-if="setting.length"
                :maxlength="setting[0].name_field"
                placeholder="名前"
            >
            <button
                @click="add_new_member()"
                class="add-btn"
            >
                追加
            </button>        
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return {
            new_user: "",
        }
    },
    methods: {
        close(){
            this.$store.state.members.popup = false;
        },
        add_new_member(position = null, color){
            this.$store.state.members.new_member_form = false;
            this.$store.dispatch("insert_user", {"user":this.new_user})
            this.new_user = ""
            this.$store.state.members.popup = false

            setTimeout(() => {
                let schedule_list = []
                let len = this.schedule_list.length
                let userlen = this.users.length
                let id = this.schedule_list[userlen-1].id
                let orders = {
                    "id": id,
                    "order_id": len
                }
                schedule_list.push(orders)
                this.$store.dispatch("insert_new_order_id", {"orders":schedule_list})
            }, 200);
        }
    },
    computed: {
        ...mapGetters({
            popup:"get_popup",
            schedule_list:"get_schedules",
            users:"get_users",
            setting:"get_settings",
            new_member_form:"get_new_member_form",
            selected_date:"get_selected_date",
        }),
        close_form: {
            set(val){
                this.$store.commit("set_new_member_form", val)
            }, 
            get(){
                return this.new_member_form
            },
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
.popup-bg .new-member-form .close-bar {
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
.popup-bg .new-member-form .close-bar .fa-times {
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
.popup-bg .new-member-form {
    top: 45%;
    left: 50%;
    transform: translate(-50%,-42%);
    width: 400px;
    z-index: 11;
    background-color: white;
    padding: 25px;
}
.popup-bg .new-member-form h3.dialog-title {
    margin: 15px 0;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}
.popup-bg .new-member-form input.square-input {
    border-radius: 0;
    width: 100%;
    height: 32px;
    padding-left: 10px;
    margin-bottom: 15px;
}
.popup-bg .new-member-form button.add-btn {
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
.popup-bg .new-member-form button.add-btn:hover {
    transform: translateY(0);
    -webkit-box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
    -moz-box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
    box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
}
</style>