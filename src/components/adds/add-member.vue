<template>
    <div class="popup-bg">
        <div class="blurred"></div>
        <div class="popup-frame add-member">
            <div @click="close_add_box()" class="flex align-ver align-hor close pointer"><i class="fas fa-times"></i></div>
            <h3 class="popup-frame-title">メンバー入力フォーム</h3>
            <input v-model="member" type="text" placeholder="名前">
            <button @click="insert_member()" class="popup-btn btn pointer">メンバー登録</button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            member: "",
        }
    },
    methods: {
        close_add_box(){
            this.$store.state.member.add_member = false
        },
        insert_member(){
            this.$store.state.member.add_member = false;
            if (this.get_schedules.length) {
                let len = this.get_schedules.length   
                this.$store.dispatch("insert_user", {"user":this.member, "order_id": len+1})              
            } else {
                this.$store.dispatch("insert_user", {"user":this.member, "order_id": 1}) 
            }  
            
        }
    },
    computed: {
        ...mapGetters([
            "get_users",
            "get_schedules",
        ])
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
    position: fixed;
}
.popup-bg .blurred {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.308);
}

.popup-bg .popup-frame {
    top: 45%;
    left: 50%;
    transform: translate(-50%,-42%);
    width: 400px;
    z-index: 11;
    background-color: #fff;
    padding: 25px;
    position: fixed;
}
.popup-bg .popup-frame h3.popup-frame-title {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 500;
}
.popup-bg .popup-frame div.close {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 40px;
    height: 40px;
    background-color: white;
    box-shadow: 0 2px 56px -9px rgba(0,0,0,.75);
}
.popup-bg .popup-frame div.close .fa-times {
    font-size: 22px;
}


.popup-bg .popup-frame input,button {
    display: block;
}
.popup-bg .popup-frame input {
    border-radius: 0;
    width: 100%;
    height: 32px;
    padding-left: 10px;
    margin-bottom: 15px;
}
.popup-bg .popup-frame button.popup-btn {
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
    color: #f5f5f5;
    background-color: #2f3542;
}

@media screen and (max-width: 600px){
    .popup-bg .popup-frame {
        width: 435px !important;
    }
}

@media screen and (max-width: 485px){
    .popup-bg .popup-frame {
        width: 93% !important;
    }
    .popup-bg .schedule-frame .box-row p.column-title {
        width: 65px;
        min-width: 65px;
        font-size: 12px;
    }
    .popup-bg .schedule-frame .box-row .input-wrap .vdpComponent input {
        width: 100px;
        font-size: 10px;
    }
    .popup-bg .schedule-frame .box-row .input-wrap .selects {
        margin-right: 7px;
    }
    .popup-bg .schedule-frame .box-row .input-wrap .select-second {
        margin-right: 0;
    }

}


</style>