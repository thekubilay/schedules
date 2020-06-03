import memberApi from "../api/member.api";
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
                dispatch("load_schedule", {"date":getters.get_selected_date})
            })		
            .catch(err => {
                console.log(err)
            })
        }, 
        insert_new_order_id({commit, dispatch, getters}, payload){
            memberApi.add_order_id(payload)
            .then(() => {
                dispatch("load_schedule", {"date":getters.get_selected_date})
            })		
        },
        edit_member_name({commit,getters, dispatch}, payload){
            memberApi.edit_member_name_in_db(payload)
            .then(() => {
                dispatch("load_schedule", {"date":getters.get_selected_date})
            })		
        },
        delete_member({commit,dispatch, getters, state}, payload){
            memberApi.delete_member_from_db(payload).then(() => {     
                let schedule_list = []
                let empty_rows = []           
                let schedules = []
                getters.get_schedules.forEach(element => {
                    if (element.id != payload.id ) {
                        schedules.push(element)
                    }                    
                });
                schedules.forEach((element,index) => {
                    let new_index = index+1
                    let orders = {
                        "id": element.id,
                        "order_id": new_index
                    }
                    if (element.name != '') {
                        schedule_list.push(orders) 
                    } else {
                        empty_rows.push(orders)
                    }
                });
                dispatch("insert_new_order_id", {"orders":schedule_list})
            })
        },
    }
}