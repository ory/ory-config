import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/hydra',
  },
  {
    name: 'hydra',
    path: '/hydra',
    component: () => import('../views/Hydra.vue'),
  },
  {
    name: 'kratos',
    path: '/kratos',
    component: () => import('../views/Kratos.vue'),
  },
  {
    name: 'keto',
    path: '/keto',
    component: () => import('../views/Keto.vue'),
  },
  {
    name: 'oathkeeper',
    path: '/oathkeeper',
    component: () => import('../views/Oathkeeper.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
