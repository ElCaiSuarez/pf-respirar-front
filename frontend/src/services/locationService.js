import apiService from './apiService'

export default {
    async getLocations() {
        try {
            apiService.apiClient.defaults.headers['authorization'] =
                JSON.parse(localStorage.getItem('usuario')).token
            const datos = await apiService.apiClient.get('/locations');
            return datos.data
        } catch (e) {
            throw "Error de conexion"
        }
    }
}