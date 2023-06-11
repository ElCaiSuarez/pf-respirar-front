<template>
  <div>
    <div>
      <div class="container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="station in stations"
              :key="station.id"
              v-on:click="mostrarAlerta"
            >
              <td>{{ station.id }}</td>
              <td>{{ station.name }}</td>
              <td>{{ station.type }}</td>
              <td>{{ station.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="mostrarError">
      <label class="alert alert-danger">{{ mensajeError }}</label>
    </div>
  </div>
</template>

<script>
import stationService from "../services/stationService";

export default {
  data() {
    return {
      stations: [],
      mostrarError: false,
      mensajeError: "",
    };
  },
  mounted: function () {
    stationService
      .getStation()
      .then((res) => {
        this.stations = res;
      })
      .catch((error) => {
        this.mensajeError = error;
        this.mostrarError = true;
      });
  },
  methods: {
    async mostrarAlerta() {
      alert("Mostrar Estacion en Mapa (Geo Team)");
    },
  },
};
</script>
