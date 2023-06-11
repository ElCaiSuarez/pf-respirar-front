<template>
  <div>
    <div>
      <h2 style="margin: 10px">Mis Estaciones</h2>
      <div class="container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Tipo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="station in stations" :key="station.id">
              <th scope="row">{{ station.id }}</th>
              <td>{{ station.name }}</td>
              <td>{{ station.description }}</td>
              <td>{{ station.type }}</td>
              <td>
                <button
                  @click="mostrarUpdate(station)"
                  class="btn btn-primary mb-3"
                >
                  Actualizar</button
                ><br />
              </td>
              <td>
                <button
                  @click="mostrarDelete(station)"
                  class="btn btn-danger mb-3"
                >
                  Borrar</button
                ><br />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="alert alert-primary" v-show="editar">
          <input v-model="stationForm.id" hidden />
          <label>Nombre </label><br />
          <input v-model="stationForm.name" /><br />
          <label>Descripcion </label><br />
          <input v-model="stationForm.description" /><br /><br />
          <button
            @click="updateStation(stationForm)"
            class="btn btn-primary mb-3"
          >
            Guardar</button
          ><br />
        </div>
        <div class="alert alert-danger" v-show="borrar">
          <input v-model="stationForm.id" hidden />
          <label>Nombre </label><br />
          <input v-model="stationForm.name" disabled /> <br />
          <label>Descripcion </label><br />
          <input v-model="stationForm.description" disabled /><br /><br />
          <button
            @click="deleteStation(stationForm)"
            class="btn btn-danger mb-3"
          >
            Borrar</button
          ><br />
        </div>
      </div>
      <div>
        <button @click="volver()" class="btn btn-secondary mb-3">Volver</button>
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
import stationService from "../services/stationService";
export default {
  data() {
    return {
      stations: [],
      stationForm: {},
      stationPost: {},
      stationPostName: "",
      stationPostDescription: "",
      station: {},
      userId: 0,
      userPost: {},
      mensajeError: "",
      mensajeOk: "",
      mostrarError: false,
      mostrarOk: false,
      crear: false,
      editar: false,
      borrar: false,
    };
  },
  methods: {
    setUserId() {
      const store = useStore();
      if (store.userRole === "admin") {
        this.userId = 1;
      } else {
        this.userId = 2;
      }
    },
    volver() {
      this.$router.push({
        path: "home",
      });
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
        console.log("Station Actualizada");
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
        console.log("Station Borrada");
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
  mounted: function () {
    stationService
      .getMyStation(this.userId)
      .then((res) => {
        this.stations = res;
      })
      .catch((error) => {
        this.mensajeError = error;
        this.mostrarError = true;
      });
  },
};
</script>
