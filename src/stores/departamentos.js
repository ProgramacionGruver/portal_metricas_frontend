import { defineStore } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { filtrarElementosDuplicados, llenarOpcionesDepartamentos } from 'src/helpers/filtros'
import { ref } from 'vue'

export const useDepartamentosStore = defineStore('departamentos', () => {
  const departamentos = ref([])
  const departamentosFiltrados = ref([])
  const modelDepartamentosSeleccionados = ref([])
  const todosDepartamentosSeleccionados = ref(true)
  const opcionesDepartamentos = ref([])
  const listaClavesDepartamentos = ref([])

  const obtenerDepartamentos = async () => {
    try {
      const { data } = await apiUsuarios.get('/departamentosSucursal')
      departamentos.value = data.map(departamento => { return { ...departamento, label: departamento.departamento.nombreDepartamento, value: departamento.claveDepartamento } })

      departamentosFiltrados.value = filtrarElementosDuplicados(departamentos.value, 'claveDepartamento')

      opcionesDepartamentos.value = llenarOpcionesDepartamentos(departamentos.value)

      listaClavesDepartamentos.value = departamentosFiltrados.value.map(departamento => {
        return departamento.value
      })
    } catch (error) {
      // console.log( error )
    }
  }

  return {
    departamentos,
    departamentosFiltrados,
    modelDepartamentosSeleccionados,
    todosDepartamentosSeleccionados,
    opcionesDepartamentos,
    listaClavesDepartamentos,
    obtenerDepartamentos
  }
})
