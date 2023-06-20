<template>
    <div>
        <div v-show="seleccionarUsuario">
            <h2>Seleccione un Usuario (Login ToDo):</h2>
            <br />
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id" v-on:click="getMyStation(user)">
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.type }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="margin-top-10" v-show="!seleccionarUsuario">
            
                <h2 class="margin-end-20"
                v-if="isAdmin"
                >Mis Estaciones | Admin</h2>
                <h2 class="margin-end-20"
                v-if="!isAdmin"
                >Mis Estaciones | User</h2>
                <button 
                    @click="mostrarCrear(userSelected)" 
                    class="btn btn-success margin-end-20"
                    v-if="isAdmin"
                    >
                    Crear estacion RespirAR
                </button>
                <div class="alert alert-success" v-show="crear">
                    <label>Nombre </label><br />
                    <input v-model="stationPostName" required /><br />
                    <label>Descripcion </label><br />
                    <input v-model="stationPostDescription" required /><br />
                    <label>Numero de Serie </label><br />
                    <input v-model="stationPostSerial" required /><br />
                    <label>Latitud </label><br />
                    <input v-model="applicationPostLatitude" required /><br />
                    <label>Longitud </label><br />
                    <input v-model="applicationPostLongitude" required /><br />
                    <span v-if="!this.validateLongitud(stationPostName, 4, 20)">El nombre tiene que tener entre 4 y 20
                        caracteres</span><br />
                    <span v-if="!this.validateLongitud(stationPostDescription, 4, 40)">La descripción tiene que tener entre
                        4 y 40 caracteres</span><br />
                    <span v-if="!this.validateLongitud(stationPostSerial, 4, 10)">El serial tiene que tener entre 4 y 10
                        caracteres</span><br />
                    <button @click="createStation(stationPost)" class="btn btn-success mb-3" 
                        v-if="this.validateLongitud(stationPostName, 4, 20) &&
                        this.validateLongitud(stationPostDescription, 4, 40) &&
                        this.validateLongitud(stationPostSerial, 4, 10)&&
                        this.validateLongitud(applicationPostLatitude, 4, 10) &&
                        this.validateLongitud(applicationPostLongitude, 4, 10)
                        ">
                        Guardar</button><br />
                </div>
                <div class="container">
                    <table class="table table-hover margin-end-10">
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
                            <tr v-for="station in stations" :key="station.id" style="background-color: #a7aa0025">
                                <th scope="row">{{ station.id }}</th>
                                <td>{{ station.name }}</td>
                                <td>{{ station.description }}</td>
                                <td>{{ station.serial }}</td>
                                <td>{{ station.type }}</td>
                                <td>
                                    <button @click="mostrarUpdate(station)" class="btn btn-primary mb-3">
                                        Actualizar</button><br />
                                </td>
                                <td>
                                    <button @click="mostrarDelete(station)" class="btn btn-danger mb-3">
                                        Borrar</button><br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="alert alert-primary" v-show="editar">
                        <input v-model="stationForm.id" hidden />
                        <label>Nombre </label><br />
                        <input v-model="stationForm.name" /><br />
                        <label>Descripcion </label><br />
                        <input v-model="stationForm.description" /><br />
                        <!-- <label>Numero de Serie </label><br /> -->
                        <!-- <input v-model="stationForm.serial" hidden/><br /><br /> -->
                        <span v-if="!this.validateLongitud(stationForm.name, 4, 20)">El nombre tiene que tener entre 4 y 20
                            caracteres</span><br />
                        <span v-if="!this.validateLongitud(stationForm.description, 4, 40)">La descripción tiene que tener
                            entre 4 y 40 caracteres</span><br />
                        <!-- <span v-if="!this.validateLongitud(stationForm.serial, 4, 10)">El serial tiene que tener entre 4 y
                            10 caracteres</span><br /> -->
                        <button @click="updateStation(stationForm)" class="btn btn-primary mb-3" v-if="this.validateLongitud(stationForm.name, 4, 20) &&
                            this.validateLongitud(stationForm.description, 4, 40)
                            ">
                            Guardar</button><br />
                    </div>
                    <div class="alert alert-danger" v-show="borrar">
                        <input v-model="stationForm.id" hidden />
                        <label>Nombre </label><br />
                        <input v-model="stationForm.name" disabled /> <br />
                        <label>Descripcion </label><br />
                        <input v-model="stationForm.description" disabled /><br />
                        <label>Numero de Serie </label><br />
                        <input v-model="stationForm.serial" disabled /><br /><br />
                        <button @click="deleteStation(stationForm)" class="btn btn-danger mb-3">
                            Borrar</button><br />
                    </div>
                </div>
            
            <div v-show="mostrarError">
                <label class="alert alert-danger">{{ mensajeError }}</label>
            </div>
            <div v-show="mostrarOk">
                <label class="alert alert-success">{{ mensajeOk }}</label>
            </div>
            <button @click="volver()" class="btn btn-secondary mb-3">Volver</button>
        </div>
    </div>
</template>

<script>
import stationService from "../services/stationService";
import userService from "../services/userService";

export default {
    data() {
        return {
            stations: [],
            stationsTotal: [],
            stationForm: {},
            stationPost: {},
            stationPostName: "",
            stationPostDescription: "",
            stationPostSerial: "",
            station: {},
            users: [],
            user: 0,
            userSelected: 0,
            isAdmin: false,
            userPost: {},
            mensajeError: "",
            mensajeOk: "",
            seleccionarUsuario: true,
            mostrarError: false,
            mostrarOk: false,
            crear: false,
            editar: false,
            borrar: false,
            //serialProvi: "",
        };
    },
    mounted: function () {
        userService
            .getUser()
            .then((res) => {
                this.users = res;
            })
            .catch((error) => {
                this.mensajeError = error;
                this.mostrarError = true;
            });
    },
    methods: {
        async mostrarCrear() {
            this.borrar = false;
            this.editar = false;
            this.crear = !this.crear;
            this.mostrarOk = false;
            this.mostrarError = false;
        },
        volver() {
            this.seleccionarUsuario = true;
            this.isAdmin = false;
            this.borrar = false;
            this.editar = false;
            this.crear = false;
            this.mostrarOk = false;
            this.mostrarError = false;
        },
        async getMyStation(user) {
            try {
                this.isAdmin = user.type === "ADMIN";
                this.userSelected = user.id;
                this.stations = await stationService.getMyStation(user.id);
                this.stationsTotal = await stationService.getStation();
                this.seleccionarUsuario = false;
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true;
            }
        },
        async createStation(stationPost) {
            try {
                stationPost.name = this.stationPostName;
                stationPost.description = this.stationPostDescription;
                stationPost.serial = this.stationPostSerial;
                stationPost.userId = this.userSelected;
                this.stations.push(await stationService.postStation(stationPost));
                this.stationPostName = "";
                this.stationPostDescription = "";
                this.stationPostSerial = "";
                this.crear = false;
                this.stationPost = {};
                this.mensajeOk = "Estacion Creada";
                this.mostrarOk = true;
                setTimeout(() => {
                    this.mostrarOk = false;
                }, 2000);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    this.mensajeError = error.response.data;
                } else {
                    this.mensajeError = error.message;
                }
                this.mostrarError = true;
                setTimeout(() => {
                    this.mostrarError = false;
                }, 3000);
            }
        },
        validateLongitud(nombre, longMin, longMax) {
            var result = false;
            if (nombre != null) {
                if (nombre.length >= longMin && nombre.length <= longMax) {
                    result = true;
                }
            }
            return result;
        },
        async mostrarUpdate(station) {
            this.crear = false;
            this.borrar = false;
            this.editar = !this.editar;
            this.mostrarOk = false;
            this.mostrarError = false;
            this.stationForm.id = station.id;
            this.stationForm.name = station.name;
            this.stationForm.description = station.description;
            this.stationForm.serial = station.serial;
            this.stationForm.userId = station.userId;
            //this.serialProvi = station.serial;
        },
        async updateStation(stationForm) {
            try {
                console.log("Station Actualizado: " + stationForm);
                const index = this.stations.findIndex((s) => s.id === stationForm.id);
                this.stations[index] = await stationService.updateStation(stationForm);
                this.editar = false;
                this.mensajeOk = "Estacion Actualizada";
                this.mostrarOk = true;
                setTimeout(() => {
                    this.mostrarOk = false;
                }, 2000);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    this.mensajeError = error.response.data;
                } else {
                    this.mensajeError = error.message;
                }
                this.mostrarError = true;
                setTimeout(() => {
                    this.mostrarError = false;
                }, 3000);
            }
        },
        async mostrarDelete(station) {
            this.crear = false;
            this.editar = false;
            this.borrar = !this.borrar;
            this.mostrarOk = false;
            this.mostrarError = false;
            this.stationForm.id = station.id;
            this.stationForm.name = station.name;
            this.stationForm.description = station.description;
            this.stationForm.serial = station.serial;
            this.stationForm.userId = station.userId;
        },
        async deleteStation(stationForm) {
            try {
                console.log("Station Borrado: " + stationForm);
                this.stations.pop(await stationService.deleteStation(stationForm));
                this.borrar = false;
                this.mensajeOk = "Estacion Borrada";
                this.mostrarOk = true;
                setTimeout(() => {
                    this.mostrarOk = false;
                }, 2000);
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true;
            }
        },
    },
    computed: {},
};
</script>
