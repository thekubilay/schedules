<template>
    <tr class="grab">
        <td class="member-item">{{index+1}}</td>
        <td class="member-item name-item">
            <p v-if="member.member != null" class="flex align-ver align-hor name-btn">{{member.member}}</p>
            <p v-else class="flex align-ver align-hor">{{member.member}}</p>
            <input v-if="get_settings.length" v-model="name" :maxlength="get_settings[0].name_char_limit" v-show="edit" type="text" ref="input">
            <p v-if="error == true" class="input-err">お名前を入力してください。</p>            
        </td>
        <td class="member-item">
            <button
                 v-if="!edit && member.member != null"
                @click="edit_member()"
                class="edit-btn"
            >
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button
                v-if="edit && member.member != null"
                @click="apply_member()"
                class="apply-btn"
            >
                <i class="fas fa-paper-plane"></i>
            </button>
        </td>
        <td class="member-item">
            <button
                @click="delete_member()"
                class="delete-btn"
            >
                <i class="far fa-trash-alt"></i>
            </button>
        </td>
    </tr>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        member: Object,
        index: Number,
    },    
    data(){
        return {
            edit: false,
            name: "",
            error: false,
        }
    },
    methods: {
        edit_member(){
            this.edit = true;
        },
        apply_member(){
            if (this.name != "") {
                this.$store.dispatch("edit_member_name", {"member":this.name, "id":this.member.id})
                this.edit = false;             
            } else {
                this.error = true
                setTimeout(() => {
                    this.error = false
                }, 1500);
            }
        },
        delete_member(){
            this.$store.dispatch("delete_member", {
                "id":this.member.id,
            })
        },
    },
    computed: {
        ...mapGetters([
            "get_settings",
            "get_selected_date",
        ])
    }
}
</script>
<style>
.input-err {
    position: absolute;
    left: 20px;
    top: 13px;
    z-index: 99;
    font-size: 500;
    margin-bottom: 15px;
    color: red;
    text-align: center;
    font-size: 14px;
}
tr.grab:nth-child(even) {background-color: white;}

td.member-item {
    text-align: center;
}
td.member-item.name-item {
    padding: 0;
    position: relative;
}
td.member-item input {
    height: 100%;
    border: 0;
    top: 0;
    position: absolute;
    left:0;
    padding-left: 15px;
    font-size: 14px;
    width: 100%;
}
td.member-item p.click-txt {
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(156, 156, 156, 0.685);
    right: 0;
    position: absolute;
    font-size: 10px;
    width: 100px;
}
td.member-item p.name-btn {
    height: 30px;
    background-color: #2f3542;
    color: whitesmoke;
    width: 85px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
td.member-item button {
    color: white;
    width: 40px;
    height: 30px;
    margin: auto;
    outline: 0;
    border: 0;
    transition: .2s ease;
}
td.member-item button.edit-btn {
    background-color: #3742fa;
}
td.member-item button.apply-btn {
    background-color: #2ed573;
}
td.member-item button.delete-btn {
    background-color: #e74c3c;
}
td.member-item button.delete-btn .far, .fas {
    font-size: 14px !important;
}
</style>