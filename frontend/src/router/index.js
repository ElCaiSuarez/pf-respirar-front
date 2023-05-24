import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StationView from '../views/StationView.vue'
//import UserView from '../views/UserView.vue'
import NotFoundView from '../views/NotFoundView.vue'
//import LoginView from '../views/LoginView.vue'
//import RegisterView from '../views/RegisterView.vue'
//import MyRequestsView from '../views/MyRequestsView.vue'
//import MyStationsView from '../views/MyStationsView.vue'
//import StationsView from '../views/StationsView.vue'

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
    /* {
      path: '/myrequests',
      name: 'myrequests',
      component: MyRequestsView,
      meta: { RequireAuth: true}
    },
    {
      path: '/mystations',
      name: 'mystations',
      component: MyStationsView,
      meta: { RequireAuth: true}
    },
    {
      path: '/users',
      name: 'users',
      component: UserView,
      meta: { RequireAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }, */
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView
    }/*,
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    } ,
    {
      path: '/stations',
      name: 'stations',
      component: StationsView,
      meta: { RequireAuth: true}
    } */,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

/* router.beforeEach((to,from,next) => {
  const usuarioLogin = localStorage.getItem('usuario');
  if( to.matched.some ( r => r.meta.RequireAuth) && !usuarioLogin) {
    next('/')
  }
  next()
}) */

export default router
