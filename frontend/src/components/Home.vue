<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
    <div>
        <h1></h1><br />
        <div class="card">
            <div class="card-header">
                Sprint 1
            </div>
            <div class="card-body">
                <h5 class="card-title">Ver Estaciones</h5>
                <p class="card-text">Visualizar las estaciones registradas</p>
                <a href="/station" class="btn btn-primary">Estaciones</a>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                Sprint 2
            </div>
            <div class="card-body">
                <h5 class="card-title">Crud Estaciones</h5>
                <p class="card-text">Registrar nuevas estaciones RespirAR (LoraWan y Wifi)</p>
                <a href="/mystations" class="btn btn-primary">Mis Estaciones</a>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                Sprint 3
            </div>
            <div class="card-body">
                <h5 class="card-title">Administrar Solicitudes </h5>
                <p class="card-text">Solicitar la registracion de nuevas Estaciones Externas</p>
                <a href="/" class="btn btn-secondary">ToDo</a>
            </div>
        </div>
    </div>
</template>