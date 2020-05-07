<template>
    <div class="flex between align-ver schedule-date">
        <h2 class="schedule-title">行動予定表 <span class="warning">※必ずご自身で入力をお願いします</span></h2>
        <div class="flex align-ver right-box">
            <p class="date-txt">{{selected_date}}</p>
            <date-pick 
                v-model="set_date"
                :displayFormat="'YYYY.MM.DD'"
                :months="months"
                :weekdays="weekdays">
            </date-pick> 
            <button
                @click="update()"
                class="update-button"
            >
                更新
            </button>
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
        }
    },
    methods: {
        update(){
            this.$store.dispatch("load_schedules", {"date":this.date})            
        }
    },
    computed: {
        ...mapGetters({
            rows:"get_empty_row",
            date:"get_selected_date",
            setting:"get_settings"
        }),
        set_date: {
            set(val){
                this.$store.commit("set_selected_date", val)
                this.$store.dispatch("load_schedules", {"date":val})
                this.$store.dispatch("load_memos", {"date":val})     
            },
            get(){
                return this.$store.state.schedule.selected_date
            }
        },
        selected_date(){
            let year = this.date.slice(0,4)
            let month = this.date.slice(5,7)
            let day = this.date.slice(8,11)
            let date = new Date(this.date)
            let dayof = date.getDay()
            switch (dayof) {
                case 0:
                    dayof = "日"
                    break;
                case 1:
                    dayof = "月"
                    break; 
                case 2:
                    dayof = "火"
                    break;                     
                case 3:
                    dayof = "水"
                    break;
                case 4:
                    dayof = "木"
                    break;            
                case 5:
                    dayof = "金"
                    break;            
                case 6:
                    dayof = "土"
                    break;            
                default:
                    break;
            }

            
            return year+"年"+month+"月"+day+"日"+ " " +dayof+"曜日"
        }
    }
}
</script>
<style>
.schedule-date {
    width: 100%;
    margin: 30px 0;
    position: relative;
}
.schedule-date .right-box {
    position: relative;
}
.schedule-date .right-box .update-button {
    position: relative;
    color: white;
    background-color: #2f3542;
    margin-left: 40px;
    width: 75px;
    height: 35px;
    border: 0;
    outline: 0;
    font-size: 14px;
    font-weight: 400;
}
.schedule-date .right-box .update-button .fa-redo {
    margin-right: 10px;
}
.schedule-date h2.schedule-title {
    font-size: 26px;
    font-weight: 600;
    color: #00008b;
}
.schedule-date h2.schedule-title span.warning {
    display: block;
    font-size: 14px;
    margin-top: 10px;
    color: red;
}
.schedule-date .right-box p.date-txt {
    font-size: 24px;
    z-index: 2;
    right: 115px;
    color: #00008b;
    position: absolute;
}
.schedule-date .right-box .vdpComponent {
    position: relative;
    z-index: 3;
    color: #00008b;
    cursor: pointer;
}
.schedule-date .right-box .vdpComponent button.vdpClearInput{
    display: none;
}
.schedule-date .right-box .vdpComponent input {
    width: 280px;
    opacity: 0;
    background: none;
    cursor: pointer;
    padding: 0;
    border-width:0px;
    border:none;
    bottom: 0;
    outline: 0;
    padding-right: 0;
    font-size: 25px;
}

  @media all and (-ms-high-contrast:none)
     {
     *::-ms-backdrop, .right-box { align-items: flex-start } /* IE11 */
     }
</style>