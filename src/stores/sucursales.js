import { defineStore, storeToRefs } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'
import { filtrarElemento, llenarOpcionesSucursales } from 'src/helpers/filtros'
import { useModulosStore } from 'src/stores/permisosModulos'

export const useSucursalesStore = defineStore('sucursales', () => {
  const sucursalSeleccionada = ref(null)
  const opcionesSucursales = ref([])
  const sucursales = ref([])
  const sucursalesFiltradas = ref([])
  const modelSucursalesSeleccionadas = ref([])
  const listaClavesSucursales = ref([])
  const todasSucursalesSeleccionadas = ref(true)
  const sucursalesAgrupadas = ref([])
  const sucursalesAcceso = ref([])

  const useModulos = useModulosStore()
  const { permisosSucursales } = storeToRefs(useModulos)

  const obtenerSucursales = async () => {
    try {
      const { data } = await apiUsuarios.get('/todasSucursales')

      // Opciones Sucursales
      opcionesSucursales.value = data.map(sucursal => {
        return {
          label: `${sucursal.nombreSucursal}`,
          value: sucursal
        }
      })

      listaClavesSucursales.value = data.map(sucursal => sucursal.claveSucursal)
      sucursales.value = data
      sucursalesFiltradas.value = llenarOpcionesSucursales(sucursales.value)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    sucursalSeleccionada,
    opcionesSucursales,
    obtenerSucursales,
    sucursales,
    sucursalesFiltradas,
    modelSucursalesSeleccionadas,
    todasSucursalesSeleccionadas,
    listaClavesSucursales,
    sucursalesAgrupadas,
  }
})
