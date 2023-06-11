<script setup>
import Myapplications from "./MyApplications.vue";
import stationService from "../services/stationService";
</script>

<template>
  <div class="main-div">
    <!-- solo USER -->
    <div class="only-user">
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
      .getMyStation(this.userId)
      .then((res) => {
        this.stations = res;
      })
      .catch((error) => {
        this.mensajeError = error;
        this.mostrarError = true;
      });
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
    async mostrarAlerta() {
      alert("Mostrar Estacion en Mapa (Geo Team)");
    },
  },
};
</script>
