import axios from 'axios';

const apiConfig = require("../config/api.config.js");

let hostname = apiConfig.HOSTNAME;

const api = axios.create({
    baseURL: hostname,
    headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

async function get() {
    return api.get('user/get/');
}

export default {
    get
}