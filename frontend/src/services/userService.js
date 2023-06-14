import apiService from './apiService'

export default {
    async getUser() {
        try {
            console.log("Llamo a getUser");
            const res = await apiService.apiClient.get('/user');
            return res.data
        } catch (e) {
            throw e
        }
    },
    

}