
const routes = [
  {
    path: '/',
    component: () => import('src/pages/LoginPage.vue'),
  },

  {
    path: '/principal',
    name: 'principal',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // dashboard
      { path: '', icono: 'dashboard', label: 'Inicio', name: 'dashboard', component: () => import('src/modules/dashboard/DashBoard.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
