<template>
    <div id="members">
        <h1 class="member-title">利用メンバー設定</h1>
        <div class="flex between align-ver mem-h-wrap">
            <h2 class="info-txt">利用者名の登録・削除・並び替え</h2>
            <button @click="add_member()" class="btn">メンバー登録</button>
        </div>
        <app-member-list />
        <div class="flex between bottom-btn-wrap">
            <button @click="return_to()" class="btn">戻る</button>
            <button @click="add_blank()" class="btn">白空行追加</button>
        </div>
        <app-popup v-if="get_add_member == true"/>
    </div>
</template>
<script>
import appMemberList from '../components/member/list'
import appPopup from '../components/adds/add-member'
import { mapGetters } from 'vuex'
export default {
    components: {
        appMemberList,
        appPopup
    },
    methods: {
        add_member(){
            this.$store.state.member.add_member = true
        },
        return_to(){
            this.$router.push({name:"home"})
        },
        add_blank(){
            if (this.get_schedules.length) {
                let len = this.get_schedules.length   
                this.$store.dispatch("add_blank_row", {"date":this.get_selected_date, "order_id": len+1})              
            } else {
                this.$store.dispatch("add_blank_row", {"date":this.get_selected_date, "order_id": 1}) 
            }            
        }
    },
    computed: {
        ...mapGetters([
            "get_schedules",
            "get_selected_date",
            "get_add_member",
        ])
    }
}
</script>
<style>
#members {
    margin: 50px auto 0;
    width: 525px;
}
#members h1.member-title {
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 50px;
    text-align: center;
}
#members .mem-h-wrap {
    margin-bottom: 15px;
}
#members .mem-h-wrap h2.info-txt {
    font-size: 18px;
    font-weight: 500;
}
#members .mem-h-wrap button.btn {
    height: 35px;
    width: 100px;
}


/* table */
#members .member-table {
    width: 100%;
}

/* table headers */
#members .member-table thead tr th.member-item {
    text-align: center;
    padding: 15px 0;
    border-right: 1px solid #ced6e0;
    border-bottom: 4px solid #a4b0be;
    font-weight: 500;
    font-size: 15px;
    
}
#members .member-table thead tr th.member-item:nth-child(1) {
    width: 75px;
    min-width: 75px;
}
#members .member-table thead tr th.member-item:nth-child(2) {
    width: 100%;
    text-align: left;
    padding-left: 15px;
}
#members .member-table thead tr th.member-item:nth-child(3) {
    width: 75px;
    min-width: 75px;
    border-right: 0;
}
#members .member-table thead tr th.member-item:nth-child(4) {
    width: 75px;
    min-width: 75px;
    border-right: 0;
}

/* table body */
#members .member-table tbody tr td.member-item {
    height: 40px;
    border-right: 1px solid #ced6e0;
    border-bottom: 1px solid #ced6e0;
    vertical-align: middle;
    font-size: 13px;
}
#members .member-table tbody tr td.member-item:nth-child(1) {
    text-align: center;
}
#members .member-table tbody tr td.member-item:nth-child(2) {
    padding-left: 10px;
}
#members .member-table tbody tr td.member-item:nth-child(4) {
    text-align: center;
    border-right: 0;
}


/* bottom buttons */
#members .bottom-btn-wrap {
    margin-top: 25px;
}
#members .bottom-btn-wrap button.btn {
    width: 100px;
    height: 38px;
}


@media screen and (max-width: 525px){
    #members {
        width: 90%;
    }
    #members .mem-h-wrap h2.info-txt {
        font-size: 12px;
        font-weight: 500;
    }
    #members .mem-h-wrap button.btn {
        width: 100px;
        font-size: 12px;
    }
    #members .member-table thead tr th.member-item:nth-child(1) {
        width: 50px;
        min-width: 50px;
        border-right: 0;
    }
    #members .member-table thead tr th.member-item:nth-child(3) {
        width: 50px;
        min-width: 50px;
        border-right: 0;
    }
    #members .member-table thead tr th.member-item:nth-child(4) {
        width: 60px;
        min-width: 60px;
        border-right: 0;
    }
}
</style>