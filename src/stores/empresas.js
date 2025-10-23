import { defineStore, storeToRefs } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'
import { llenarOpcionesEmpresas, filtrarElemento } from 'src/helpers/filtros'
import { useModulosStore } from 'src/stores/permisosModulos'
import { useAutenticacionStore } from 'src/stores/autenticaciones'

export const useEmpresasStore = defineStore('empresas', () => {
  const listaEmpresas = ref([])
  const primeraCarga = ref(true)
  const empresas = ref([])
  const empresasFiltradas = ref([])
  const modelEmpresasSeleccionadas = ref([])
  const listaClavesEmpresas = ref([])
  const todasEmpresasSeleccionadas = ref(true)
  const empresasAcceso = ref([])

  const useUsuario = useAutenticacionStore()
  const { usuarioAutenticado } = storeToRefs(useUsuario)

  const useModulos = useModulosStore()
  const { permisosSucursales } = storeToRefs(useModulos)
  const { obtenerPermisosSucursalesByUser } = useModulos

  const obtenerEmpresass = async () => {
    try {
      const { data } = await apiUsuarios.get('/empresas')
      listaEmpresas.value = data
      empresasFiltradas.value = llenarOpcionesEmpresas(listaEmpresas.value)
      listaClavesEmpresas.value = listaEmpresas.value.map(empresa => empresa.claveEmpresa)
    } catch (error) {
      console.error('Error al obtener empresas ' + error)
    }
  }

  const actualizarEmpresa = async (empresaActualizada) => {
    try {
      const data = await apiUsuarios.patch(`/empresas/${empresaActualizada.idEmpresa}`, empresaActualizada)
      notificacion('positive', 'Empresa actualizada exitosamente')
      return data
    } catch (error) {
      notificacion('negative', error)
    }
  }

  return {
    primeraCarga,
    listaEmpresas,
    modelEmpresasSeleccionadas,
    obtenerEmpresass,
    actualizarEmpresa,
    empresas,
    empresasFiltradas,
    todasEmpresasSeleccionadas,
    listaClavesEmpresas
  }
})
