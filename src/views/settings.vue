<template>
    <div id="settings">
        <h3 class="setting-table-title">{{settings}}</h3>
        <table class="setting-table">
            <thead>
                <tr>
                    <th class="sett-item">
                        #num
                    </th>
                    <th class="sett-item">項目</th>
                    <th class="sett-item">設定値</th>
                    <th class="sett-item">備考</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="sett-item">1</td>
                    <td class="sett-item">自動更新時間 :</td>
                    <td class="sett-item"><input v-model="update_time" class="setting-input" type="text"></td>
                    <td class="sett-item">1～25（分）で設定</td>
                </tr>
                 <tr>
                    <td class="sett-item">2</td>
                    <td class="sett-item">"行先" 文字制限 :</td>
                    <td class="sett-item"><input v-model="content_field" class="setting-input" type="text"></td>
                    <td class="sett-item">10～40（文字）で設定</td>
                </tr>
                <tr>
                    <td class="sett-item">3</td>
                    <td class="sett-item">"備考" 文字制限 :</td>
                    <td class="sett-item"><input v-model="remarks_field" class="setting-input" type="text"></td>
                    <td class="sett-item">10～40（文字）で設定</td>
                </tr>
                <tr>
                    <td class="sett-item">4</td>
                    <td class="sett-item">"備考" "名前" 文字制限 :</td>
                    <td class="sett-item"><input v-model="name_field" class="setting-input" type="text"></td>
                    <td class="sett-item">2～10（文字）で設定</td>
                </tr>
                <tr>
                    <td class="sett-item">5</td>
                    <td class="sett-item">線色 :</td>
                    <td class="sett-item"><input v-model="color_line" class="setting-input" type="text"></td>
                    <td class="sett-item">16進数カラーコード</td>
                </tr>
                <tr>
                    <td class="sett-item">6</td>
                    <td class="sett-item">メモ連絡 :</td>
                    <td class="sett-item"><input v-model="memo_field" type="checkbox" class="setting-input"></td>
                    <td class="sett-item">連絡メモ欄の表示</td>
                </tr>
                <tr>
                    <td class="sett-item">7</td>
                    <td class="sett-item">横並びテーブルの行数 :</td>
                    <td class="sett-item"><input v-model="row_number" class="setting-input" type="text"></td>
                    <td class="sett-item">1テーブルで適切行数5〜20</td>
                </tr>
            </tbody>
        </table>
        <div class="flex between btn-wrap">
            <button @click="return_to()" class="sett-btn btn">戻る</button>
            <button @click="settings_update()" class="sett-btn btn">決定</button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            update_time: "",
            content_field: "",
            remarks_field: "",
            name_field: "",
            color_line: "",
            memo_field: "",
            row_number: "",
        }
    },
    methods: {
        settings_update(){
            let payload = {
                "id": this.get_settings[0].id,
                "update_time": this.update_time,
                "row_number": this.row_number,
                "content_field": this.content_field,
                "remarks_field": this.remarks_field,
                "name_field": this.name_field,
                "color_line": this.color_line,
                "memo_field": this.memo_field == true ? 1 : 0,
            }
            this.$store.dispatch("update_settings", payload)
        },
        return_to(){
            this.$router.push({name: "home"})
        }
    },
    computed: {
        ...mapGetters([
            "get_settings",
            "get_setting_load",
        ]),
        settings(){
            if (this.get_settings.length) {
                this.update_time = this.get_settings[0].update_time
                this.content_field = this.get_settings[0].content_field
                this.remarks_field = this.get_settings[0].remarks_field
                this.name_field = this.get_settings[0].name_field
                this.color_line = this.get_settings[0].color_line
                this.memo_field = this.get_settings[0].memo_field == 1 ? true : false
                this.row_number = this.get_settings[0].row_number
            }

            let title = "設定ファイルの編集/更新"
            return title
        }
    }
}
</script>
<style>
#settings {

}
#settings h3.setting-table-title {
    margin-top: 50px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 50px;
}
#settings table.setting-table {
    width: 560px;    
    margin: 0 auto;
    font-size: 14px;
}
#settings table.setting-table thead tr th.sett-item {
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid #dcdde1;
}
#settings table.setting-table thead tr th.sett-item:nth-child(1) {
    width: 50px;
    min-width: 50px;
}
#settings table.setting-table thead tr th.sett-item:nth-child(2) {
    width: 160px;
    min-width: 160px;
}
#settings table.setting-table thead tr th.sett-item:nth-child(3) {
    width: 100px;
    min-width: 100px;
    padding-left: 15px;
}


/* body */
#settings table.setting-table tbody tr td.sett-item {
    height: 55px;
    vertical-align: middle;
    text-align: center;
}
#settings table.setting-table tbody tr td.sett-item:nth-child(1) {
    font-weight: 500;
}
#settings table.setting-table tbody tr td.sett-item:nth-child(2) {
    text-align: left;
}
#settings table.setting-table tbody tr td.sett-item input.setting-input {
    height: 32px;
    background-color: #2f3542;
    color: white;
    width: 95%;
    margin-left: 15px;
    padding-left: 10px;
}

#settings .btn-wrap {
    width: 400px;
    margin: auto;
    margin-top: 50px;
}
#settings .btn-wrap button.sett-btn {
    width: 150px;
}


@media screen and (max-width: 600px){
    #settings table.setting-table {
        width: 95%;
        margin: 0 auto;
        font-size: 12px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(1) {
        width: 10%;
        min-width: 10px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(2) {
        width: 30%;
        min-width: 30px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(3) {
        width: 20%;
        min-width: 50px;
    }
    #settings table.setting-table thead tr th.sett-item:nth-child(4) {
        width: 30%;
        min-width: 30px;
    }

    #settings table.setting-table tbody tr td.sett-item input.setting-input {
        height: 32px;
        background-color: #2f3542;
        color: white;
        width: 95%;
        margin-left: 0;
        padding-left: 10px;
    }
    #settings .btn-wrap {
        width: 85%;
        margin: auto;
        margin-top: 50px;
    }
    #settings .btn-wrap button.sett-btn {
        width: 100px;
        font-size: 12px;
    }
}
</style>