import axios from 'axios'

export default {
    apiClient: axios.create({
        baseURL: 'http://localhost:3010/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}