<template>
    <div class="password">
        <h1 class="password-title">ユーザー名・パスワード更新</h1>

    </div>        
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        update_account(position = null, color){
            const noti = this.$vs.notification({
                // progress: 'auto',
                color,
                position,
                title: "通知",
                text: "ユーザー名とパスワードは更新されました"
            })
            let payload = {
                "username": this.username,
                "password": this.password
            }
            this.$store.dispatch("update_account", payload)
        }
    },
    computed: {
        ...mapGetters({
          
        }),
    }
}
</script>
<style>
.password {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-30%, -50%);
}
.password h1.password-title {
    margin: 15px 0;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}
.password .vs-input-parent {
        margin-bottom: 15px;
}
.password .vs-input {
    border-radius: 0;
    width: 200px;
    background-color: white;
}
.password .vs-button.add-btn {
    width: 200px;
    background-color: #2f3542;
    color: whitesmoke;
    font-weight: 500;
}
</style>