import axios from "axios";
import databaseApi from "../api/password.api"
export const password = {
    state: {

    },
    mutations: {
    },
    getters: {
    },
    actions: {
        update_account({commit}, payload){
            databaseApi.take_an_update_on_account(payload)
            .then(res => {
                console.log(res)
            })
        },
    }
}