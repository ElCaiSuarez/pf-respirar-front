<script setup>
import Myapplications from "./MyApplications.vue";
import stationService from "../services/stationService";
</script>

<template>
  <div class="main-div">
    <!-- solo ADMIN -->
    <div class="only-admin" v-if="isAdmin">
      <h5 style="margin: 20px">Crear estacion RespirAR</h5>
      <a href="/createStationAdmin" class="btn btn-primary" style="margin: 10px"
        >Crear</a
      >
      <a href="/mystations" class="btn btn-primary" style="margin: 10px"
        >Mis estaciones</a
      >
      <h5 style="margin: 20px">Lista de todas las estaciones</h5>
      <div class="todas-estaciones">
        <div class="container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
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
        <div v-show="mostrarError">
          <label class="alert alert-danger">{{ mensajeError }}</label>
        </div>
      </div>
      <h5 style="margin: 20px">Lista de solicitudes</h5>
      <Myapplications />
      <div class="card">
        <div class="card-header">Sprint 3</div>
        <div class="card-body">
          <h5 class="card-title">Administrar Solicitudes</h5>
          <p class="card-text">
            Solicitar la registracion de nuevas Estaciones Externas
          </p>
          <a href="/myapplications" class="btn btn-primary">Mis Solicitudes</a>
        </div>
      </div>
    </div>

    <!-- solo USER -->
    <div class="only-user" v-if="!isAdmin">
      <h5>Crear estacion Externa</h5>
      <a href="/createStationUser" class="btn btn-primary">Crear</a>

      <!-- Lista las estaciones secundarias en stand by para confirmar solicitud, esto es visible SOLO para ADMIN-->
      <h5 style="margin: 20px">Mis estaciones</h5>
      <MyStations />
    </div>
  </div>
</template>

<script>
import { useStore } from "./store";

export default {
  name: "Home",
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
    isAdmin() {
      const store = useStore();
      console.log("entro a isAdmin");
      return store.userRole === "admin";
    },
    async mostrarAlerta() {
      alert("Mostrar Estacion en Mapa (Geo Team)");
    },
  },
};
</script>
