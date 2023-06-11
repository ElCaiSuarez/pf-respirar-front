<template>
  <div>
    <h2>Crear Estacion</h2>
    <form @submit.prevent="saveStation">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          type="text"
          id="name"
          v-model="stationPostName"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Descripcion:</label>
        <input
          type="text"
          id="description"
          v-model="stationPostDescription"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="type">Tipo de estacion:</label>
        <input
          type="Respirar"
          id="type"
          class="form-control"
          value="Externa"
          readonly
        />
      </div>

      <button
        type="submit"
        @click="createStation(stationPost)"
        class="btn btn-success mb-3"
        v-if="isCreateValid"
      >
        Save
      </button>
      <div v-show="mostrarError">
        <label class="alert alert-danger">{{ mensajeError }}</label>
      </div>
      <div v-show="mostrarOk">
        <label class="alert alert-secondary">{{ mensajeOk }}</label>
      </div>
    </form>
    <!--<button @click="volver()" class="btn btn-secondary mb-3">Volver</button>-->
  </div>
</template>

<script>
import stationService from "../services/stationService";
import userService from "../services/userService";

export default {
  data() {
    return {
      stations: [],
      stationForm: {},
      stationPost: {},
      stationPostName: "",
      stationPostDescription: "",
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
      borrar: false,
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
    volver() {
      this.$router.push("home");
    },
    async getMyStation(userId) {
      try {
        this.userSelected = userId;
        this.stations = await stationService.getMyStation(userId);
        this.sleccionarUsuario = false;
      } catch (e) {
        this.mensajeError = e;
        this.mostrarError = true;
      }
    },
    async createStation(stationPost) {
      try {
        stationPost.name = this.stationPostName;
        stationPost.description = this.stationPostDescription;
        stationPost.userId = this.userSelected;
        this.stations.push(await stationService.postStation(stationPost));
        this.stationPostName = "";
        this.stationPostDescription = "";
        this.crear = false;
        this.stationPost = {};
        this.mensajeOk = "Estacion Creada";
        this.mostrarOk = true;
      } catch (e) {
        this.mensajeError = e;
        this.mostrarError = true;
      }
    },
    validateCreate() {
      return (
        this.stationPostName.length > 3 &&
        this.stationPostDescription.length > 3
      );
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
      this.stationForm.userId = station.userId;
    },
    async updateStation(stationForm) {
      try {
        console.log("Station Actualizado: " + stationForm);
        const index = this.stations.findIndex((s) => s.id === stationForm.id);
        this.stations[index] = await stationService.updateStation(stationForm);
        this.editar = false;
        this.mensajeOk = "Estacion Actualizada";
        this.mostrarOk = true;
      } catch (e) {
        this.mensajeError = e;
        this.mostrarError = true;
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
      this.stationForm.userId = station.userId;
    },
    async deleteStation(stationForm) {
      try {
        console.log("Station Borrado: " + stationForm);
        this.stations.pop(await stationService.deleteStation(stationForm));
        this.borrar = false;
        this.mensajeOk = "Estacion Borrada";
        this.mostrarOk = true;
      } catch (e) {
        this.mensajeError = e;
        this.mostrarError = true;
      }
    },
  },
  computed: {
    isCreateValid() {
      return this.validateCreate();
    },
  },
};
</script>
