import apiService from './apiService'

export default {
    async getStation() {
        try {
            console.log("Llamo a getStation");
            const res = await apiService.apiClient.get('/station');
            return res.data
        } catch (e) {
            throw e
        }
    },
    async getMyStation(userId) {
        try {
            console.log("Llamo a getStation con Query");
            const res = await apiService.apiClient.get('/station', { params: { userId: userId }});
            return res.data
        } catch (e) {
            throw e
        }
    },
    async postStation(station) {
        try {
            const res = await apiService.apiClient.post('/station', station);
            return res.data

        } catch (e) {
            throw e
        }
    },
    async deleteStation(station) {
        const query = "/station/" + station.id
        try {
            let saved = await apiService.apiClient.delete(query);
            return saved.data;

        } catch (e) {
            throw e
        }
    },
    async updateStation(station) {
        try {
            let saved = await apiService.apiClient.patch('/station', station);
            return saved.data;
        } catch (e) {
            throw e
        }
    }

}