import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { notificacion } from 'src/helpers/mensajes'

export const useModulosStore = defineStore('modulos', () => {
  const listaModulos = ref([])
  const usuariosModulos = ref([])
  const usuariosAcceso = ref([])
  const filtroUsuariosAcceso = ref([])
  const permisosSucursales = ref([])

  const obtenerUsuariosModulo = async () => {
    try {
      const { data } = await apiUsuarios.get('/metrica/permiso')
      usuariosModulos.value = data.usuariosModulos
      usuariosAcceso.value = data.usuariosPortal
      filtroUsuariosAcceso.value = data.usuariosPortal
    } catch (error) {
      console.log(error)
    }
  }

  const actualizarPermisosModulos = async (permisosObj) => {
    try {
      const { data } = await apiUsuarios.put('/modulos', permisosObj)
      usuariosModulos.value = data
      notificacion('positive', 'Permisos de módulos actualizados correctamente')
    } catch (error) {
      notificacion('negative', error.response.data.message)
    }
  }

  const obtenerPermisosSucursalesByUser = async (idUsuario) => {
    try {
      const { data } = await apiUsuarios.post('/permisos/sucursales', { idUsuario })
      permisosSucursales.value = data
    } catch (error) {
      notificacion('negative', error.response.data.message)
    }
  }

  const actualizarPermisosSucursales = async (permisosObj) => {
    try {
      const { data } = await apiUsuarios.put('/permisos/sucursales', permisosObj)
      permisosSucursales.value = data
      notificacion('positive', data.message)
    } catch (error) {
      notificacion('negative', error.response.data.message)
    }
  }

  return {
    // state
    usuariosModulos,
    usuariosAcceso,
    filtroUsuariosAcceso,
    listaModulos,
    permisosSucursales,

    // methods
    obtenerUsuariosModulo,
    actualizarPermisosModulos,
    obtenerPermisosSucursalesByUser,
    actualizarPermisosSucursales
  }
})
