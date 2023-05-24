<template>
    <div>
        <div v-show="sleccionarUsuario">
            <h1>Seleccione un Usuario: </h1><br />
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
                            <th scope="row">{{user.id}}</th>
                            <td>{{user.username}}</td>
                            <td>{{user.email}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br />
        <div v-show="!sleccionarUsuario">
            <h1>Mis Estaciones: </h1><br />
            <button @click="volver()" class="btn btn-secondary mb-3">Volver</button><br />
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Usuario</th>
                            <th><button @click="mostrarCrear(userSelected)" class="btn btn-success">Crear</button></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="station in stations" :key="station.id" v-on:click="">
                            <th scope="row">{{station.id}}</th>
                            <td>{{station.name}}</td>
                            <td>{{station.description}}</td>
                            <td>{{station.userId}}</td>
                            <td><button @click="mostrarUpdate(station)"
                                    class="btn btn-primary mb-3">Actualizar</button><br /></td>
                            <td><button @click="mostrarDelete(station)"
                                    class="btn btn-danger mb-3">Borrar</button><br /></td>
                        </tr>
                    </tbody>
                </table>
                <div class="alert alert-success" v-show="crear">
                    <label>Nombre </label><br />
                    <input v-model="stationPost.name" required /><br />
                    <label>Descripcion </label><br />
                    <input v-model="stationPost.description" required /><br />
                    <input v-model="stationPost.userId" hidden /><br />                  
                    <button @click="createStation(stationPost)" class="btn btn-success mb-3">Guardar</button><br />
                </div>
                <div class="alert alert-primary" v-show="editar">
                    <input v-model="stationForm.id" hidden />
                    <label>Nombre </label><br />
                    <input v-model="stationForm.name" /><br />
                    <label>Descripcion </label><br />
                    <input v-model="stationForm.description" /><br />
                    <input v-model="stationForm.userId" hidden /><br />
                    <button @click="updateStation(stationForm)" class="btn btn-primary mb-3">Guardar</button><br />
                </div>
                <div class="alert alert-danger" v-show="borrar">
                    <input v-model="stationForm.id" hidden />
                    <label>Nombre </label><br />
                    <input v-model="stationForm.name" disabled />
                    <input v-model="stationForm.description" hidden />
                    <input v-model="stationForm.userId" hidden /><br /><br />
                    <button @click="deleteStation(stationForm)" class="btn btn-danger mb-3">Borrar</button><br />
                </div>
                <div class="alert alert-danger" v-show="mostrar">
                    {{ mensajeError }}
                </div>
            </div>
            <br />
        </div>
    </div>
</template>

<script>
import stationService from '../services/stationService';
import UserService from '../services/userService';

export default {
    data() {
        return {
            stations: [],
            stationForm: { id: 0, name: "", description: "", userId: 0 },
            stationPost: { id: 0, name: "", description: "", userId: 0 },
            station: {},
            users: [],
            user: 0,
            userSelected: 0,
            userPost: {},
            mensajeError: "",
            sleccionarUsuario: true,
            mostrar: false,
            crear: false,
            editar: false,
            borrar: false
        }
    },
    mounted:function(){
        console.log("Busqueda de Usuarios");
        UserService.getUser().then(res => {
            this.users = res
            console.log(this.users);
        });
    },
    methods:{
        async mostrarCrear() {
            this.borrar = false;
            this.editar = false;
            this.crear = true;
        },
        volver(){
            this.sleccionarUsuario = true
        },
        async getMyStation(userId) {
            try {
                console.log("Busqueda de Estaciones por Usuario");
                this.userSelected = userId
                this.stations = await stationService.getMyStation(userId)
                console.log(this.stations);
                this.sleccionarUsuario = false
            } catch (e) {
                this.mensajeError = e;
            }
        },
        async createStation(stationPost) {
            try {
                    stationPost.userId = this.userSelected
                    this.stations.push(await stationService.postStation(stationPost))
                    alert("Station Creado")
                    this.crear = false;
            } catch (e) {
                this.mensajeError = e;
            }
        },
        async mostrarUpdate(station) {
            this.crear = false;
            this.borrar = false;
            this.editar = true;
            this.stationForm.id = station.id;
            this.stationForm.name = station.name;
            this.stationForm.description = station.description;
            this.stationForm.userId = station.userId;
        },
        async updateStation(stationForm) {
            try {
                console.log("Station Actualizado: " + stationForm);
                this.station = await stationService.updateStation(stationForm)
                alert("Station Actualizado")
                this.editar = false;
            } catch (e) {
                this.mensajeError = e;
            }
        },
        async mostrarDelete(station) {
            this.crear = false;
            this.editar = false;
            this.borrar = true;
            this.stationForm.id = station.id;
            this.stationForm.name = station.name;
            this.stationForm.description = station.description;
            this.stationForm.userId = station.userId;
        },
        async deleteStation(stationForm) {
            try {
                console.log("Station Borrado: " + stationForm);
                this.stations.pop(await stationService.deleteStation(stationForm))
                alert("Station Borrado")
                this.borrar = false;
            } catch (e) {
                this.mensajeError = e;
            }
        }
    }
}
</script>