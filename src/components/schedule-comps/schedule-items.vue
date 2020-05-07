<template>
    <tr class="schedule-tb grab">
        <td class="schedule-item name-item">
            <button
                v-if="schedule.name != ''"
                @click="add_new_schedule()"
                class="name-btn"
            >
                {{schedule.name}}                
            </button>
        </td>

        <!-- <td class="schedule-item name-item">
            <p v-if="schedule.schedules.length" :class="{redText: schedule.schedules[0].status == '退社'}">
                {{schedule.schedules[0].status}}
            </p>
        </td> -->

        <td class="schedule-item">
            <p v-if="schedule.schedules.length" :class="{redText: time_compare(schedule.schedules[0].return_time) == 1}">{{schedule.schedules[0].content}}</p>
        </td>

        <td class="schedule-item name-item">
            <p v-if="schedule.schedules.length" :class="{redText: date_compare(schedule.schedules[0].holiday_work_finish)}"> 
                {{holiday_start}} 
                <span v-if="holiday_hyphen == true">-</span> 
                {{holiday_finish}}
            </p>
        </td>

        <td class="schedule-item name-item">
            <p v-if="schedule.schedules.length && display_return_date == true" :class="{redText: time_compare(schedule.schedules[0].return_time) == 1 }">
                {{return_date}} <span v-if="return_date_hyphen == true">-</span> {{return_time}}
            </p>
            <p v-if="schedule.schedules.length && nr == true">NR</p>
        </td>

        <td class="schedule-item"><p v-if="schedule.schedules.length">{{schedule.schedules[0].remarks}}</p></td>
    </tr>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        schedule: Object
    },
    data(){
        return {red:0}
    },
    methods: {
        add_new_schedule(){
            this.$store.state.schedule.new_schedule_form = true;
            this.$store.state.schedule.schedule_user_id = this.schedule.id;
        },
        time_compare(time, ret_date){
            var date = new Date();
            let hour = date.getHours(); 
            let min = date.getMinutes(); 
            if (min < 9) {
                min = "0"+min
            }
            if (hour < 9) {
                hour = "0"+hour
            }
            var base_time = hour+""+min   
                 
            if (time != null && time != '') {
                return base_time > time ? 1 : 0
            }
        },
        date_compare(date){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 

            let isoDate = yyyy+'-'+mm+'-'+dd;

            if (date != null) {
                var firstValue = isoDate.split('-'),
                    secondValue = date.split('-'),
                    firstDate = new Date();

                firstDate.setFullYear(firstValue[0],(firstValue[1] - 1 ),firstValue[2]);
                
                var secondDate = new Date();
                secondDate.setFullYear(secondValue[0],(secondValue[1] - 1 ),secondValue[2]);

                return firstDate > secondDate ? 1 : 0
            }
        }
    },
    computed: {
        ...mapGetters([
            "get_selected_date"
        ]),
        holiday_start(){
            return this.schedule.schedules[0].holiday_work_start != null ? this.schedule.schedules[0].holiday_work_start.slice(5,11).replace("-", "/") : ""
        },
        holiday_finish(){
            return this.schedule.schedules[0].holiday_work_finish != null ? this.schedule.schedules[0].holiday_work_finish.slice(5,11).replace("-", "/") : ""
        },
        holiday_hyphen(){
            if (this.schedule.schedules[0].holiday_work_start != null && 
            this.schedule.schedules[0].holiday_work_finish != null && 
            this.schedule.schedules[0].holiday_work_start != '' && 
            this.schedule.schedules[0].holiday_work_finish != '') {
                return true
            } else {
                return false
            }
        },
        display_return_date(){
            return this.schedule.schedules[0].display_returns == 1 && this.schedule.schedules[0].direct_returns != 1 ? true : false
        },
        return_date(){
            return this.schedule.schedules[0].return_date != null ? this.schedule.schedules[0].return_date.slice(5,11).replace("-", "/") : ""
        },
        return_time(){
            return this.schedule.schedules[0].return_time != '' && this.schedule.schedules[0].return_time != null ? 
                this.schedule.schedules[0].return_time.substr(0,2)+":"+ this.schedule.schedules[0].return_time.substr(2) : ""
        },
        return_date_hyphen(){
            if (this.schedule.schedules[0].return_date != null && 
            this.schedule.schedules[0].return_time != null　&&
            this.schedule.schedules[0].return_date != '' &&
            this.schedule.schedules[0].return_time != '') {
                return true
            } else {
                return false
            }
            return this.schedule.schedules[0].return_date != null && this.schedule.schedules[0].return_time != null ? true : false
        },
        nr(){
            return this.schedule.schedules[0].direct_returns == 1 ? true : false
        },
    }
}
</script>
<style>
td.schedule-item {
    vertical-align: middle;
    border-top: 2px solid #00008b;
    border-bottom: 2px solid #00008b;
    border-right: 2px solid #00008b;
    padding-left: 15px;
    height: 45px;
}
tr.schedule-tb:nth-child(even) {background-color: white;}
/* td.schedule-item:nth-child(2) {
    padding-left: 0;
    text-align: center;
}
td.schedule-item:nth-child(2) p {
    font-weight: 600;
}
 */
.redText {
    color: red;
}
td.schedule-item:nth-child(3) {
    padding-left: 0;
    text-align: center;
}
td.schedule-item:nth-child(4) {
    padding-left: 0;
    text-align: center;
}
td.schedule-item:last-child {
    border-right: 0;
}
td.schedule-item.name-item {
    padding: 0;
    position: relative;
}
td.schedule-item button.name-btn {
    background: #2f3542;
    color: whitesmoke;
    margin-left: auto;
    margin-right: auto;
    display: block;
    height: 35px;
    outline: 0;
    border: 0;
    width: 100px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
td.schedule-item button.del-btn {
    background: #e74c3c;
    color: whitesmoke;
    margin-left: auto;
    margin-right: auto;
    height: 35px;
    outline: 0;
    border: 0;
    width: 50px;
    display: none;
    transition: .2s ease;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
tr.schedule-tb:hover button.del-btn {
    display: block;
}
</style>