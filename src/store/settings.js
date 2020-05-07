import axios from "axios";
import databaseApi from "../api/settings.api"

export const settings = {
    state: {
        settings:{},
        settings_loaded: 0,
    },
    mutations: {
        set_settings(state, setting){
            state.settings = setting
        },
        set_settings_loaded(state, load){
            state.settings_loaded = load
        }
    },
    getters: {
        get_settings(state){
            return state.settings
        },
        get_settings_loaded(state){
            return state.settings_loaded
        }
    },
    actions: {
        load_settings({commit}){
            this.commit("set_settings_loaded", 1)
            databaseApi.get_settings_from_db()
            .then(response => {
                this.commit("set_settings", response.data)
                this.commit("set_settings_loaded", 2)
            })
        },
        update_settings({commit}, payload){
            databaseApi.update_settings_in_db(payload)
            .then(response => {
                this.commit("set_settings", response.data)
            })
        },
        update_sep_settings({commit}, payload){
            databaseApi.update_sep_settings_in_db(payload)
            .then(response => {
                this.commit("set_settings", response.data)
            })
        }

    }
}