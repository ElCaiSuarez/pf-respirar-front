<template>
    <div>
        <div>
            <h1>Estaciones: </h1><br />
            <div class="container">

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="station in stations" :key="station.id" v-on:click="mostrarAlerta">
                            <div class="card">
                                <div class="card-header">
                                    {{ station.id }}  | Tipo: {{ station.type }}
                                </div>
                                <div class="card-body">
                                    <h6 class="card-title">{{ station.name }}</h6>
                                    <p class="card-text">{{ station.description }} | Usuario: {{ station.userId }}</p>
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
    </div>
</template>

<script>
import stationService from '../services/stationService';

export default {
    data() {
        return {
            stations: [],
            mostrarError: false,
            mensajeError: ""

        }
    },
    mounted: function () {
        stationService.getStation().then(res => {
            this.stations = res
        })
        .catch(error => {
                this.mensajeError = error;
                this.mostrarError = true
            })
    },
    methods: {
        async mostrarAlerta() {
            alert("Mostrar Estacion en Mapa (Geo ToDo)")
        }
    }
}
</script>