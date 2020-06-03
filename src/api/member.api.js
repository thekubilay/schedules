import axios from "axios";
import {API_HANDLER} from "../config";


export default {
    // users
    insert_user_into_db(payload){
        const table = "schedule_member"
        payload.table = table

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"member/insert.php", JSON.stringify(payload))
    },
    add_order_id(payload){
        const table = "schedule_member"
        payload.table = table

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"member/update-order.php", JSON.stringify(payload))
    },
    edit_member_name_in_db(payload){
        const table = "schedule_member"
        payload.table = table

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.put(API_HANDLER.database_api+"member/update-name.php", JSON.stringify(payload))
    },
    delete_member_from_db(payload){
        const table = "schedule_member"
        payload.table = table

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"member/delete.php", payload)
    },

}