import axios from "axios";
import {API_HANDLER} from "../config";


export default {
    
    take_an_update_on_account(payload){
        const username = "prej"
        const password = "X4taLdr"
        var basicAuth = 'Basic ' + btoa(username + ':' + password);
        axios.defaults.headers.common["authorization"] = basicAuth
        return axios.post(API_HANDLER.database_api+"password", JSON.stringify(payload))
    }

}