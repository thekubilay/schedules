<template>
    <div class="panel">
        <app-navigation v-if="this.$route.name == 'panel'"/>
        <router-view class="flex column align-ver "/>
    </div>
</template>
<script>
import appNavigation from "../components/navigation/nav"
export default {
    components: {
        appNavigation
    }
}
</script>
<style>
.panel {
    height: 100vh;
}
</style>
