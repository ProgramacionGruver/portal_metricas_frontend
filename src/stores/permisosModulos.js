import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { notificacion } from 'src/helpers/mensajes'

export const useModulosStore = defineStore('modulos', () => {
  const listaModulos = ref([])
  const usuariosModulos = ref([])
  const usuariosAcceso = ref([])
  const filtroUsuariosAcceso = ref([])

  const tickedSeleccionados = ref([])
  const permisoPanelControl = ref(false)

  const permisosSucursales = ref([])
  const clavesPermisosSucursales = ref([])

  const accesos = ref([])
  const accesosFiltrados = ref([])

  const paginacionAccesos = ref({
    page: 1,
    rowsPerPage: 11,
    rowsNumber: 0,
    pagesNumber: 0
  })

  const cargandoAccesos = ref(false)

  const obtenerUsuariosModulo = async () => {
    try {
      const { data } = await apiUsuarios.get('/metrica/permiso')
      usuariosModulos.value = data.usuariosModulos
      usuariosAcceso.value = data.usuariosPortal
      filtroUsuariosAcceso.value = data.usuariosPortal.map(usuario => {
        return {
          label: usuario.nombre,
          value: usuario
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerPermisosByUsuario = async (usuario) => {
    try {
      const { data } = await apiUsuarios.get(`/metricas/permisos/usuario/${usuario.idUsuario}`)

      tickedSeleccionados.value = data.tickedArbol
      permisoPanelControl.value = data.permisoPanelControl
    } catch (error) {
      console.log(error)
    }
  }

  const actualizarPermisos = async (permisos) => {
    try {
      await apiUsuarios.put(`/metricas/permisos/usuario/${permisos.usuario.idUsuario}`, permisos)
      notificacion('positive', 'Permisos actualizados correctamente')
    } catch (error) {
      if (error.response.status === 400) {
        notificacion('warning', error.response.data.message)
      } else {
        notificacion('negative', 'Error al actualizar los permisos')
      }
    }
  }

  const solicitarAcceso = async (solicitud) => {
    try {
      await apiUsuarios.post('/metricas/solicitar', solicitud)
      notificacion('positive', 'Solicitud enviada correctamente. Sistemas se encarga de revisarla y dar respuesta.')
    } catch (error) {
      if (error.response.status === 400) {
        notificacion('warning', error.response.data.message)
      } else {
        notificacion('negative', 'Error al actualizar los permisos')
      }
    }
  }

  const obtenerAccesosPortal = async (filtros, idPortal) => {
    try {
      const { page, rowsPerPage } = paginacionAccesos.value

      cargandoAccesos.value = true
      const { data } = await apiUsuarios.post(`/accesos/portal/${idPortal}`, {
        page,
        rowsPerPage,
        filtros
      })

      accesos.value = data.accesos
      accesosFiltrados.value = data.accesos
      paginacionAccesos.value.pagesNumber = data.totalPages
      paginacionAccesos.value.rowsNumber = data.total
    } catch (error) {
      console.log(error)
    } finally {
      cargandoAccesos.value = false
    }
  }

  const obtenerPermisosSucursalesByUser = async (idUsuario) => {
    try {
      const { data } = await apiUsuarios.post('/permisos/sucursales/justificantes', { idUsuario })
      permisosSucursales.value = [...data]
      clavesPermisosSucursales.value = permisosSucursales.value.map(permiso => { return permiso.claveSucursal })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    // state
    usuariosModulos,
    usuariosAcceso,
    filtroUsuariosAcceso,
    listaModulos,
    tickedSeleccionados,
    permisoPanelControl,
    accesos,
    accesosFiltrados,
    paginacionAccesos,
    cargandoAccesos,
    permisosSucursales,
    clavesPermisosSucursales,
    // methods
    obtenerUsuariosModulo,
    obtenerPermisosByUsuario,
    actualizarPermisos,
    solicitarAcceso,
    obtenerAccesosPortal,
    obtenerPermisosSucursalesByUser
  }
})
