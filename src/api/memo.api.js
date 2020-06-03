import axios from "axios";
import {API_HANDLER} from "../config";

export default {    
    get_memo_from_db(payload){
        const table = "schedule_memo"
        payload.table = table

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"memo/read.php", JSON.stringify(payload))
    },        
    insert_memos_into_db(payload){
        const table = "schedule_memo"
        payload.table = table

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"memo/insert.php", JSON.stringify(payload))
    },
}
