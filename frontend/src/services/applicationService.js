import apiService from './apiService'

export default {
    async getApplication() {
        try {
            console.log("Llamo a getApplication");
            const res = await apiService.apiClient.get('/application');
            //console.log(res.data);
            return res.data
        } catch (e) {
            throw e
        }
    },
    async getMyApplication(userId) {
        try {
            console.log("Llamo a getApplication con Query");
            const res = await apiService.apiClient.get('/application', { params: { userId: userId }});
            //console.log(res.data);
            return res.data
        } catch (e) {
            throw e
        }
    },
    async postApplication(application) {
        try {
            const res = await apiService.apiClient.post('/application', application);
            //console.log("El backend devolvio el siguiente mensaje: " + res.data);
            return res.data

        } catch (e) {
            throw e
        }
    },
    async deleteApplication(application) {
        const query = "/application/" + application.id
        try {
            let saved = await apiService.apiClient.delete(query);
            //console.log("El backend devolvio el siguiente mensaje: " + saved.data);
            return saved.data;

        } catch (e) {
            throw e
        }
    },
    async updateApplication(application) {
        try {
            let saved = await apiService.apiClient.patch('/application', application);
            //console.log("El backend devolvio el siguiente mensaje: " + saved.data);
            return saved.data;
        } catch (e) {
            throw e
        }
    },
    async acceptApplication(application) {
        const query = "/application/" + application.id + "/accept"
        try {
            let saved = await apiService.apiClient.put(query);
            //console.log("El backend devolvio el siguiente mensaje: " + saved.data);
            return saved.data;
        } catch (e) {
            throw e
        }
    },
    async rejectApplication(application) {
        const query = "/application/" + application.id + "/reject"
        try {
            let saved = await apiService.apiClient.put(query);
            //console.log("El backend devolvio el siguiente mensaje: " + saved.data);
            return saved.data;
        } catch (e) {
            throw e
        }
    }

}