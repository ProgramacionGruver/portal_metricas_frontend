const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('src/pages/LoginPage.vue'),
  },
  {
    path: '/principal',
    name: 'principal',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', icono: 'dashboard', label: 'Inicio', name: 'dashboard', component: () => import('src/modules/dashboard/DashBoard.vue') },
      { path: 'panelControl', icono: 'admin_panel_settings', label: 'Panel de control', name: 'panelControl', component: () => import('src/modules/control/PanelControlModule.vue') },
      { path: 'logAccesos', icono: 'history', label: 'Log de accesos', name: 'logAccesos', component: () => import('src/modules/logs/LogsAccesos.vue') },
      { path: 'logMetricas', icono: 'analytics', label: 'Log de acceso a métricas', name: 'logMetricas', component: () => import('src/modules/logs/LogAccesosMetricas.vue') },
    ]
  },
  {
    path: '/metrica/:claveEmpresa/:idGrupo/:idMetrica',
    name: 'vistaMetrica',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', icono: 'analytics', label: 'Métrica', name: 'vistaMetrica', component: () => import('src/modules/metricas/VistaMetrica.vue') },
    ]
  },
  {
    path: '/registrarse',
    name: 'registrarse',
    component: () => import('src/modules/registrarse/RegistarseUsuario.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
