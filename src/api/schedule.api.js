import axios from "axios";
import {API_HANDLER} from "../config";


export default {
    
    get_schedules_from_db(payload){
        const table_schedule = "schedule_schedule"
        const table_member = "schedule_member"
        payload.table_schedule = table_schedule
        payload.table_member = table_member

        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+ "schedule/read.php", JSON.stringify(payload))
    },    
    insert_schedule_into_db(payload){
        const table = "schedule_schedule"
        payload.table = table
        
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"schedule/insert.php", JSON.stringify(payload))
    },

}