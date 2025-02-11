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
      {
        path: 'chevrolet',
        label: 'Gomsa Automotriz',
        name: 'CH',
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
              { path: 'tableroRitmo', icono: 'table_rows', label: 'Tablero de Ritmo', name: 'tableroRitmoCH', component: () => import('src/modules/exactor/servicio/TableroRitmoModule.vue') },
              // { path: 'reporteDireccion', ono: 'work', label: 'Reporte de Dirección', name: 'reporteDireccionCH', component: () => import('src/modules/exactor/rh/ReporteDireccionModule.vue') },
            ]
          },
          {
            path: 'refacciones',
            label: 'Refacciones',
            name: 'refaccionesCH',
            children: [
              { path: 'csiRefaccionesCH', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiRefaccionesCH', component: () => import('src/modules/chevrolet/refacciones/CSIRecfaccionesModule.vue') },
              { path: 'ventasProductoCH', icono: 'shopping_bag', label: 'Ventas de producto', name: 'ventasProductoCH', component: () => import('src/modules/chevrolet/refacciones/VentasProductosModule.vue') },
            ]
          },
          {
            path: 'servicio',
            label: 'Servicio',
            name: 'servicioCH',
            children: [
              { path: 'csiServicioCH', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiServicioCH', component: () => import('src/modules/chevrolet/servicio/CSIServicioModule.vue') },
              { path: 'ordenesServicio', icono: 'receipt_long', label: 'Ordenes de Servicio', name: 'ordenesServicioCH', component: () => import('src/modules/chevrolet/servicio/OrdenesServicioModule.vue') },
            ]
          },
          {
            path: 'unidades',
            label: 'Unidades',
            name: 'unidadesCH',
            children: [
              { path: 'csiUnidaddes', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiUnidadesCH', component: () => import('src/modules/chevrolet/unidades/CSIUnidadesModule.vue') },
              { path: 'inventarioUnidades', icono: 'inventory', label: 'Inventario de unidades y ventas', name: 'inventarioUnidadesCH', component: () => import('src/modules/chevrolet/unidades/InventarioUnidadesModule.vue') },
            ]
          }
        ]
      },
      {
        path: 'exactor',
        label: 'Exactor',
        name: 'EX',
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
              // { path: 'acceoUsuarios', icono: 'group', label: 'Acceso de usuarios', name: 'acceoUsuariosEX', component: () => import('src/modules/exactor/sistemas/AccesoUsuariosModule.vue') },
              { path: 'informeTickets', icono: 'receipt_long', label: 'Informe Tickets', name: 'informeTicketsEX', component: () => import('src/modules/exactor/sistemas/InformeOsTicketModule.vue') },
              // { path: 'inventarioHosts', icono: 'inventory', label: 'Inventario Hosts', name: 'inventarioHostsEX', component: () => import('src/modules/exactor/sistemas/InventarioHostsModule.vue') },
              // { path: 'relojCheck', icono: 'schedule', label: 'Reloj Check', name: 'relojCheckEX', component: () => import('src/modules/exactor/sistemas/RelojCheckModule.vue') },
            ]
          },
          {
            path: 'mercadotecnia',
            label: 'Mercadotecnia',
            name: 'mercadotecniaEX',
            children: [
              { path: 'informeTickets', icono: 'receipt_long', label: 'Informe Tickets', name: 'informeTicketsMKEX', component: () => import('src/modules/exactor/mercadotecnia/InformeOsTicketModule.vue') },
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
          {
            path: 'contabilidad',
            label: 'Contabilidad',
            name: 'contabilidadEX',
            children: [
              { path: 'informeTickets', icono: 'receipt_long', label: 'Informe Tickets', name: 'informeTicketsCECO', component: () => import('src/modules/exactor/contabilidad/InformeTickets.vue') },
            ]
          }
        ]
      },
      {
        path: 'mercedes',
        label: 'Gomsa Camiones',
        name: 'MB',
        children: [
          {
            path: 'indicadoresObjetivos',
            label: 'Indicadores de objetivos',
            name: 'indicadoresObjetivosMB',
            children: [
              { path: "objetivosOperativos", icono: 'trending_up', label: 'Objetivos Operativos', name: 'objetivosOperativosMB', component: () => import('src/modules/mercedes/ObjetivosOperativos.vue') },
            ]
          },
          {
            path: 'compras',
            label: 'Compras',
            name: 'comprasMB',
            children: [
              // { path: 'estadoResultados', icono: 'trending_up', label: 'Estado de Resultados Camiones', name: 'estadoResultadosMB', component: () => import('src/modules/mercedes/administracion/EstadoResultadosModule.vue') },
              { path: 'movimientoInventario', icono: 'inventory', label: 'Movimiento de Inventario', name: 'movimientoInventarioMB', component: () => import('src/modules/mercedes/administracion/MovimientoInventarioModule.vue') },
              { path: 'proveedores', icono: 'local_shipping', label: 'Proveedores', name: 'proveedoresMB', component: () => import('src/modules/mercedes/compras/ProveedoresModule.vue') },
              { path: 'analisisCompras', icono: 'local_shipping', label: 'Análisis de compras', name: 'analisisComprasMB', component: () => import('src/modules/mercedes/compras/AnalisisCompras.vue') },
              { path: 'informeTickets', icono: 'receipt_long', label: 'Informe Tickets', name: 'informeTicketsMB', component: () => import('src/modules/exactor/compras/InformeOsTicketModule.vue') },
              // { path: 'ventaProducto', icono: 'shopping_bag', label: 'Venta de Producto', name: 'ventaProductoMB', component: () => import('src/modules/mercedes/administracion/VentaProductosModule.vue') },
              // { path: 'analiticaGastos', icono: 'payments', label: 'Analítica de Gastos', name: 'analiticaGastosMB', component: () => import('src/modules/mercedes/administracion/AnaliticaGastosModule.vue') },
              // { path: 'CRM', icono: 'work', label: 'CRM', name: 'crm', component: () => import('src/modules/mercedes/administracion/CRMModule.vue') },
              // { path: 'ventasCruzadas', icono: 'shopping_bag', label: 'Ventas Cruzadas', name: 'ventasCruzadasMB', component: () => import('src/modules/mercedes/administracion/VentasCruzadasModule.vue') }
              { path: 'informeRequisicionesCompra', icono: 'inventory', label: 'Informe Requisiciones de compra', name: 'informeRequisicionesCompraMB', component: () => import('src/modules/mercedes/compras/RequisicionesCompra.vue') },
            ]
          },
          {
            path: 'refacciones',
            label: 'Refacciones',
            name: 'refaccionesMB',
            children: [
              { path: 'csiRefacciones', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiRefaccionesMB', component: () => import('src/modules/mercedes/refacciones/CSIRefaccionesModule.vue') },
              { path: 'ventaProducto', icono: 'shopping_bag', label: 'Ventas de producto', name: 'ventasProductoMB', component: () => import('src/modules/mercedes/administracion/VentaProductosModule.vue') },
              { path: 'analisisPedidos', icono: 'local_shipping', label: 'Análisis de pedidos', name: 'analisisPedidosMB', component: () => import('src/modules/mercedes/refacciones/AnalisisPedido.vue') },
            ]
          },
          {
            path: 'servicio',
            label: 'Servicio',
            name: 'servicioMB',
            children: [
              { path: 'csiServicio', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiServicioMB', component: () => import('src/modules/mercedes/servicio/CSIServicioModule.vue') },
              // { path: 'productividadServicio', icono: 'work', label: 'Productividad de Servicio', name: 'productividadServicioMB', component: () => import('src/modules/mercedes/servicio/ProductividadServicioModule.vue') },
              { path: 'tableroServicio', icono: 'table_rows', label: 'Tablero de Servicio', name: 'tableroServicioMB', component: () => import('src/modules/mercedes/servicio/TableroServicioModule.vue') },
              { path: 'ordenesServicio', icono: 'receipt_long', label: 'Ordenes de Servicio', name: 'ordenesServicioMB', component: () => import('src/modules/mercedes/servicio/OrdenesServicioModule.vue') },
            ]
          },
          {
            path: 'unidades',
            label: 'Unidades',
            name: 'unidadesMB',
            children: [
              { path: 'csiUnidades', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiUnidadesMB', component: () => import('src/modules/mercedes/unidades/CSIUnidadesModule.vue') },
              { path: 'inventarioUnidades', icono: 'inventory', label: 'Inventario de unidades y ventas', name: 'inventarioUnidadesMB', component: () => import('src/modules/mercedes/unidades/InventarioUnidadesModule.vue') },
            ]
          },
        ]
      },
      {
        path: 'racingTrading',
        label: 'Racing',
        name: 'RT',
        children: [
          {
            path: 'compras',
            label: 'Compras',
            name: 'comprasRT',
            children: [
              { path: 'movimientoInventario', icono: 'inventory', label: 'Movimiento de Inventario', name: 'movimientoInventarioRT', component: () => import('src/modules/racingTrading/compras/MovimientoInventario.vue') },
            ]
          },
          {
            path: 'refacciones',
            label: 'Refacciones',
            name: 'refaccionesRT',
            children: [
              { path: 'csiRefacciones', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiRefaccionesRT', component: () => import('src/modules/racingTrading/refacciones/CSIRefacciones.vue') },
              { path: 'ventasProducto', icono: 'shopping_bag', label: 'Ventas de producto', name: 'ventasProductoRT', component: () => import('src/modules/racingTrading/refacciones/VentasProducto.vue') },
            ]
          }
        ]
      },
      {
        path: 'isuzu',
        label: 'Gomsa Diesel',
        name: 'IS',
        children: [
          {
            path: 'refacciones',
            label: 'Refacciones',
            name: 'refaccionesIS',
            children: [
              { path: 'csiRefacciones', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiRefaccionesIS', component: () => import('src/modules/isuzu/refacciones/CSIRefaccionesModule.vue') },
              { path: 'ventasProducto', icono: 'shopping_bag', label: 'Ventas de producto', name: 'ventasProductoIS', component: () => import('src/modules/isuzu/refacciones/VentasProducto.vue') },
            ]
          },
          {
            path: 'servicio',
            label: 'Servicio',
            name: 'servicioIS',
            children: [
              { path: 'csiServicio', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiServicioIS', component: () => import('src/modules/isuzu/servicio/CSIServicioModule.vue') },
              { path: 'tableroServicio', icono: 'table_rows', label: 'Tablero de Servicio', name: 'tableroServicioIS', component: () => import('src/modules/isuzu/servicio/TableroServicioModule.vue') },
              { path: 'ordenesServicio', icono: 'receipt_long', label: 'Ordenes de Servicio', name: 'ordenesServicioIS', component: () => import('src/modules/isuzu/servicio/OrdenesServicioModule.vue') },
            ]
          },
          {
            path: 'unidades',
            label: 'Unidades',
            name: 'unidadesIS',
            children: [
              { path: 'csiUnidades', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiUnidadesIS', component: () => import('src/modules/isuzu/unidades/CSIUnidadesModule.vue') },
              { path: 'inventarioUnidades', icono: 'inventory', label: 'Inventario de unidades y ventas', name: 'inventarioUnidadesIS', component: () => import('src/modules/isuzu/unidades/InventarioUnidadesModule.vue') },
            ]
          }
        ]
      },
      {
        path: 'autoEpica',
        label: 'Auto Épica',
        name: 'FO',
        children: [
          {
            path: 'refacciones',
            label: 'Refacciones',
            name: 'refaccionesFO',
            children: [
              { path: 'csiRefacciones', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiRefaccionesFO', component: () => import('src/modules/gac/refacciones/CSIRefaccionesModule.vue') },
              {  path: 'ventasProducto', icono: 'shopping_bag', label: 'Ventas de producto', name: 'ventasProductoFO', component: () => import('src/modules/gac/refacciones/VentasProductoModule.vue') },
            ]
          },
          {
            path: 'servicio',
            label: 'Servicio',
            name: 'servicioFO',
            children: [
              { path: 'csiServicio', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiServicioFO', component: () => import('src/modules/gac/servicio/CSIServicioModule.vue') },
              { path: 'ordenesServicio', icono: 'receipt_long', label: 'Ordenes de Servicio', name: 'ordenesServicioFO', component: () => import('src/modules/gac/servicio/OrdenesServicioModule.vue') },
            ]
          },
          {
            path: 'unidades',
            label: 'Unidades',
            name: 'unidadesFO',
            children: [
              { path: 'csiUnidades', icono: 'group', label: 'CSI y Clientes perdidos', name: 'csiUnidadesFO', component: () => import('src/modules/gac/unidades/CSIUnidadesModule.vue') },
              { path: 'inventarioUnidades', icono: 'inventory', label: 'Inventario de unidades y ventas', name: 'inventarioUnidadesFO', component: () => import('src/modules/gac/unidades/InventarioUnidadesModule.vue') },
            ]
          },
        ]
      }
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
