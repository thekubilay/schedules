import axios from "axios";
import {API_HANDLER} from "../config";

export default {
    
    get_settings_from_db(){
        const payload = {
            "table": "schedule_setting"
        }

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"setting/read.php", JSON.stringify(payload))
    },        

    update_settings_in_db(payload){
        const table = "schedule_setting"
        payload.table = table

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"setting/insert.php", JSON.stringify(payload))
    },


}