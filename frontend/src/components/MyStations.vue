<template>
    <div>
        <div v-show="sleccionarUsuario">
            <h2>Seleccione un Usuario (Login ToDo): </h2><br />
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id" v-on:click="getMyStation(user.id)">
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br />
        <div v-show="!sleccionarUsuario">
            <button @click="volver()" class="btn btn-secondary mb-3">Volver</button>
            <h2>Mis Estaciones: </h2>
            <button @click="mostrarCrear(userSelected)" class="btn btn-success">Crear</button><br />
            <div class="alert alert-success" v-show="crear">
                <label>Nombre </label><br />
                <input v-model="stationPostName" required /><br />
                <label>Descripcion </label><br />
                <input v-model="stationPostDescription" required /><br />
                <label>Numero de Serie </label><br />
                <input v-model="stationPostSerial" required /><br />
                <span v-if="!isCreateValid">Nombre o Descripcion no válido</span><br />
                <button @click="createStation(stationPost)" class="btn btn-success mb-3"
                    v-if="isCreateValid">Guardar</button><br />
            </div>
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Numero de Serie</th>
                            <th scope="col">Tipo</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="station in stations" :key="station.id" v-on:click=""  style="background-color: #a7aa0025">
                            <th scope="row">{{ station.id }}</th>
                            <td>{{ station.name }}</td>
                            <td>{{ station.description }}</td>
                            <td>{{ station.serial }}</td>
                            <td>{{ station.type }}</td>
                            <td><button @click="mostrarUpdate(station)"
                                    class="btn btn-primary mb-3">Actualizar</button><br /></td>
                            <td><button @click="mostrarDelete(station)" class="btn btn-danger mb-3">Borrar</button><br />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="alert alert-primary" v-show="editar">
                    <input v-model="stationForm.id" hidden/>
                    <label>Nombre </label><br />
                    <input v-model="stationForm.name" /><br />
                    <label>Descripcion </label><br />
                    <input v-model="stationForm.description" /><br />
                    <label>Numero de Serie </label><br />
                    <input v-model="stationForm.serial" /><br /><br />
                    <button @click="updateStation(stationForm)" class="btn btn-primary mb-3">Guardar</button><br />
                </div>
                <div class="alert alert-danger" v-show="borrar">
                    <input v-model="stationForm.id" hidden />
                    <label>Nombre </label><br />
                    <input v-model="stationForm.name" disabled /> <br />
                    <label>Descripcion </label><br />
                    <input v-model="stationForm.description" disabled /><br /><br />
                    <label>Numero de Serie </label><br />
                    <input v-model="stationForm.serial" disabled /><br /><br />
                    <button @click="deleteStation(stationForm)" class="btn btn-danger mb-3">Borrar</button><br />
                </div>
            </div>
        </div>
        <div v-show="mostrarError">
            <label class="alert alert-danger">{{ mensajeError }}</label>
        </div>
        <div v-show="mostrarOk">
            <label class="alert alert-secondary">{{ mensajeOk }}</label>
        </div>
    </div>
</template>

<script>
import stationService from '../services/stationService';
import userService from '../services/userService';

export default {
    data() {
        return {
            stations: [],
            stationForm: {},
            stationPost: {},
            stationPostName: "",
            stationPostDescription: "",
            stationPostSerial: "",
            station: {},
            users: [],
            user: 0,
            userSelected: 0,
            userPost: {},
            mensajeError: "",
            mensajeOk: "",
            sleccionarUsuario: true,
            mostrarError: false,
            mostrarOk: false,
            crear: false,
            editar: false,
            borrar: false
        }
    },
    mounted: function () {
            userService.getUser().then(res => {
                this.users = res
            })
            .catch(error => {
                this.mensajeError = error;
                this.mostrarError = true
            })
    },
    methods: {
        async mostrarCrear() {
            this.borrar = false;
            this.editar = false;
            this.crear = !this.crear
            this.mostrarOk = false
            this.mostrarError = false
        },
        volver() {
            this.sleccionarUsuario = true
        },
        async getMyStation(userId) {
            try {
                this.userSelected = userId
                this.stations = await stationService.getMyStation(userId)
                this.sleccionarUsuario = false
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        async createStation(stationPost) {
            try {
                stationPost.name = this.stationPostName
                stationPost.description = this.stationPostDescription
                stationPost.serial = this.stationPostSerial
                stationPost.userId = this.userSelected
                this.stations.push(await stationService.postStation(stationPost))
                this.stationPostName = ""
                this.stationPostDescription = ""
                this.stationPostSerial = ""
                this.crear = false;
                this.stationPost = {}
                this.mensajeOk = "Estacion Creada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        validateCreate() {
            return this.stationPostName.length > 3 && this.stationPostDescription.length > 3
        },
        async mostrarUpdate(station) {
            this.crear = false;
            this.borrar = false;
            this.editar = !this.editar;
            this.mostrarOk = false
            this.mostrarError = false
            this.stationForm.id = station.id;
            this.stationForm.name = station.name;
            this.stationForm.description = station.description;
            this.stationForm.serial = station.serial;
            this.stationForm.userId = station.userId;
        },
        async updateStation(stationForm) {
            try {
                console.log("Station Actualizado: " + stationForm);
                const index = this.stations.findIndex(s => s.id === stationForm.id)
                this.stations[index] = await stationService.updateStation(stationForm)
                this.editar = false;
                this.mensajeOk = "Estacion Actualizada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        async mostrarDelete(station) {
            this.crear = false
            this.editar = false
            this.borrar = !this.borrar
            this.mostrarOk = false
            this.mostrarError = false
            this.stationForm.id = station.id;
            this.stationForm.name = station.name;
            this.stationForm.description = station.description;
            this.stationForm.serial = station.serial;
            this.stationForm.userId = station.userId;
        },
        async deleteStation(stationForm) {
            try {
                console.log("Station Borrado: " + stationForm);
                this.stations.pop(await stationService.deleteStation(stationForm))
                this.borrar = false;
                this.mensajeOk = "Estacion Borrada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        }
    },
    computed: {
        isCreateValid() {
            return this.validateCreate();
        }
    }
}
</script>