import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StationView from '../views/StationView.vue'
import MyStationsView from '../views/MyStationsView.vue'
import MyApplicationsView from '../views/MyApplicationsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
