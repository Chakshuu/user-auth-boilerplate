import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/homeView.vue';
import Login from '../views/auth/loginView.vue';
import Register from '../views/auth/registerView.vue';
import User from '../views/auth/userView.vue';
import store from '../stores';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresGuest: true}
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresGuest: true}
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: { requiresAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {

  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    return({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresGuest && store.getters.isAuthenticated) {
    return next({ name: 'home' });
  }

  return next();
});

export default router
