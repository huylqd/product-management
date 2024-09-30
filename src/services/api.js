// import axios from "axios";
const axios = require("axios")
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use((req) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const token = userInfo.token
    if (token) { 
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req
})

export default API