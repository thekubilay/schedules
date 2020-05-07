<template>
    <div class="settings">
        <h1 class="board-title" v-if="sets.length">{{settings}}</h1>
        <!-- inner -->
        <table class="settings-table">
            <thead>
                <tr>
                    <th class="settings-item">#</th>
                    <th class="settings-item">項 目</th>
                    <th class="settings-item">設定値</th>
                    <th class="settings-item">備考</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="settings-item">1</td>
                    <td class="settings-item">"行先" 文字制限</td>
                    <td class="settings-item"><input v-model="content_field" class="setting-input" type="text"></td>
                    <td class="settings-item">10～40（文字）で設定</td>
                </tr>
                <tr>
                    <td class="settings-item">2</td>
                    <td class="settings-item">"備考" 文字制限：	</td>
                    <td class="settings-item"><input v-model="remarks_field" class="setting-input" type="text"></td>
                    <td class="settings-item">10～40（文字）で設定</td>
                </tr>
                <tr>
                    <td class="settings-item">3</td>
                    <td class="settings-item">"備考" "名前" 文字制限</td>
                    <td class="settings-item"><input v-model="name_field" class="setting-input" type="text"></td>
                    <td class="settings-item">2～10（文字）で設定</td>
                </tr>
                <tr>
                    <td class="settings-item">4</td>
                    <td class="settings-item">フォントサイズ</td>
                    <td class="settings-item"><input v-model="font_size" class="setting-input" type="text"></td>
                    <td class="settings-item">適切サイズは12～22（pt）</td>
                </tr>
                <tr>
                    <td class="settings-item">5</td>
                    <td class="settings-item">線色</td>
                    <td class="settings-item"><input v-model="color_line" class="setting-input" type="text"></td>
                    <td class="settings-item">16進数カラーコード</td>
                </tr>
                <tr>
                    <td class="settings-item">6</td>
                    <td class="settings-item">メモ連絡</td>
                    <td class="settings-item">                    
                        <input type="checkbox" v-model="memo_field">
                    </td>
                    <td class="settings-item">連絡メモ欄の表示</td>
                </tr>  
                <tr>
                    <td class="settings-item">7</td>
                    <td class="settings-item">横並びテーブルの行数</td>
                    <td class="settings-item"><input v-model="row_number" class="setting-input" type="text"></td>
                    <td class="settings-item">1テーブルで適切行数5〜20</td>
                </tr> 
            </tbody>            
        </table>

        <table class="settings-table-sp">
            <tr class="setting-tr">
                <th class="settings-item-sp">"行先" 文字制限： <br>10～40（文字）で設定</th>
                <td class="settings-item-sp"><input v-model="content_field" class="setting-input" type="text"></td>
            </tr>
            <tr>
                <th class="settings-item-sp">"備考" 文字制限：	<br>10～40（文字）で設定</th>
                <td class="settings-item-sp"><input v-model="remarks_field" class="setting-input" type="text"></td>
            </tr>
            <tr>
                <th class="settings-item-sp">"備考" "名前" 文字制限： <br>2～10（文字）で設定</th>
                <td class="settings-item-sp"><input v-model="name_field" class="setting-input" type="text"></td>
            </tr>
            <tr>
                <th class="settings-item-sp">フォントサイズ： <br>適切サイズは12～22（pt）</th>
                <td class="settings-item-sp"><input v-model="font_size" class="setting-input" type="text"></td>
            </tr>
            <tr>
                <th class="settings-item-sp">線色： <br>16進数カラーコード</th>
                <td class="settings-item-sp"><input v-model="color_line" class="setting-input" type="text"></td>
            </tr>
            <tr>
                <th class="settings-item-sp">メモ連絡： <br>連絡メモ欄の表示</th>
                <td class="settings-item-sp check-wrap">                    
                    <input type="checkbox" v-model="memo_field">
                </td>
            </tr>   
            <tr>
                <th class="settings-item-sp">横並びテーブルの行数 <br>1テーブルで適切行数5〜20</th>
                <td class="settings-item-sp">                    
                    <input v-model="row_number" class="setting-input">
                </td>
            </tr>            
        </table>



        <div class="flex between settings-button-wrap">
            <button
                @click="return_to()"
                shadow
                square
                class="settings-btn"
            >
                行動予定表
            </button>
            <button
                @click="settings_update()"
                shadow
                square
                class="settings-btn"
            >
                決定
            </button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	components: {

    },
    data(){
        return {
            row_number: "",
            update_time: "",
            title: "",
            content_field: "",
            remarks_field: "",
            name_field: "",
            font_size: "",
            color_line: "",
            memo_field: "",
            screen_mode: "",
            content_width: "",
            remarks_width: "",
            name_width: "",

        }
    },
    methods: {
        settings_update(){
            let payload = {
                "id": this.sets[0].id,
                // "update_time": this.update_time * 60,
                "row_number": this.row_number,
                "update_time": 180,
                "title": this.title,
                "content_field": this.content_field,
                "remarks_field": this.remarks_field,
                "name_field": this.name_field,
                "font_size": this.font_size,
                "color_line": this.color_line,
                "memo_field": this.memo_field == true ? 1 : 0,
                "screen_mode": this.screen_mode,
                "content_width": this.content_width,
                "remarks_width": this.remarks_width,
                "name_width": this.name_width,
            }
            this.$store.dispatch("update_settings", payload)
        },
        return_to(){
            this.$router.push({name: "schedule"})
        }
    },
	computed: {
		...mapGetters({
            sets:"get_settings",
        }),
        settings(){
            if (this.sets.length) {
                this.row_number = this.sets[0].row_number
                this.update_time = this.sets[0].update_time / 60
                this.title = this.sets[0].title
                this.content_field = this.sets[0].content_field
                this.remarks_field = this.sets[0].remarks_field
                this.name_field = this.sets[0].name_field
                this.font_size = this.sets[0].font_size
                this.color_line = this.sets[0].color_line
                this.memo_field = this.sets[0].memo_field == 1 ? true : false
                this.screen_mode = this.sets[0].screen_mode
                this.content_width = this.sets[0].content_width
                this.remarks_width = this.sets[0].remarks_width
                this.name_width = this.sets[0].name_width
            }

            let title = "設定ファイルの編集/更新"
            return title
        }
        
	}

}
</script>