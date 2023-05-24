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
    },
    async getMyStation(userId) {
        try {
            console.log("Llamo a getStation con Query");
            const res = await apiService.apiClient.get('/station', { params: { userId: userId }});
            console.log(res.data);
            return res.data
        } catch (e) {
            throw e
        }
    },
    async postStation(station) {
        try {
            const res = await apiService.apiClient.post('/station', station);
            console.log("El backend devolvio el siguiente mensaje: " + res.data);
            return res.data

        } catch (e) {
            throw "Error de conexion"
        }
    },
    async deleteStation(station) {
        try {
            let saved = await apiService.apiClient.delete('/station', { params: { id: station.id } });
            console.log("El backend devolvio el siguiente mensaje: " + saved.data);
            return saved.data;

        } catch (e) {
            throw "Error de conexion"
        }
    },
    async updateStation(station) {
        try {
            let saved = await apiService.apiClient.patch('/station', station);
            console.log("El backend devolvio el siguiente mensaje: " + saved.data);
            return saved.data;
        } catch (e) {
            throw "Error de conexion"
        }
    }

}