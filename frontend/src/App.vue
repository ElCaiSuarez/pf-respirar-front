<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  setup() {
    
  },
  data() {
    return {

    }
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <RouterLink class="navbar-brand bg-light" to="/"><img src="../src/assets/RespirAR_Logo.jpeg"></RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
              <li class="nav-item"><RouterLink class="nav-link" to="/about">Sobre Nosotros</RouterLink></li>
              <li class="nav-item"><RouterLink class="nav-link" to="/station">Estaciones</RouterLink></li>
              <li class="nav-item"><RouterLink class="nav-link" to="/mystations">Mis Estaciones</RouterLink></li>
              <li class="nav-item"><RouterLink class="nav-link" to="/myapplications">Mis Solicitudes</RouterLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>

</style>
