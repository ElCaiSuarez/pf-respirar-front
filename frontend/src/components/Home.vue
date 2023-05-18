<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
    <div>
        <h1></h1><br />
        <div class="card">
            <div class="card-header">
                Ver Estaciones
            </div>
            <div class="card-body">
                <h5 class="card-title">Ver Estaciones Geo-Localizadas</h5>
                <p class="card-text">para visualizar las estaciones en un mapa (Modulo Visualizacion y Mapas)</p>
                <a href="/register" class="btn btn-secondary">Registrate</a>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                Administra tus Estaciones
            </div>
            <div class="card-body">
                <h5 class="card-title">Registra tus Estaciones RespirAR</h5>
                <p class="card-text">para empezar a registrar las mediciones medioambientales, obtenidas de tus dispositivos RespirAR (LoraWan y Wifi)</p>
                <a href="/login" class="btn btn-primary">Ingresa</a>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                Administra tus Solicitudes
            </div>
            <div class="card-body">
                <h5 class="card-title">Solicita la registracion de tus Estaciones Externas</h5>
                <p class="card-text">para empezar a registrar las mediciones medioambientales, obtenidas de tus dispositivos externos</p>
                <a href="/login" class="btn btn-primary">Ingresa</a>
            </div>
        </div>
    </div>
</template>