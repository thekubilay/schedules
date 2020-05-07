import axios from "axios";
import {API_HANDLER} from "../config";


export default {
    
    get_schedules_from_db(payload){
        const username = "test"
        const password = "test"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        // axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"schedules", JSON.stringify(payload))
    },
    get_yesterday_schedules_from_db(payload){
        const username = "test"
        const password = "test"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        // axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"schedules", JSON.stringify(payload))
    },        
    insert_schedule_into_db(payload){
        const username = "test"
        const password = "test"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        // axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"new-schedule", JSON.stringify(payload))
    },

    get_empty_cell(){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.get(API_HANDLER.database_api+"empty-rows")
    },

    add_new_empty_cell(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"new-empty-row", JSON.stringify(payload))
    },
    remove_empty_row(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"delete-empty-row", JSON.stringify(payload))
    },
    edit_empty_row_order_id(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"edit-row-order-id", JSON.stringify(payload))
    },

}