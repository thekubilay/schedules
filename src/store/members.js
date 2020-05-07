import axios from "axios";
import databaseApi from "../api/members.api"
export const members = {
    state: {
        popup: false,
        new_member_form: false,
        users:[]
    },
    mutations: {
        set_popup(state, popup){
            state.popup = popup
        },
        set_new_member_form(state, member){
            state.new_member_form = member
        },
        set_users(state, user){
            state.users = user
        }
    },
    getters: {
        get_popup(state){
            return state.popup
        },
        get_new_member_form(state){
            return state.new_member_form
        },
        get_users(state){
            return state.users
        }
    },
    actions: {
        load_users({commit}){
			databaseApi.get_users_from_db()	
			.then( response => {
                response.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = response.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
				this.commit("set_users", ordered)
			})
        },        
		insert_user({commit, getters, dispatch}, payload){
            databaseApi.insert_user_into_db(payload)
            .then(res => {
                let new_user = res.data
                getters.get_users.push(new_user)
                dispatch("load_schedules")
            })		
        },
        insert_new_order_id({commit, dispatch}, payload){
            databaseApi.add_order_id(payload)
            .then(res => {
                res.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = res.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                this.commit("set_users", ordered)
                dispatch("load_schedules")
            })		
        },
		edit_user_name({commit,getters}, payload){
            databaseApi.edit_user_name_in_db(payload)
            .then(res => {
                res.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = res.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                this.commit("set_users", ordered)
            })		
        },
        delete_user({commit}, payload){
			databaseApi.delete_user_from_db(payload).then(res => {                
                res.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = res.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                this.commit("set_users", ordered)
			})
		},
    }
}