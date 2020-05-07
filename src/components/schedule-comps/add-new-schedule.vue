<template>
    <div class="popup-bg" v-if="new_schedule_form">
        <div class="blurred"></div>
        <div class="new-schedule-form">
            <div class="flex align-ver align-hor close-bar" @click="close()"><i class="fas fa-times"></i></div>
            <h3 class="dialog-title">行動予定入力フォーム</h3>

            <div class="inner-form">
                <div class="flex parts">
                    <p class="flex align-ver align-hor form-txt left-item">担当者名</p>
                    <p class="flex align-ver form-txt right-item">{{user_schedule.name}}</p>
                </div>
                <!-- <div class="flex parts">
                    <p class="flex align-ver align-hor form-txt left-item">在席</p>
                    <select class="selects" v-model="status" id="">
                        <option value="在席">在席</option>
                        <option value="退社">退社</option>
                    </select>
                </div> -->
                <div class="flex parts">
                    <p class="flex align-ver align-hor form-txt left-item">行先記入</p>
                    <input
                        v-if="setting.length"
                        :maxlength="setting[0].content_field"
                        class="right-item input-sq"
                        v-model="content"
                        placeholder="行先" 
                    />
                </div>
                <div class="flex parts">
                    <p class="flex align-ver align-hor form-txt left-item">帰社予定</p>
                    <div class="flex align-ver">
                        <date-pick 
                            class="dates"
                            v-model="return_date"
                            :displayFormat="'YYYY.MM.DD'"
                            :months="months"
                            :weekdays="weekdays">
                        </date-pick> 
                        <select class="selects" v-model="selected_hour" id="">
                            <option :value="hour" v-for="(hour, index) in hours" :key="index">{{hour}}時</option>
                        </select>
                        <select class="selects" v-model="selected_min" id="">
                            <option :value="min" v-for="(min, index) in mins" :key="index">{{min}}分</option>
                        </select>
                    </div>
                </div>
                <div class="flex parts">
                    <p class="flex align-ver align-hor form-txt left-item unsetted-background"></p>
                    <div class="flex align-ver">
                        <input type="checkbox" class="checks" v-model="display_returns">
                        <p class="check-txt">帰社日時を表示する</p>
                        <input type="checkbox" class="checks" v-model="direct_returns">
                        <p class="check-txt">直帰</p>
                    </div>
                </div>
                <div class="flex parts">
                    <p class="flex align-ver align-hor form-txt left-item">休日予定</p>
                    <div class="flex between align-ver right-item">
                        <date-pick 
                            class="dates holiday-date"
                            v-model="holiday_work_start"
                            :displayFormat="'YYYY.MM.DD'"
                            :months="months"
                            :weekdays="weekdays">
                        </date-pick> 
                        〜
                        <date-pick 
                            class="dates"
                            v-model="holiday_work_finish"
                            :displayFormat="'YYYY.MM.DD'"
                            :months="months"
                            :weekdays="weekdays">
                        </date-pick> 
                    </div>
                </div>
                <div class="flex parts">
                    <p class="flex align-ver align-hor form-txt left-item"> 備考記入</p>
                    <input
                        v-if="setting.length"
                        :maxlength="setting[0].name_field"
                        class="right-item input-sq"
                        v-model="remarks"
                        placeholder="備考" 
                    />
                </div>
            </div>        

            <div class="flex between button-wrap">
                <button
                        @click="add_new_schedule(1)"
                        class="schedule-add-btn"
                    >
                        行動予定追加する
                </button>
                <button
                        @click="add_new_schedule(2)"
                        class="schedule-add-btn del-btn"
                    >
                        表示内容を全消去する
                </button>
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
            status: "",
            content: "",
            holiday_work_start: null,
            holiday_work_finish: null,
            return_date: null,
            hours: ["00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11","12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
            mins: ["00", "15", "30", "45"],
            selected_hour: "",
            selected_min: "",
            display_returns: true,
            direct_returns: false,
            remarks: "",
        }
    },
    methods: {
        close(){
            this.$store.state.schedule.new_schedule_form = false;
        },
        add_new_schedule(button_call){            
            this.$store.state.schedule.new_schedule_form = false;
            let payload = {
                "user_id": this.user_schedule.id,
                "status": this.status,
                "content": this.content,
                "holiday_work_start": this.holiday_work_start,
                "holiday_work_finish": this.holiday_work_finish,
                "return_date": this.return_date,
                "return_time": this.selected_hour + this.selected_min,
                "display_returns": this.display_returns == true ? 1 : 0,
                "direct_returns": this.direct_returns == false ? 0 : 1,
                "remarks": this.remarks,
                "created_at": this.dates,
            };
            
            let empty_payload = {
                "user_id": this.user_schedule.id,
                "status": "",
                "content": "",
                "holiday_work_start":null ,               
                "holiday_work_finish":null,
                "return_date":null,
                "return_time":"",
                "display_returns": 1,
                "direct_returns": 0,
                "remarks":"",
                "created_at": this.dates,
            };

            if (button_call == 1) {
                this.$store.dispatch("insert_schedule", payload)  
                setTimeout(() => {
                    this.$store.dispatch("load_schedules", {date:this.dates})
                }, 200);      
            } else {
                this.$store.dispatch("insert_schedule", empty_payload)                                
                setTimeout(() => {
                    this.$store.dispatch("load_schedules", {date:this.dates})
                }, 200);
            }
        }
    },
    computed: {
        ...mapGetters({
            popup:"get_popup",
            schedules:"get_schedules",
            setting:"get_settings",
            dates: "get_selected_date",
            new_schedule_form:"get_new_schedule_form",
            schedule_user_id:"get_schedule_user_id",
        }),
        close_form: {
            set(val){
                this.$store.commit("set_new_schedule_form", val)
            }, 
            get(){
                return this.new_schedule_form
            },
        },
        user_schedule(){
            let obj = {}
            this.schedules.forEach(item => {
                if (item.id == this.schedule_user_id) {
                    obj = item
                    if (item.schedules.length) {
                        this.status = item.schedules[0].status
                        this.content = item.schedules[0].content
                        this.holiday_work_start = item.schedules[0].holiday_work_start
                        this.holiday_work_finish = item.schedules[0].holiday_work_finish
                        this.return_date = item.schedules[0].return_date
                        this.selected_hour = item.schedules[0].return_time.substr(0,2)
                        this.selected_min = item.schedules[0].return_time.substr(2)
                        this.display_returns = parseInt(item.schedules[0].display_returns) == 1 ? true : false 
                        this.direct_returns = parseInt(item.schedules[0].direct_returns) == 0 ? false : true
                        this.remarks = item.schedules[0].remarks
                    } else {
                        this.status = ""
                        this.content = ""
                        this.holiday_work_start = null
                        this.holiday_work_finish = null
                        this.return_date = null
                        this.return_time = ""
                        this.display_returns = true
                        this.direct_returns = false
                        this.remarks = ""
                    }
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
.popup-bg .new-schedule-form .close-bar {
    top: -10px;
    position: absolute;
    cursor: pointer;
    right: -10px;
    z-index: 12;
    width: 40px;
    background-color: white;
    height: 40px;
    -webkit-box-shadow: 0px 2px 56px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 56px -9px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 56px -9px rgba(0,0,0,0.75);
}
.popup-bg .new-schedule-form .close-bar .fa-times {
    font-size: 25px;
}
.popup-bg .blurred {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.308);
}
.popup-bg .new-schedule-form {
    top: 45%;
    left: 50%;
    transform: translate(-50%,-42%);
    width: 500px;
    z-index: 11;
    background-color: white;
    padding: 25px;
}
.popup-bg .new-schedule-form h3.dialog-title {
    margin: 15px 0;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}
.popup-bg .new-schedule-form textarea {
    padding: 15px;
    margin-bottom: 15px;
}
.popup-bg .new-schedule-form button.add-btn {
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
    color: whitesmoke;
    background-color: #2f3542;
    transition: .2s ease;
}
.popup-bg .new-schedule-form button.add-btn:hover {
    transform: translateY(0);
    -webkit-box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
    -moz-box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
    box-shadow: 0px 2px 51px -32px rgba(0, 0, 0, 0.781);
}







/* forms */
.popup-bg .new-schedule-form .inner-form .parts .left-item {
    width: 30%;
    min-width: 30%;
    background-color: #ced6e0;
    height: 30px;
    font-size: 14px;
    margin-right: 5%;
}
.popup-bg .new-schedule-form .inner-form .parts .unsetted-background {
    background-color: white;
}
.popup-bg .new-schedule-form .inner-form .parts {
    margin-bottom: 10px;
}
.popup-bg .new-schedule-form .inner-form .parts input.input-sq {
    padding-left: 10px;
    background-color: #F4F7F8;
    outline: 0;
    border: 1px solid #ecf0f1;
}
.popup-bg .new-schedule-form .inner-form .parts input.checks {
    margin-right: 10px;
}
.popup-bg .new-schedule-form .inner-form .parts p.check-txt {
    margin-right: 10px;
}
.popup-bg .new-schedule-form .inner-form .parts .right-item {
    width: 65%;
    width: 65%;
}
.popup-bg .new-schedule-form .inner-form .parts .right-item p{
    padding: 5px;
}
.popup-bg .new-schedule-form .inner-form .parts .vs-input-parent {
    height: 30px;
    width: 100%;
}
.popup-bg .new-schedule-form .inner-form .parts .vs-select-content {
    border-radius: 0;
    height: 30px;
}
.popup-bg .new-schedule-form .inner-form .parts .vs-select-content select {
    border-radius: 0;
    height: 30px;
    min-height: 30px;
}

/* dates calender input */
.popup-bg .new-schedule-form .inner-form .parts .dates {
    height: 100%;
    margin-right: 12px;
}
.popup-bg .new-schedule-form .inner-form .parts .holiday-date {
    height: 100%;
    margin-right: 0;
}
.popup-bg .new-schedule-form .inner-form .parts .dates:last-child {
    height: 100%;
    margin-right: 0;
}
.popup-bg .new-schedule-form .inner-form .parts .dates input {
    height: 100%;
    position: relative;
    top: 1px;
    background-color: #F4F7F8;
    border: 1px solid #ecf0f1;
    cursor: pointer;
    font-size: 18px;
    width: 100px;
    padding-right: 0;
}
.popup-bg .new-schedule-form .inner-form .parts .dates .vdpClearInput {
    display: none;
}
.popup-bg .new-schedule-form .inner-form .parts select.selects {
    position: relative;
    cursor: pointer;
    top: 1px;
    border: 1px solid #ecf0f1;
    height: 30px;
    margin-right: 7px;
    background-color: #F4F7F8;
}
.popup-bg .new-schedule-form .inner-form .parts select.selects option {
    position: relative;
    top: 1px;
}
.popup-bg .new-schedule-form .inner-form .parts select.selects:last-child {
    margin-right: 0;
}

.popup-bg .new-schedule-form .schedule-add-btn {
    width: 45%;
    outline: 0;
    border: 0;
    height: 35px;
    font-size: 14px;
    color: whitesmoke;
    margin-top: 25px;
    font-weight: 500;
    background-color: #2f3542;
}
.popup-bg .new-schedule-form .del-btn {
    background-color: rgb(255,71,87);
}

</style>