<template>
    <table class="schedule-table table-two">
        <thead>
            <tr>
                <th class="st-item">名前</th>
                <th class="st-item">行先</th>
                <th class="st-item">休日予定</th>
                <th class="st-item">帰社日時</th>
                <th class="st-item">備考</th>
            </tr>
        </thead>
        <tbody>
            <app-schedule-items v-for="(schedule, index) in schedules.table_two" :key="index" :schedule="schedule"/>
        </tbody>
    </table>
</template>
<script>
import appScheduleItems from './tb-two-items'
export default {
    props: {
        schedules: Object,
    },
    components: {
        appScheduleItems,
    }
}
</script>