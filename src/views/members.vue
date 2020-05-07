<template>
    <div class="members">
        <h1 class="board-title">利用メンバー設定</h1>
        <app-member-list />        
    </div>
</template>
<script>
import appMemberList from "../components/member-comps/member-list"
import { mapGetters } from "vuex";
export default {
    components: {
        appMemberList,
    },
    computed: {
        ...mapGetters({
            setting:"get_settings"
        })
    }
}
</script>
<style>
.members {
    width: 525px;
}
.members h1.board-title{
    margin-top: 100px;
}
.member-list .top-header h2.member-title-sp {
    display: none;
}

@media screen and (max-width:560px){
    .members {
        width: 90%;
        margin: auto;
    }
    .members h2.member-list-title {
        display: none;
    }
    .member-list .top-header h2.member-title-sp {
        display: block;
        font-size: 12px;
        font-weight: 500;
    }
    .member-list button {
        width: 80px;
        height: 30px;
        font-size: 10px;
        font-weight: 400;
    }
    .member-list .member-item p.name-btn {
        font-size: 12px;
    }
    .member-list table.member-list-table thead tr th.member-item:nth-child(1) {
        width: 40px;
        min-width: 40px;
    }
    .member-list table.member-list-table thead tr th.member-item:nth-child(3) {
        width: 60px;
        min-width: 60px;
    }
    .member-list table.member-list-table thead tr th.member-item:nth-child(4) {
        width: 60px;
        min-width: 60px;
    }
}
</style>