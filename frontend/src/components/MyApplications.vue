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
                            <th scope="col">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id" v-on:click="getMyApplication(user.id, user.type)">
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.type }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br />
        <div v-show="!sleccionarUsuario">
            <div v-show="!isAdmin">
                <button @click="volver()" class="btn btn-secondary mb-3">Volver</button><br />
                <h2>Mis Solicitudes: (USER) </h2><br />
                <button @click="mostrarCrear(userSelected)" class="btn btn-success">Crear</button>
                <div class="alert alert-success" v-show="crear">
                    <label>Nombre </label><br />
                    <input v-model="applicationPostName" required /><br />
                    <label>Descripcion </label><br />
                    <input v-model="applicationPostDescription" required /><br />
                    <label>Numero de Serie </label><br />
                    <input v-model="applicationPostSerial" required /><br />
                    <span v-if="!isCreateValid">Nombre/Descripcion/Serial no válido</span><br />
                    <button @click="createApplication(applicationPost)" class="btn btn-success mb-3"
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
                                <th scope="col">Estado</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="application in applications" :key="application.id" v-on:click="" style="background-color: #a7aa0025">
                                <th scope="row">{{ application.id }}</th>
                                <td>{{ application.name }}</td>
                                <td>{{ application.description }}</td>
                                <td>{{ application.serial }}</td>
                                <td>{{ application.status }}</td>
                                <td><button @click="mostrarUpdate(application)"
                                        class="btn btn-primary mb-3">Actualizar</button></td>
                                <td><button @click="mostrarDelete(application)"
                                        class="btn btn-danger mb-3">Borrar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="alert alert-primary" v-show="editar">
                        <input v-model="applicationForm.id" hidden />
                        <label>Nombre </label><br />
                        <input v-model="applicationForm.name" /><br />
                        <label>Descripcion </label><br />
                        <input v-model="applicationForm.description" /><br />
                        <label>Numero de Serie </label><br />
                        <input v-model="applicationForm.serial" /><br /><br />
                        <button @click="updateApplication(applicationForm)" class="btn btn-primary mb-3">Guardar</button><br />
                    </div>
                    <div class="alert alert-danger" v-show="borrar">
                        <input v-model="applicationForm.id" hidden />
                        <label>Nombre </label><br />
                        <input v-model="applicationForm.name" disabled /> <br />
                        <label>Descripcion </label><br />
                        <input v-model="applicationForm.description" disabled /><br />
                        <label>Numero de Serie </label><br />
                        <input v-model="applicationForm.serial" disabled /><br /><br />
                        <button @click="deleteApplication(applicationForm)" class="btn btn-danger mb-3">Borrar</button><br />
                    </div>
                </div>
            </div>
            <div v-show="isAdmin">
                <button @click="volver()" class="btn btn-secondary mb-3">Volver</button><br />
                <h2>Mis Solicitudes: (ADMIN) </h2><br />
                <div class="container">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Numero de Serie</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Estado</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="application in applications" :key="application.id" v-on:click="" style="background-color: #a7aa0025">
                                <th scope="row">{{ application.id }}</th>
                                <td>{{ application.name }}</td>
                                <td>{{ application.description }}</td>
                                <td>{{ application.serial }}</td>
                                <td>{{ application.userId }}</td>
                                <td>{{ application.status }}</td>
                                <td><button @click="mostrarAccept(application)"
                                        class="btn btn-success mb-3">Aceptar</button></td>
                                <td><button @click="mostrarReject(application)"
                                        class="btn btn-danger mb-3">Rechazar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="alert alert-success" v-show="editar">
                        <input v-model="applicationForm.id" hidden />
                        <label>Nombre </label><br />
                        <input v-model="applicationForm.name" disabled/><br />
                        <label>Descripcion </label><br />
                        <input v-model="applicationForm.description" disabled/><br />
                        <label>Numero de Serie </label><br />
                        <input v-model="applicationForm.serial" disabled/><br />
                        <label>Usuario </label><br />
                        <input v-model="applicationForm.userId" disabled/><br />
                        <label>Estado </label><br />
                        <input v-model="applicationForm.status" disabled/><br /><br />
                        <button @click="acceptApplication(applicationForm)" class="btn btn-success mb-3">Aceptar</button><br />
                    </div>
                    <div class="alert alert-danger" v-show="borrar">
                        <input v-model="applicationForm.id" hidden />
                        <label>Nombre </label><br />
                        <input v-model="applicationForm.name" disabled /> <br />
                        <label>Descripcion </label><br />
                        <input v-model="applicationForm.description" disabled /><br />
                        <label>Numero de Serie </label><br />
                        <input v-model="applicationForm.serial" disabled /><br />
                        <label>Usuario </label><br />
                        <input v-model="applicationForm.userId" disabled/><br />
                        <label>Estado </label><br />
                        <input v-model="applicationForm.status" disabled/><br /><br />
                        <button @click="rejectApplication(applicationForm)" class="btn btn-danger mb-3">Rechazar</button><br />
                    </div>
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
import applicationService from '../services/applicationService';
import userService from '../services/userService';

export default {
    data() {
        return {
            applications: [],
            applicationForm: {},
            applicationPost: {},
            applicationPostName: "",
            applicationPostDescription: "",
            applicationPostSerial: "",
            application: {},
            users: [],
            user: 0,
            userSelected: 0,
            userPost: {},
            mensajeError: "",
            mensajeOk: "",
            sleccionarUsuario: true,
            isAdmin:false,
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
            this.borrar = false
            this.editar = false
            this.crear = !this.crear
            this.mostrarOk = false
            this.mostrarError = false
        },
        volver() {
            this.sleccionarUsuario = true
            this.borrar = false
            this.editar = false
            this.crear = false
            this.isAdmin = false
            this.mostrarOk = false
            this.mostrarError = false
        },
        async getMyApplication(userId, type) {
            
            try {
                if(type === "ADMIN"){
                this.isAdmin = true
                this.userSelected = userId
                this.applications = await applicationService.getApplication()
                this.sleccionarUsuario = false
            }else{
                this.userSelected = userId
                this.applications = await applicationService.getMyApplication(userId)
                this.sleccionarUsuario = false
            }
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        async createApplication(application) {
            try {
                application.name = this.applicationPostName
                application.description = this.applicationPostDescription
                application.serial = this.applicationPostSerial
                application.userId = this.userSelected
                this.applications.push(await applicationService.postApplication(application))
                this.applicationPostName = ""
                this.applicationPostDescription = ""
                this.applicationPostSerial = ""
                this.crear = false;
                this.applicationPost = {}
                this.mensajeOk = "Solicitud Creada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        validateCreate() {
            return this.applicationPostName.length > 3 && this.applicationPostDescription.length > 3 && this.applicationPostSerial.length > 3
        },
        async mostrarUpdate(application) {
            this.crear = false;
            this.borrar = false;
            this.editar = !this.editar;
            this.mostrarOk = false
            this.mostrarError = false
            this.applicationForm.id = application.id;
            this.applicationForm.name = application.name;
            this.applicationForm.description = application.description;
            this.applicationForm.serial = application.serial;
            this.applicationForm.userId = application.userId;
        },
        async updateApplication(applicationForm) {
            try {
                console.log("Solicitud Actualizada: " + applicationForm);
                const index = this.applications.findIndex(s => s.id === applicationForm.id)
                this.applications[index] = await applicationService.updateApplication(applicationForm)
                this.editar = false;
                this.mensajeOk = "Solicitud Actualizada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        async mostrarDelete(application) {
            this.crear = false
            this.editar = false
            this.borrar = !this.borrar
            this.mostrarOk = false
            this.mostrarError = false
            this.applicationForm.id = application.id;
            this.applicationForm.name = application.name;
            this.applicationForm.description = application.description;
            this.applicationForm.serial = application.serial;
            this.applicationForm.userId = application.userId;
        },
        async deleteApplication(applicationForm) {
            try {
                console.log("Solicitud Borrada: " + applicationForm);
                this.applications.pop(await applicationService.deleteApplication(applicationForm))
                this.borrar = false;
                this.mensajeOk = "Solicitud Borrada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        async mostrarAccept(application) {
            this.crear = false;
            this.borrar = false;
            this.editar = !this.editar;
            this.mostrarOk = false
            this.mostrarError = false
            this.applicationForm.id = application.id;
            this.applicationForm.name = application.name;
            this.applicationForm.description = application.description;
            this.applicationForm.serial = application.serial;
            this.applicationForm.status = application.status;
            this.applicationForm.userId = application.userId;
        },
        async acceptApplication(applicationForm) {
            try {
                console.log("Solicitud Aceptada: " + applicationForm);
                const index = this.applications.findIndex(s => s.id === applicationForm.id)
                this.applications[index] = await applicationService.acceptApplication(applicationForm)
                this.editar = false;
                this.mensajeOk = "Solicitud Aceptada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
        async mostrarReject(application) {
            this.crear = false
            this.editar = false
            this.borrar = !this.borrar
            this.mostrarOk = false
            this.mostrarError = false
            this.applicationForm.id = application.id;
            this.applicationForm.name = application.name;
            this.applicationForm.description = application.description;
            this.applicationForm.serial = application.serial;
            this.applicationForm.status = application.status;
            this.applicationForm.userId = application.userId;
        },
        async rejectApplication(applicationForm) {
            try {
                console.log("Solicitud Rechazada: " + applicationForm);
                this.applications.pop(await applicationService.rejectApplication(applicationForm))
                this.borrar = false;
                this.mensajeOk = "Solicitud Rechazada";
                this.mostrarOk = true
            } catch (e) {
                this.mensajeError = e;
                this.mostrarError = true
            }
        },
    },
    computed: {
        isCreateValid() {
            return this.validateCreate();
        }
    }
}
</script>