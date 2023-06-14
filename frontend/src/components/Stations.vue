<template>
  <div>
    <div>
      <h2 class="margin-top-20">Lista de Estaciones</h2>
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
              <div class="card">
                <div class="card-header" style="background-color: #30aa008c">
                  <div>
                    {{ station.id }} | <b>{{ station.name }}</b>
                  </div>
                </div>
                <div class="card-body">
                  <div class="card-title">Tipo: {{ station.type }}</div>
                  <p class="card-text">
                    <b>Descripcion: </b>{{ station.description }} |
                    <b>Numero de Serie: </b>{{ station.serial }} |
                    <b>Usuario: </b>{{ station.userId }}
                  </p>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </div>
    <div v-show="mostrarError">
      <label class="alert alert-danger">{{ mensajeError }}</label>
    </div>
    <button onclick="window.location.href ='/'" class="btn btn-secondary mb-3">
      Volver
    </button>
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
      alert("Mostrar Estacion en Mapa (Geo ToDo)");
    },
  },
};
</script>
