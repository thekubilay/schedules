<template>
    <footer>
        <ul class="flex between footer-inner">
            <router-link class="seps" :to="{name:'seperate_settings'}">
                <li class="footer-item">個別表示設定</li>
            </router-link>
            <router-link :to="{name:'panel'}">
                <li class="footer-item">Admin Panel</li>
            </router-link>
        </ul>
    </footer>
</template>
<style>
footer {
    background-color: #f1f2f6;
    margin: auto;
    width: 100%;
    border-top: 2px solid #e9e6e6 !important;
}
footer ul.footer-inner {
    width: 300px;
    margin: auto;
    padding-top: 30px;
    padding-bottom: 50px;
} 
footer ul.footer-inner a li.footer-item {
    font-weight: 500;
} 
</style>