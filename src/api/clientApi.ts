import axios from 'axios'

export const baseURL = "https://attendance-api-xewv.onrender.com/api"
// export const baseURL = "http://localhost:5000/api"

export const clientApi = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})