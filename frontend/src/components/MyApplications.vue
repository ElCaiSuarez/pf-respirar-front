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
            <tr
              v-for="user in users"
              :key="user.id"
              v-on:click="getMyApplication(user.id, user.type)"
            >
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
      <div v-show="!isAdmin">
        <h2 class="margin-end-20">Mis Solicitudes | User</h2>
        <button
          @click="mostrarCrear(userSelected)"
          class="btn btn-success margin-end-20"
        >
          Crear solicitud
        </button>
        <div class="alert alert-success" v-show="crear">
          <label>Nombre </label><br />
          <input v-model="applicationPostName" required /><br />
          <label>Descripcion </label><br />
          <input v-model="applicationPostDescription" required /><br />
          <label>Numero de Serie </label><br />
          <input v-model="applicationPostSerial" required /><br />
          <label>Latitud </label><br />
          <input v-model="applicationPostLatitude" required /><br />
          <label>Longitud </label><br />
          <input v-model="applicationPostLongitude" required /><br />
          <span v-if="!this.validateLongitud(applicationPostName, 4, 20)"
            >Recordá que el nombre tiene que tener entre 4 y 20 caracteres</span
          ><br />
          <span v-if="!this.validateLongitud(applicationPostDescription, 4, 40)"
            >Recordá que la descripción tiene que tener entre 4 y 40
            caracteres</span
          ><br />
          <span v-if="!this.validateLongitud(applicationPostSerial, 4, 10)"
            >Recordá que el serial tiene que tener entre 4 y 10 caracteres</span
          >
          <button
            @click="createApplication(applicationPost)"
            class="btn btn-success mb-3"
            v-if="
              this.validateLongitud(applicationPostName, 4, 20) &&
              this.validateLongitud(applicationPostDescription, 4, 40) &&
              this.validateLongitud(applicationPostSerial, 4, 10) &&
              this.validateLongitud(applicationPostLatitude, 4, 10) &&
              this.validateLongitud(applicationPostLongitude, 4, 10)
            "
          >
            Guardar</button
          ><br />
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
              <tr
                v-for="application in applications"
                :key="application.id"
                style="background-color: #a7aa0025"
              >
                <th scope="row">{{ application.id }}</th>
                <td>{{ application.name }}</td>
                <td>{{ application.description }}</td>
                <td>{{ application.serial }}</td>
                <td>{{ application.status }}</td>
                <td>
                  <button
                    @click="mostrarUpdate(application)"
                    class="btn btn-primary mb-3"
                    v-if="this.isPending(application.status)"
                  >
                    Actualizar
                  </button>
                </td>
                <td>
                  <button
                    @click="mostrarDelete(application)"
                    class="btn btn-danger mb-3"
                    v-if="this.isPending(application.status)"
                  >
                    Borrar
                  </button>
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
            <!-- <label>Numero de Serie </label><br />
            <input v-model="applicationForm.serial" required /><br /> -->
            <span v-if="!this.validateLongitud(applicationForm.name, 4, 20)"
              >Recordá que el nombre tiene que tener entre 4 y 20
              caracteres</span
            ><br />
            <span
              v-if="!this.validateLongitud(applicationForm.description, 4, 40)"
              >Recordá que la descripción tiene que tener entre 4 y 40
              caracteres</span
            ><br />
            <!-- <span v-if="!this.validateLongitud(applicationForm.serial, 4, 10)"
              >Recordá que el serial tiene que tener entre 4 y 10
              caracteres</span
            ><br /> -->
            <button
              @click="updateApplication(applicationForm)"
              class="btn btn-primary mb-3"
              v-if="
                this.validateLongitud(applicationForm.name, 4, 20) &&
                this.validateLongitud(applicationForm.description, 4, 40) /* &&
                this.validateLongitud(applicationForm.serial, 4, 10) */
              "
            >
              Guardar</button
            ><br />
          </div>
          <div class="alert alert-danger" v-show="borrar">
            <input v-model="applicationForm.id" hidden />
            <label>Nombre </label><br />
            <input v-model="applicationForm.name" disabled /> <br />
            <label>Descripcion </label><br />
            <input v-model="applicationForm.description" disabled /><br />
            <label>Numero de Serie </label><br />
            <input v-model="applicationForm.serial" disabled /><br /><br />
            <button
              @click="deleteApplication(applicationForm)"
              class="btn btn-danger mb-3"
            >
              Borrar</button
            ><br />
          </div>
        </div>
      </div>
      <div v-show="isAdmin">
        <h2 class="margin-end-20">Mis Solicitudes | Admin</h2>
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
              <tr
                v-for="application in applications"
                :key="application.id"
                style="background-color: #a7aa0025"
              >
                <th scope="row">{{ application.id }}</th>
                <td>{{ application.name }}</td>
                <td>{{ application.description }}</td>
                <td>{{ application.serial }}</td>
                <td>{{ application.userId }}</td>
                <td>{{ application.status }}</td>
                <td>
                  <button
                    @click="mostrarAccept(application)"
                    class="btn btn-success mb-3"
                    v-if="this.isPending(application.status)"
                  >
                    Aceptar
                  </button>
                </td>
                <td>
                  <button
                    @click="mostrarReject(application)"
                    class="btn btn-danger mb-3"
                    v-if="this.isPending(application.status)"
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="alert alert-success" v-show="editar">
            <input v-model="applicationForm.id" hidden />
            <label>Nombre </label><br />
            <input v-model="applicationForm.name" disabled /><br />
            <label>Descripcion </label><br />
            <input v-model="applicationForm.description" disabled /><br />
            <label>Numero de Serie </label><br />
            <input v-model="applicationForm.serial" disabled /><br />
            <label>Usuario </label><br />
            <input v-model="applicationForm.userId" disabled /><br />
            <label>Estado </label><br />
            <input v-model="applicationForm.status" disabled /><br /><br />
            <button
              @click="acceptApplication(applicationForm)"
              class="btn btn-success mb-3"
            >
              Aceptar</button
            ><br />
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
            <input v-model="applicationForm.userId" disabled /><br />
            <label>Estado </label><br />
            <input v-model="applicationForm.status" disabled /><br /><br />
            <button
              @click="rejectApplication(applicationForm)"
              class="btn btn-danger mb-3"
            >
              Rechazar</button
            ><br />
          </div>
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
import applicationService from "../services/applicationService";
import stationService from "../services/stationService";
import userService from "../services/userService";

export default {
  data() {
    return {
      applications: [],
      stations: [],
      applicationForm: {},
      applicationPost: {},
      applicationPostName: "",
      applicationPostDescription: "",
      applicationPostSerial: "",
      applicationPostLatitude: "",
      applicationPostLongitude: "",
      application: {},
      users: [],
      user: 0,
      userSelected: 0,
      userPost: {},
      mensajeError: "",
      mensajeOk: "",
      seleccionarUsuario: true,
      isAdmin: false,
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
      this.borrar = false;
      this.editar = false;
      this.crear = false;
      this.isAdmin = false;
      this.mostrarOk = false;
      this.mostrarError = false;
    },
    async getMyApplication(userId, type) {
      try {
        //this.getMyStations();
        if (type === "ADMIN") {
          this.isAdmin = true;
          this.userSelected = userId;
          this.applications = await applicationService.getAdminApplication();
          this.seleccionarUsuario = false;
        } else {
          this.userSelected = userId;
          this.applications = await applicationService.getUserApplication(userId);
          this.seleccionarUsuario = false;
        }
      } catch (e) {
        this.mensajeError = e;
        this.mostrarError = true;
      }
    },
    async getMyStations() {
      try {
        this.stations = await stationService.getStation();
      } catch (e) {
        this.mensajeError = e;
        this.mostrarError = true;
      }
    },
    async createApplication(application) {
      try {
        application.name = this.applicationPostName;
        application.description = this.applicationPostDescription;
        application.serial = this.applicationPostSerial;
        application.latitude = this.applicationPostLatitude;
        application.longitude = this.applicationPostLongitude;
        application.userId = this.userSelected;
        this.applications.push(
          await applicationService.postApplication(application)
        );
        this.applicationPostName = "";
        this.applicationPostDescription = "";
        this.applicationPostSerial = "";
        this.crear = false;
        this.applicationPost = {};
        this.mensajeOk = "Solicitud Creada";
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
    isPendingOrAccepted(estado) {
      return estado == "Aceptada" || estado == "Pendiente";
    },
    isPending(estado){
      return estado == "Pendiente"
    },
    async mostrarUpdate(application) {
      this.crear = false;
      this.borrar = false;
      this.editar = !this.editar;
      this.mostrarOk = false;
      this.mostrarError = false;
      this.applicationForm.id = application.id;
      this.applicationForm.name = application.name;
      this.applicationForm.description = application.description;
      this.applicationForm.serial = application.serial;
      this.applicationForm.userId = application.userId;
      this.applicationForm.status = application.status;
      //this.serialProvi = application.serial;
    },
    async updateApplication(applicationForm) {
      try {
        console.log("Solicitud Actualizada: " + applicationForm);
        const index = this.applications.findIndex(
          (s) => s.id === applicationForm.id
        );
        this.applications[index] = await applicationService.updateApplication(
          applicationForm
        );
        this.editar = false;
        this.mensajeOk = "Solicitud Actualizada";
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
    async mostrarDelete(application) {
      this.crear = false;
      this.editar = false;
      this.borrar = !this.borrar;
      this.mostrarOk = false;
      this.mostrarError = false;
      this.applicationForm.id = application.id;
      this.applicationForm.name = application.name;
      this.applicationForm.description = application.description;
      this.applicationForm.serial = application.serial;
      this.applicationForm.userId = application.userId;
      this.applicationForm.status = application.status;
    },
    async deleteApplication(applicationForm) {
      try {
        console.log("Solicitud Borrada: " + applicationForm);
        if(applicationForm.status == 'Aceptada'){
          //Borrar la Solicitud y la Estacion (Podemos usar el Numero de Serie para Buscar la Estacion)
          this.mensajeOk = "ToDo: Borrar la Solicitud y la Estacion";
        }else{
          //Borro Solicitud Pendiente
          this.applications.pop(
          await applicationService.deleteApplication(applicationForm)
        );
        this.mensajeOk = "Solicitud Borrada";
        }        
        this.borrar = false;
        
        this.mostrarOk = true;
        setTimeout(() => {
          this.mostrarOk = false;
        }, 2000);
      } catch (e) {
        this.mensajeError = e;
        this.mostrarError = true;
      }
    },
    async mostrarAccept(application) {
      this.crear = false;
      this.borrar = false;
      this.editar = !this.editar;
      this.mostrarOk = false;
      this.mostrarError = false;
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
        const index = this.applications.findIndex(
          (s) => s.id === applicationForm.id
        );
        this.applications[index] = await applicationService.acceptApplication(
          applicationForm
        ); 
        this.editar = false;
        this.mensajeOk = "Solicitud Aceptada";
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
    async mostrarReject(application) {
      this.crear = false;
      this.editar = false;
      this.borrar = !this.borrar;
      this.mostrarOk = false;
      this.mostrarError = false;
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
        const index = this.applications.findIndex(
          (s) => s.id === applicationForm.id
        );
        this.applications[index] = await applicationService.rejectApplication(
          applicationForm
        ); 
        this.borrar = false;
        this.mensajeOk = "Solicitud Rechazada";
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
