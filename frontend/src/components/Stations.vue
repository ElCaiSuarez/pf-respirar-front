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
        </div>
    </div>
</template>

<script>
import stationService from '../services/stationService';

export default {
    data() {
        return {
            stations: [],
        }
    },
    mounted:function(){
        console.log("Busqueda de Stations");
        stationService.getStation().then(res => {
            this.stations = res
            console.log(this.stations);
        });
    }
}
</script>