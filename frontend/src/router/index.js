import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StationView from '../views/StationView.vue'
import MyStationsView from '../views/MyStationsView.vue'
import MyApplicationsView from '../views/MyApplicationsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import CreateStationAdminView from '../views/CreateStationAdminView.vue'
import CreateStationUserView from '../views/CreateStationUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/station',
      name: 'station',
      component: StationView
    },
    {
      path: '/mystations',
      name: 'mystations',
      component: MyStationsView
    },
    {
      path: '/myapplications',
      name: 'myapplications',
      component: MyApplicationsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/',
      redirect: {
          name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/createStationAdmin",
      name: "createStationAdmin",
      component: CreateStationAdminView
    },
    {
      path: "/createStationUser",
      name: "createStationUser",
      component: CreateStationUserView
    }
  ]
})

export default router
