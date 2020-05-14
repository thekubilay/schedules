<template>
    <header class="flex between rel">
        <div class="header-left-sides h-sides">
            <h1 class="h-title">行動予定表</h1>
            <p class="h-caution">※必ずご自身で入力をお願いします</p>
        </div>
        <div class="flex rel align-ver header-right-side h-sides">
            <div class="date-wrap">
                <p class="date-txt">{{selected_date}}</p>
                <date-pick 
                    v-model="set_date"
                    :displayFormat="'YYYY.MM.DD'"
                    :months="months"
                    :weekdays="weekdays">
                </date-pick>                 
            </div>
            <button class="btn">更新</button>
        </div>
    </header>
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
            this.$store.dispatch("load_schedule", {"date":this.date})            
        }
    },
    computed: {
        ...mapGetters([
            "get_selected_date"
        ]),
        set_date: {
            set(val){
                this.$store.commit("set_selected_date", val)
                this.$store.dispatch("load_schedule", {"date":val})
                this.$store.dispatch("load_memo", {"date":val})     
            },
            get(){
                return this.$store.state.schedule.selected_date
            }
        },
        selected_date(){
            let year = this.get_selected_date.slice(0,4)
            let month = this.get_selected_date.slice(5,7)
            let day = this.get_selected_date.slice(8,11)
            let date = new Date(this.get_selected_date)
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
header {
    margin-bottom: 15px;
    margin-left: 25px;
    margin-right: 25px;
}
header .h-sides h1.h-title {
    font-size: 26px;
    font-weight: 600;
    color: #00008b;
}
header .h-sides p.h-caution {
    font-size: 14px;
    margin-top: 10px;
    color: red;
}
header .h-sides button.btn {
    height: 35px;
    width: 60px;
}
header .h-sides .date-wrap {
    margin-right: 25px;
}
header .h-sides .date-wrap p.date-txt {
    font-size: 24px;
    z-index: 2;
    right: 115px;
    /* position: relative; */
    z-index: 1;
    color: #00008b;
}
header .h-sides .date-wrap .vdpComponent {
    position: absolute; 
    top: 0;

    left: 0;
    z-index: 10;
}
header .h-sides .date-wrap .vdpComponent input {
    height: 50px;
    cursor: pointer;
    width: 270px;
    opacity: 0;
}
header .h-sides .date-wrap .vdpComponent .vdpClearInput {
    display: none;
}


@media screen and (max-width: 1100px){
    header {
        margin-bottom: 15px;
        margin-left: 15px;
        margin-right: 15px;
    }
}

@media screen and (max-width: 600px){
    header .h-sides h1.h-title {
        font-size: 16px;
    }
    header .h-sides p.h-caution {
        font-size: 10px;
    }
    header .h-sides .date-wrap {
        margin-right: 10px;
    }
    header .h-sides .date-wrap .vdpComponent input {
        height: 35px;
        width: 150px;
        opacity: 0;
    }
    header .h-sides .date-wrap p.date-txt {
        font-size: 14px;
    }
    header .h-sides button.btn {
        height: 35px;
        width: 50px;
        font-size: 12px;
    }
}
</style>