import axios from "axios";
import {API_HANDLER} from "../config";

export default {
    get_users_from_db(){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.get(API_HANDLER.database_api+"users")
    },
    insert_user_into_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"new-user", JSON.stringify(payload))
    },
    add_order_id(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"edit-user-order-id", JSON.stringify(payload))
    },
    edit_user_name_in_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.put(API_HANDLER.database_api+"edit-user", JSON.stringify(payload))
    },
    delete_user_from_db(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"delete-user", payload)
    }
}