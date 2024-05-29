import { h } from 'vue'

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
      { path: '', icono: 'dashboard', label: 'Inicio', name: 'dashboard', component: () => import('src/modules/dashboard/DashBoard.vue') },
      { path: 'panelControl', icono: 'admin_panel_settings', label: 'Panel de control', name: 'panelControl', component: () => import('src/modules/control/PanelControlModule.vue') },
      {
        path: 'chevrolet',
        label: 'Gomsa Automotriz',
        name: 'chevrolet',
        children: [
          {
            path: 'administracion',
            label: 'Administración',
            name: 'administracionCH',
            children: [
              // { path: 'estadoResultados', icono: 'trending_up', label: 'Estado de Resultados', name: 'estadoResultadosCH', component: () => import('src/modules/chevrolet/administracion/EstadoResultadosModule.vue') },
              // { path: 'ventasProducto', icono: 'shopping_bag', label: 'Ventas de prodcuto', name: 'ventasProductoCH', component: () => import('src/modules/chevrolet/administracion/VentasProductosModule.vue') },
              // { path: 'comisiones', icono: 'payments', label: 'Comisiones', name: 'comisionesCH', component: () => import('src/modules/exactor/administracion/ComisionesModule.vue') },
              // { path: 'bdc', icono: 'work', label: 'BDC', name: 'bdcCH', component: () => import('src/modules/exactor/administracion/BDCModule.vue') },
              { path: 'tableroRitmo', icono: 'table_rows', label: 'Tablero de Ritmo', name: 'tableroRitmoEX', component: () => import('src/modules/exactor/servicio/TableroRitmoModule.vue') },
              { path: 'reporteDireccion', icono: 'work', label: 'Reporte Dirección', name: 'reporteDireccionEX', component: () => import('src/modules/exactor/rh/ReporteDireccionModule.vue') },
            ]
          },
          // {
          //   path: 'refacciones',
          //   label: 'Refacciones',
          //   name: 'refaccionesCH',
          //   children: [
          //     { path: 'csiRefacciones', icono: 'group', label: 'CSI Refacciones', name: 'csiRefaccionesCH', component: () => import('src/modules/chevrolet/refacciones/CSIRecfaccionesModule.vue') }
          //   ]
          // },
          // {
          //   path: 'servicio',
          //   label: 'Servicio',
          //   name: 'servicioCH',
          //   children: [
          //     { path: 'csiServicio', icono: 'group', label: 'CSI Servicio', name: 'csiServicioCH', component: () => import('src/modules/chevrolet/servicio/CSIServicioModule.vue') },
          //     { path: 'ordenesServicio', icono: 'receipt_long', label: 'Ordenes de Servicio', name: 'ordenesServicioCH', component: () => import('src/modules/chevrolet/servicio/OrdenesServicioModule.vue') },
          //   ]
          // },
          // {
          //   path: 'unidades',
          //   label: 'Unidades',
          //   name: 'unidadesCH',
          //   children: [
          //     { path: 'inventarioUnidades', icono: 'inventory', label: 'Inventario de Unidades', name: 'inventarioUnidadesCH', component: () => import('src/modules/chevrolet/unidades/InventarioUnidadesModule.vue') },
          //     { path: 'csiUnidaddes', icono: 'group', label: 'CSI Unidades', name: 'csiUnidaddesCH', component: () => import('src/modules/chevrolet/unidades/CSIUnidadesModule.vue') }
          //   ]
          // }
        ]
      },
      {
        path: 'exactor',
        label: 'Exactor',
        name: 'exactor',
        children: [
          // {
          //   path: 'administracion',
          //   label: 'Administración',
          //   name: 'administracionEX',
          //   children: [
          //     { path: 'comisiones', icono: 'payments', label: 'Comisiones', name: 'comisionesEX', component: () => import('src/modules/exactor/administracion/ComisionesModule.vue') },
          //     { path: 'bdc', icono: 'work', label: 'BDC', name: 'bdcEX', component: () => import('src/modules/exactor/administracion/BDCModule.vue') },
          //   ]
          // },
          {
            path: 'sistemas',
            label: 'Sistemas',
            name: 'sistemasEX',
            children: [
              { path: 'acceoUsuarios', icono: 'group', label: 'Acceso de usuarios', name: 'acceoUsuariosEX', component: () => import('src/modules/exactor/sistemas/AccesoUsuariosModule.vue') },
              { path: 'informeTickets', icono: 'receipt_long', label: 'Informe OsTicket', name: 'informeTicketsEX', component: () => import('src/modules/exactor/sistemas/InformeOsTicketModule.vue') },
              // { path: 'inventarioHosts', icono: 'inventory', label: 'Inventario Hosts', name: 'inventarioHostsEX', component: () => import('src/modules/exactor/sistemas/InventarioHostsModule.vue') },
              // { path: 'relojCheck', icono: 'schedule', label: 'Reloj Check', name: 'relojCheckEX', component: () => import('src/modules/exactor/sistemas/RelojCheckModule.vue') },
            ]
          },
          {
            path: 'mercadotecnia',
            label: 'Mercadotecnia',
            name: 'mercadotecniaEX',
            children: [
              { path: 'informeTickets', icono: 'receipt_long', label: 'Informe OsTicket MK', name: 'informeTicketsMKEX', component: () => import('src/modules/exactor/mercadotecnia/InformeOsTicketModule.vue') },
            ]
          },
          {
            path: 'rh',
            label: 'RH',
            name: 'rhEX',
            children: [
              // { path: 'informesRRHH', icono: 'description', label: 'Informes RRHH', name: 'informesRRHHEX', component: () => import('src/modules/exactor/rh/InformesRRHHModule.vue') },
              // { path: 'reporteDireccion', icono: 'work', label: 'Reporte Dirección Gruver', name: 'reporteDireccionEX', component: () => import('src/modules/exactor/rh/ReporteDireccionModule.vue') },
              // { path: 'retardos', icono: 'schedule', label: 'Retardos', name: 'retardosEX', component: () => import('src/modules/exactor/rh/RetardosModule.vue') },
              // { path: 'tablero5s', icono: 'emergency', label: 'Tablero 5s', name: 'tablero5sEX', component: () => import('src/modules/exactor/rh/Tablero5sModule.vue') },
              { path: 'tableroRRHH', icono: 'table_rows', label: 'Tablero RRHH', name: 'tableroRRHHEX', component: () => import('src/modules/exactor/rh/TableroRRHHModule.vue') },
            ]
          },
          // {
          //   path: 'servicio',
          //   label: 'Servicio',
          //   name: 'servicioEX',
          //   children: [
          //     { path: 'tableroRitmo', icono: 'table_rows', label: 'Tablero de Ritmo', name: 'tableroRitmoEX', component: () => import('src/modules/exactor/servicio/TableroRitmoModule.vue') },
          //   ]
          // }
        ]
      },
      // {
      //   path: 'isuzu',
      //   label: 'Gomsa Diesel',
      //   name: 'isuzu',
      //   children: [
      //     {
      //       path: 'adminsitracion',
      //       label: 'Administración',
      //       name: 'administracionIS',
      //       children: [
      //         { path: 'estadoResultados', icono: 'trending_up', label: 'Estado de Resultados Diesel', name: 'estadoResultadosIS', component: () => import('src/modules/isuzu/administracion/EstadoResultadosModule.vue') },
      //         { path: 'ventasProducto', icono: 'shopping_bag', label: 'Ventas de prodcuto', name: 'ventasProductoIS', component: () => import('src/modules/isuzu/administracion/VentasProdcutoModule.vue') }
      //       ]
      //     },
      //     {
      //       path: 'refacciones',
      //       label: 'Refacciones',
      //       name: 'refaccionesIS',
      //       children: [
      //         { path: 'csiRefacciones', icono: 'group', label: 'CSI Refacciones', name: 'csiRefaccionesIS', component: () => import('src/modules/isuzu/refacciones/CSIRefaccionesModule.vue') }
      //       ]
      //     },
      //     {
      //       path: 'servicio',
      //       label: 'Servicio',
      //       name: 'servicioIS',
      //       children: [
      //         { path: 'csiServicio', icono: 'group', label: 'CSI Servicio', name: 'csiServicioIS', component: () => import('src/modules/isuzu/servicio/CSIServicioModule.vue') },
      //         { path: 'ordenesServicio', icono: 'receipt_long', label: 'Ordenes de Servicio', name: 'ordenesServicioIS', component: () => import('src/modules/isuzu/servicio/OrdenesServicioModule.vue') },
      //         { path: 'productividadServicio', icono: 'work', label: 'Productividad de Servicio', name: 'productividadServicioIS', component: () => import('src/modules/isuzu/servicio/ProductividadServicioModule.vue') }
      //       ]
      //     },
      //     {
      //       path: 'unidades',
      //       label: 'Unidades',
      //       name: 'unidadesIS',
      //       children: [
      //         { path: 'inventarioUnidades', icono: 'inventory', label: 'Inventario de Unidades', name: 'inventarioUnidadesIS', idMetrica: 31, component: () => import('src/modules/isuzu/unidades/InventarioUnidadesModule.vue') },
      //         { path: 'csiUnidades', icono: 'group', label: 'CSI Unidades', name: 'csiUnidadesIS', idMetrica: 37, component: () => import('src/modules/isuzu/unidades/CSIUnidadesModule.vue') }
      //       ]
      //     }
      //   ]
      // },
      {
        path: 'mercedes',
        label: 'Gomsa Camiones',
        name: 'mercedes',
        children: [
          {
            path: 'compras',
            label: 'Compras',
            name: 'comprasMB',
            children: [
              // { path: 'estadoResultados', icono: 'trending_up', label: 'Estado de Resultados Camiones', name: 'estadoResultadosMB', component: () => import('src/modules/mercedes/administracion/EstadoResultadosModule.vue') },
              { path: 'movimientoInventario', icono: 'inventory', label: 'Movimiento de Inventario', name: 'movimientoInventarioMB', component: () => import('src/modules/mercedes/administracion/MovimientoInventarioModule.vue') },
              // { path: 'ventaProducto', icono: 'shopping_bag', label: 'Venta de Producto', name: 'ventaProductoMB', component: () => import('src/modules/mercedes/administracion/VentaProductosModule.vue') },
              // { path: 'analiticaGastos', icono: 'payments', label: 'Analítica de Gastos', name: 'analiticaGastosMB', component: () => import('src/modules/mercedes/administracion/AnaliticaGastosModule.vue') },
              // { path: 'CRM', icono: 'work', label: 'CRM', name: 'crm', component: () => import('src/modules/mercedes/administracion/CRMModule.vue') },
              // { path: 'ventasCruzadas', icono: 'shopping_bag', label: 'Ventas Cruzadas', name: 'ventasCruzadasMB', component: () => import('src/modules/mercedes/administracion/VentasCruzadasModule.vue') }
            ]
          },
          {
            path: 'refacciones',
            label: 'Refacciones',
            name: 'refaccionesMB',
            children: [
              // { path: 'csiRefacciones', icono: 'group', label: 'CSI Refacciones', name: 'csiRefaccionesMB', component: () => import('src/modules/mercedes/refacciones/CSIRefaccionesModule.vue') }
              { path: 'ventaProducto', icono: 'shopping_bag', label: 'Venta de Producto', name: 'ventaProductoMB', component: () => import('src/modules/mercedes/administracion/VentaProductosModule.vue') },
            ]
          },
          {
            path: 'servicio',
            label: 'Servicio',
            name: 'servicioMB',
            children: [
              // { path: 'productividadServicio', icono: 'work', label: 'Productividad de Servicio', name: 'productividadServicioMB', component: () => import('src/modules/mercedes/servicio/ProductividadServicioModule.vue') },
              { path: 'tableroServicio', icono: 'table_rows', label: 'Tablero de Servicio', name: 'tableroServicioMB', component: () => import('src/modules/mercedes/servicio/TableroServicioModule.vue') },
              // { path: 'ordenesServicio', icono: 'receipt_long', label: 'Ordenes de Servicio', name: 'ordenesServicioMB', component: () => import('src/modules/mercedes/servicio/OrdenesServicioModule.vue') },
              // { path: 'csiServicio', icono: 'group', label: 'CSI Servicio', name: 'csiServicioMB', component: () => import('src/modules/mercedes/servicio/CSIServicioModule.vue') }
            ]
          },
          {
            path: 'unidades',
            label: 'Unidades',
            name: 'unidadesMB',
            children: [
              { path: 'inventarioUnidades', icono: 'inventory', label: 'Inventario de Unidades', name: 'inventarioUnidadesMB', component: () => import('src/modules/mercedes/unidades/InventarioUnidadesModule.vue') },
              // { path: 'csiUnidades', icono: 'group', label: 'CSI Unidades', name: 'csiUnidadesMB', component: () => import('src/modules/mercedes/unidades/CSIUnidadesModule.vue') }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
