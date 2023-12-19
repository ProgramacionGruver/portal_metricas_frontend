import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiPortalRH } from 'src/boot/axiosRH'
import { apiUsuarios } from 'src/boot/axiosUsuarios'

export const useInformacionContpaqiStore = defineStore('informacioncontpaqi', () => {
  const centrosTrabajo = ref([])
  const empresas = ref([])
  const departamentos = ref([])
  const horarioLunesViernes = ref([])
  const horarioSabados = ref([])
  const jefesDirectos = ref([])
  const comisiones = ref([])
  const localidades = ref([])
  const puestos = ref([])

  const obtenerCentrosTrabajo = async () => {
    try {
      const { data } = await apiUsuarios.get('/todasSucursales')
      const sucursalesRH = data.filter(sucursal => sucursal.tipoSucursal == 0 || sucursal.tipoSucursal == 2)
      centrosTrabajo.value = sucursalesRH.map(e => e.nombreAbreviacion).sort()
    } catch (error) {
    }
  }

  const obtenerDepartamentos = async () => {
    try {
      const { data } = await apiUsuarios.get('/departamentos/')
      // departamentos.value
      for (const dato of data) {
        departamentos.value = [...departamentos.value, dato.departamento].sort()
      }
    } catch (error) {
      // console.log(error)
    }
  }

  const obtenerComisiones = async () => {
    try {
      const { data } = await apiPortalRH.get('/contpaqi/comision')
      comisiones.value = data.map(data => data.comision)
    } catch (error) {
      // console.log(error)
    }
  }

  const obtenerHorarios = async () => {
    try {
      const { data } = await apiPortalRH.get('/contpaqi/horarios')

      for (const dato of data) {
        horarioLunesViernes.value = [...horarioLunesViernes.value, dato.horario].sort()
        horarioSabados.value = [...horarioSabados.value, dato.horario].sort()
      }
    } catch (error) {
      // console.log(error)
    }
  }

  const obtenerJefes = async () => {
    try {
      const { data } = await apiPortalRH.get('/contpaqi/empleados')
      // console.log(data)

      jefesDirectos.value = data.sort()
    } catch (error) {
      // console.log(error)
    }
  }

  const obtenerEmpresas = async () => {
    try {
      const { data } = await apiUsuarios.get('/empresas')
      empresas.value = data.map(empresa => empresa.razonSocial)
    } catch (error) {
      // console.log(error)
    }
  }

  const obtenerPuestos = async () => {
    try {
      const { data } = await apiPortalRH.get('/contpaqi/puestos')
      // //console.log(data)
      // puestos.value = data
      for (const dato of data) {
        puestos.value = [...puestos.value, dato.puesto]
      }
    } catch (error) {
      // console.log(error)
    }
  }

  return {
    // states
    centrosTrabajo,
    departamentos,
    horarioLunesViernes,
    jefesDirectos,
    comisiones,
    localidades,
    puestos,
    horarioSabados,
    empresas,
    // metods
    obtenerCentrosTrabajo,
    obtenerDepartamentos,
    obtenerComisiones,
    obtenerHorarios,
    obtenerJefes,
    obtenerEmpresas,
    obtenerPuestos
  }
})
