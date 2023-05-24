<template>
    <div>
        <div>
            <h1>Estaciones: </h1><br />
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="station in stations" :key="station.id" v-on:click="">
                            <th scope="row">{{station.id}}</th>
                            <td>{{station.name}}</td>
                            <td>{{station.description}}</td>
                            <td>{{station.userId}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
<!--             <h2>Estaciones:</h2><br />
            <h3>(Modulo Visualizacion y Mapas)</h3>
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="parking in parkings" :key="parking.id">
                            <th scope="row">{{parking.id}}</th>
                            <td>{{parking.name}}</td>
                            <td>{{parking.locationId}}</td>
                            <td>{{parking.userId}}</td>
                        </tr>
                    </tbody>
                </table>
            </div> -->
            <div class="alert alert-danger" v-show="mostrar">
                {{ mensajeError }}
            </div>
        </div>
    </div>
</template>

<script>
// import locationService from '../services/locationService';
//import parkingService from '../services/parkingService';
import stationService from '../services/stationService';

export default {
    data() {
        return {
            //locations: [],
            //parkings: [],
            stations: [],
            //locationId: 1,
            mensajeError: "",
            mostrar: false
        }
    },
    mounted:function(){
        console.log("Busqueda de Stations");
        stationService.getStation().then(res => {
            this.stations = res
            console.log(this.stations);
        });
    }/* ,
    methods: {
        async getPakgings(locationId) {
            try {
                console.log("Estacionamientos del Barrio: " + locationId);
                this.parkings = await parkingService.getParkings(locationId)
                console.log(this.parkings);
            } catch (e) {
                this.mensajeError = e;
            }

        }
    } */
}
</script>