<template>
    <nav>
        <h1 class="board-title">管理メニュー</h1>
        <ul>
            <router-link class="nav-item" :to="{name:'members'}">
                <li class="flex align-hor align-ver nav-li">
                    利用メンバー設定
                </li>
            </router-link>
            <router-link class="nav-item" :to="{name:'settings'}">
                <li class="flex align-hor align-ver nav-li">
                    ページ設定
                </li>    
            </router-link>
            <!-- <router-link class="nav-item" :to="{name:'change_password'}">
                <li class="flex align-hor align-ver nav-li">
                    パスワード更新
                </li>
            </router-link> -->
            <router-link class="nav-item" :to="{name:'schedule'}">
                <li class="flex align-hor align-ver nav-li return-to-schedule">
                    <i class="fas fa-arrow-left"></i>行動予定表
                </li>
            </router-link>
        </ul>
    </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            setting:"get_settings"
        })
    }
}
</script>
<style>
nav {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translateX(-50%);
}
nav a.nav-item {
    display: block;
    margin-bottom: 10px;
    text-align: center;
}
nav a.nav-item:last-child {
    margin-top: 35px;
}
nav a.nav-item li.nav-li {
    transform: translateY(3px);
    width: 125px;
    height: 38px;
    font-size: 12px;
    color: whitesmoke;
    background-color: #2f3542;
    transition: .2s ease;
}
nav a.nav-item li.nav-li:hover {
    transform: translateY(0);
}
nav a.nav-item li.nav-li.return-to-schedule {
    color: #2f3542;
    background-color: #ced6e0;
    font-weight: 500;
}
nav a.nav-item li.nav-li.return-to-schedule .fa-arrow-left {
    position: relative;
    top: 1px;
    margin-right: 7px;
}
</style>
