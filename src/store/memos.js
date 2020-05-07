import axios from "axios";
import databaseApi from "../api/memos.api"
export const memos = {
    state: {
        memos:[],
        new_memo_form: false,
    },
    mutations: {
        set_memos(state, memo){
            state.memos = memo
        },
        set_new_memo_form(state, memo){
            state.new_memo_form = memo;
        },
    },
    getters: {
        get_memos(state){
            return state.memos
        },
        get_new_memo_form(state){
            return state.new_memo_form
        },
    },
    actions: {
        load_memos({commit}, payload){
            databaseApi.get_memos_from_db(payload)	
			.then(response => {
				this.commit("set_memos", response.data)
			})
        },
        insert_memos({commit}, payload){
            databaseApi.insert_memos_into_db(payload)
            .then(response => {
				this.commit("set_memos", response.data)
            })			
		},
    }
}