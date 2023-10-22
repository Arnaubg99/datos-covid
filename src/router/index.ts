import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Home.vue')
    },

    {
      path: '/datos/fecha/:id',
      name: 'datos-por-fecha',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DatosPorFecha.vue')
    },

    {
      path: '/datos/estado/:id',
      name: 'datos-por-estado',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DatosPorEstado.vue')
    },

    {
      path: '/datos/fecha/:fechaId/estado/:estadoId',
      name: 'datos-por-fecha-estado',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DatosPorFechaYEstado.vue')
    },

    {
      path: '/404',
      name: 'sin-datos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/noHayDatos.vue')
    },

    {
      path: "/:catchAll(.*)",  
      redirect: '/'
    },
  ]
})

export default router
