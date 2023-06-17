<template>
  <div>
    <div>
      <!-- <h2 class="margin-top-20">Lista de Estaciones</h2> -->
      <div class="container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="station in stations" :key="station.id" v-on:click="stationId = station.id; isShow = !isShow">
              <div class="card">
                <div class="card-header" style="background-color: #30aa008c">
                  <div>
                    {{ station.id }} | <b>{{ station.name }}</b>
                  </div>
                </div>
                <div class="card-body">
                  <div class="card-title"><b>Tipo: </b>{{ station.type }}</div>
                  <div class="card-title">
                    <b>Descripcion: </b>{{ station.description }} |
                    <b>Numero de Serie: </b>{{ station.serial }} |
                    <b>Usuario: </b>{{ station.userId }}
                  </div>
                  <div class="card-title">
                    <b>Geolocacion: </b> X | Y <a href="#" class="card-link">Mostrar Estacion en el Mapa</a>
                  </div>
                </div>
                <div v-show="isShow && stationId == station.id">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Sensor de temperatura y humedad: </b> Ultimo Dato</li>
                    <li class="list-group-item"><b>Sensor de partículas:</b> Ultimo Dato</li>
                    <li class="list-group-item"><b>Sensor de NO2:</b> Ultimo Dato</li>
                  </ul>
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
      stationId: null,
      isShow: false,
      mostrarMediciones: false,
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
            alert("Mostrar Estacion en Mapa (Geo ToDo)")
        }
  },
};
</script>
