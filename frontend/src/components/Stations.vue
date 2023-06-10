<template>
  <div>
    <div>
      <h1 style="margin-top: 10px">Estaciones</h1>
      <div class="container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="station in stations"
              :key="station.id"
              v-on:click="mostrarAlerta"
            >
              <div class="card" style="margin-bottom: 20px">
                <div class="card-header">
                  {{ station.id }} | {{ station.name }}
                </div>
                <div class="card-body">
                  <p class="card-title">Tipo: {{ station.type }}</p>
                  <p class="card-text">
                    Descripcion: {{ station.description }}
                  </p>
                  <p class="card-text">Usuario: {{ station.userId }}</p>
                </div>
              </div>
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
