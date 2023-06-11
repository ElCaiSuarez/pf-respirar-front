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
          value="Respirar"
          readonly
        />
      </div>

      <button
        type="submit"
        @click="createStation(stationPost)"
        class="btn btn-success mb-3"
        v-if="isCreateValid"
      >
        Guardar
      </button>
      <div v-show="mostrarError">
        <label class="alert alert-danger">{{ mensajeError }}</label>
      </div>
      <div v-show="mostrarOk">
        <label class="alert alert-secondary">{{ mensajeOk }}</label>
      </div>
    </form>
    <button @click="volver()" class="btn btn-secondary mb-3">Volver</button>
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
      userPost: {},
      mensajeError: "",
      mensajeOk: "",
      mostrarError: false,
      mostrarOk: false,
      crear: false,
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
      this.$router.push({
        path: "home",
      });
    },
    async createStation(stationPost) {
      try {
        stationPost.name = this.stationPostName;
        stationPost.description = this.stationPostDescription;
        stationPost.userId = 1; //user.id = 1
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
  },
  computed: {
    isCreateValid() {
      return this.validateCreate();
    },
  },
};
</script>
