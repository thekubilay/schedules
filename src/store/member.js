import memberApi from "../api/members.api";
export const member = {
    state: {
        add_member: false,
        users: [],
    },
    mutations: {
        set_add_member(state, add){
            state.add_member = add
        },
        set_users(state, user){
            state.users = user
        },
    },
    getters: {
        get_add_member(state){
            return state.add_member
        },
        get_users(state){
            return state.users
        },
    },
    actions: {
        insert_user({commit, getters, dispatch}, payload){
            memberApi.insert_user_into_db(payload)
            .then(res => {
                let new_user = res.data
                getters.get_users.push(new_user)
                dispatch("load_schedule")
            })		
            .catch(err => {
                console.log(err)
            })
        }, 
        insert_new_order_id({commit, dispatch}, payload){
            memberApi.add_order_id(payload)
            .then(res => {
                res.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = res.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                this.commit("set_users", ordered)
                dispatch("load_schedule")
            })		
        },
        edit_user_name({commit,getters}, payload){
            memberApi.edit_user_name_in_db(payload)
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
            memberApi.delete_user_from_db(payload).then(res => {                
                res.data.forEach(order => {
                    order.order_id = parseInt(order.order_id)
                })
                let ordered = res.data.sort(function(a, b) {
                    return a.order_id - b.order_id;
                });
                this.commit("set_users", ordered)
            })
        },
    
    
        /* 
        * blank rows
        */ 
        add_blank_row({commit, dispatch}, payload) {
            memberApi.add_new_empty_cell(payload)
            .then(res => {
                dispatch("load_schedule")             
            }) 
        },
        blank_row_order_id({commit,dispatch}, payload){
            memberApi.edit_empty_row_order_id(payload)	
            dispatch("load_schedule")             
        },
        del_blank_row({commit}, payload) {
            memberApi.remove_empty_row(payload)            
        },
    }
}