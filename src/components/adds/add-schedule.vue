<template>
    <div class="popup-bg">
        <div class="blurred"></div>
        <div class="popup-frame schedule-frame">
            <div @click="close_add_box()" class="flex align-ver align-hor close pointer"><i class="fas fa-times"></i></div>
            <h3 class="popup-frame-title">行動予定入力フォーム</h3>

            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">担当者名</p>
                <p class="name-txt">{{user_schedule.member}}</p>
            </div>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">行先記入</p>
                <input class="column-input" :maxlength="get_settings[0].content_char_limit" v-model="content" type="text">
            </div>
            <div class="flex align-ver align-hor  box-row">
                <p class="flex align-ver align-hor column-title">帰社予定</p>
                <div class="flex align-ver input-wrap">
                    <date-pick 
                        class="date"
                        v-model="return_date"
                        :displayFormat="'YYYY.MM.DD'"
                        :months="months"
                        :weekdays="weekdays">
                    </date-pick> 
                    <select class="selects" v-model="selected_hour">
                        <option value=""></option>
                        <option :value="hour" v-for="(hour, index) in hours" :key="index">{{hour}}時</option>
                    </select>
                    <select class="selects select-second" v-model="selected_min">
                        <option value=""></option>
                        <option :value="min" v-for="(min, index) in mins" :key="index">{{min}}分</option>
                    </select>
                </div>
            </div>

            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title empty"></p>
                <div class="flex align-ver input-wrap">
                    <input type="checkbox" class="checks" v-model="display_return">
                    <p class="check-txt">帰社日時を表示する</p>
                    <input type="checkbox" class="checks" v-model="direct_return">
                    <p class="check-txt">直帰</p>
                </div>
            </div>

            <div class="flex align-ver align-hor  box-row">
                <p class="flex align-ver align-hor column-title">休日予定</p>
                <div class="flex align-ver input-wrap">
                    <date-pick 
                        class="date"
                        v-model="holiday_work_start"
                        :displayFormat="'YYYY.MM.DD'"
                        :months="months"
                        :weekdays="weekdays">
                    </date-pick> 

                    <date-pick 
                        class="date"
                        v-model="holiday_work_finish"
                        :displayFormat="'YYYY.MM.DD'"
                        :months="months"
                        :weekdays="weekdays">
                    </date-pick>                     
                </div>
            </div>
            <div class="flex align-ver box-row">
                <p class="flex align-ver align-hor column-title">備考記入</p>
                <input class="column-input" :maxlength="get_settings[0].remark_char_limit" v-model="remark" type="text">
            </div>

            <div class="flex between btn-wrap">
                <button @click="add_schedule(1)" class="btn schedule-btn">行動予定登録</button>
                <button @click="add_schedule(2)" class="btn red-bg">予定削除</button>
            </div>

        </div>
    </div>        
</template>
<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import { mapGetters } from "vuex";
export default {
    components: {
        DatePick,
    },
    data(){
        return {
            weekdays: ['月','火','水','木','金','土', '日'],
            months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            content: "",
            holiday_work_start: null,
            holiday_work_finish: null,
            return_date: null,
            hours: ["00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11","12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
            mins: ["00", "15", "30", "45"],
            selected_hour: "",
            selected_min: "",
            display_return: true,
            direct_return: false,
            remark: "",
        }
    },
    methods: {
        close_add_box(){
            this.$store.state.schedule.add_schedule = false;
        },
        add_schedule(btn_type){
            if (btn_type == 1) {
                this.$store.state.schedule.add_schedule = false
                let payload = {
                    "member_id": this.get_schedule_user_id,
                    "content": this.content,
                    "holiday_work_start": this.holiday_work_start == "" ? null : this.holiday_work_start,
                    "holiday_work_finish": this.holiday_work_finish == "" ? null : this.holiday_work_finish,
                    "return_date": this.return_date == "" ? null : this.return_date,
                    "return_time": this.selected_hour+""+this.selected_min,
                    "display_return": this.display_return == true ? 1 : 0,
                    "direct_return": this.direct_return == true ? 1 : 0,
                    "remark": this.remark,
                    "created_at": this.get_selected_date,                    
                }

                this.$store.dispatch("insert_schedule", payload)  

            } else if (btn_type == 2) {
                this.$store.state.schedule.add_schedule = false
                let payload = {
                    "member_id": this.get_schedule_user_id,
                    "content": "",
                    "holiday_work_start": null,
                    "holiday_work_finish": null,
                    "return_date": null,
                    "return_time": "",
                    "display_return": 1,
                    "direct_return": 0,
                    "remark": "",
                    "created_at": this.get_selected_date,                    
                }

                this.$store.dispatch("insert_schedule", payload)  

            }
        }
    },
    computed: {
        ...mapGetters([
            "get_schedules",
            "get_selected_date",
            "get_schedule_form",
            "get_schedule_user_id",
            "get_settings",
        ]),  
        user_schedule(){
            let obj = {}
            this.get_schedules.forEach(item => {
                if (item.id == this.get_schedule_user_id && item.name != "") {  
                    if (item.schedules.length) {
                        this.content = item.schedules[0].content
                        this.holiday_work_start = item.schedules[0].holiday_work_start
                        this.holiday_work_finish = item.schedules[0].holiday_work_finish
                        this.return_date = item.schedules[0].return_date
                        this.selected_hour = item.schedules[0].return_time != null && item.schedules[0].return_time != null ? item.schedules[0].return_time.substring(0,2) : ""
                        this.selected_min = item.schedules[0].return_time != null && item.schedules[0].return_time != null ? item.schedules[0].return_time.substring(2,4) : ""
                        this.display_return = item.schedules[0].display_return == 1 ? true : false
                        this.direct_return = item.schedules[0].direct_return == 1 ? true : false,
                        this.remark = item.schedules[0].remark
                    }   
                    obj = item
                }
            })
            return obj
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
.popup-bg .schedule-frame {
    width: 500px !important;
}

.popup-bg .schedule-frame .box-row {
    margin-bottom: 15px;
}
.popup-bg .schedule-frame .box-row p.column-title {
    width: 100px;
    min-width: 100px;
    color: white;
    margin-right: 15px;    
    text-align: center;
    background-color: #60687a;
    font-size: 14px;
    height: 32px;
}
.popup-bg .schedule-frame .box-row p.column-title.empty {
    background-color: white;
}
.popup-bg .schedule-frame .box-row input.column-input, .input-wrap {
    width: 100%;
    font-size: 14px;
    margin-bottom: 0;
}
.popup-bg .schedule-frame .box-row input.checks {
    width: 18px;
    margin-bottom: 0;
    margin-right: 10px;
}
.popup-bg .schedule-frame .box-row p.check-txt {
    margin-right: 10px;
}
.popup-bg .schedule-frame .box-row .input-wrap .selects {
    height: 32px;
}
.popup-bg .schedule-frame .box-row .input-wrap .selects {
    height: 32px;
    margin-right: 15px;
    background-color: white;
}
.popup-bg .schedule-frame .box-row .input-wrap .vdpComponent {
    margin-right: 10px;
}
.popup-bg .schedule-frame .box-row .input-wrap .vdpComponent input {
    margin-bottom: 0;
    font-size: 13px;
    width: 120px;
}

.popup-bg .schedule-frame .btn-wrap {
    margin: auto;
    margin-top: 15px;
    width: 85%;
}
.popup-bg .schedule-frame .btn-wrap .red-bg, .btn {
    width: 40%;
    height: 38px;
    color: white;    
}
.popup-bg .schedule-frame .btn-wrap .red-bg {
    background-color: red;
}

</style>