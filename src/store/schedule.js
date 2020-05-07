import axios from "axios";
import databaseApi from "../api/schedule.api"
export const schedule = {
    state: {
        schedules: [],
        yesterday_schedules: [],
        schedules_loaded: 0,
        new_schedule_form: false,
        schedule_user_id: "",
        selected_date: "",
        empty_row: [],
        all_rows: [],
    },
    mutations: {
        set_schedules(state, schedules) {
            state.schedules = schedules
        },
        set_yesterday_schedules(state, yes){
            state.yesterday_schedules = yes
        },
        set_schedules_loaded(state, load){
            state.schedules_loaded = load
        },
        set_new_schedule_form(state, schedule) {
            state.new_schedule_form = schedule
        },
        set_schedule_user_id(state, id) {
            state.schedule_user_id = id
        },
        set_selected_date(state, date) {
            state.selected_date = date
        },
        set_empty_row(state, row) {
            state.empty_row = row
        },
    },
    getters: {
        get_schedules(state) {
            return state.schedules
        },
        get_yesterday_schedules(state){
            return state.yesterday_schedules
        },
        get_schedules_loaded(state){
            return state.schedules_loaded
        },
        get_new_schedule_form(state) {
            return state.new_schedule_form
        },
        get_schedule_user_id(state) {
            return state.schedule_user_id
        },
        get_selected_date(state) {
            return state.selected_date
        },
        get_empty_row(state) {
            return state.empty_row
        },
    },
    actions: {
        load_schedules({commit}, payload) {
            this.commit("set_schedules_loaded", 1)
            databaseApi.get_schedules_from_db(payload)
                .then(response => {
                    response.data.forEach(order => {
                        order.order_id = parseInt(order.order_id)
                    })
                    let ordered = response.data.sort(function(a, b) {
                        return a.order_id - b.order_id;
                    });
                    this.commit("set_schedules", ordered)
                    this.commit("set_schedules_loaded", 2)
                })
        },
        load_yesterday_schedules({commit}, payload) {
            databaseApi.get_yesterday_schedules_from_db(payload)
                .then(response => {
                    response.data.forEach(order => {
                        order.order_id = parseInt(order.order_id)
                    })
                    let ordered = response.data.sort(function(a, b) {
                        return a.order_id - b.order_id;
                    });
                    this.commit("set_yesterday_schedules", ordered)
                })
        },
        insert_schedule({commit}, payload) {
            this.commit("set_schedules_loaded", 1)
            databaseApi.insert_schedule_into_db(payload)
                .then(response => {
                    this.commit("set_schedules", response.data)
                    this.commit("set_schedules_loaded", 2)
                })
        },
        add_empty_row({commit, dispatch}, payload) {
            databaseApi.add_new_empty_cell(payload)
            .then(res => {
                dispatch("load_schedules")             
            }) 
        },
        del_empty_row({commit}, payload) {
            databaseApi.remove_empty_row(payload)            
        },
        empty_row_order_id({commit,dispatch}, payload){
            databaseApi.edit_empty_row_order_id(payload)	
            dispatch("load_schedules")             
        },
    }
}