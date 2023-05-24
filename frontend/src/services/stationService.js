import apiService from './apiService'

export default {
    async getStation() {
        try {
            console.log("Llamo a getStation");
            const res = await apiService.apiClient.get('/station');
            console.log(res.data);
            return res.data
        } catch (e) {
            throw e
        }
    }

}