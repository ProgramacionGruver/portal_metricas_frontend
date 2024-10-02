import { defineStore } from "pinia";
import { apiToken } from "src/boot/axiosToken";
import { apiPowerBiIntragruver } from "src/boot/axiosPowerBiIntragruver";
import { paramsLoginPowerBiUno } from "src/constant/powerbiParams";
import { paramsLoginPowerBiDos } from "src/constant/powerbiParams";
import qs from 'qs'
import { ref } from "vue";
import { apiUsuarios } from "src/boot/axiosUsuarios";
import { api } from "src/boot/axios";

export const usePowerBiStore = defineStore('powerbi', () => {
  const embedToken = ref(null)
  const reportesGeneral = ref([])
  const habilitarNavegacionPortal = ref(false)
  const infoMetricaSeleccionada = ref(null)

  const tokenCuentaUno = ref({
    cuenta: 1,
    token: null,
    generado: null,
    expira: null
  })

  const tokenCuentaDos = ref({
    cuenta: 2,
    token: null,
    generado: null,
    expira: null
  })

  const cuentaSeleccionada = ref(null)


  const obtenerAccessToken = async (cuentaPowerBi) => {
    try {
      const cuenta = cuentaPowerBi === 1 ? paramsLoginPowerBiUno : paramsLoginPowerBiDos

      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const { data } = await apiUsuarios.post('/metricas/token', { cuenta }, config)

      if (cuentaPowerBi === 1) {
        tokenCuentaUno.value.token = data.access_token
        tokenCuentaUno.value.generado = new Date().getTime()
        tokenCuentaUno.value.expira = tokenCuentaUno.value.generado + (data.expires_in * 1000)
      } else {
        tokenCuentaDos.value.token = data.access_token
        tokenCuentaDos.value.generado = new Date().getTime()
        tokenCuentaDos.value.expira = tokenCuentaDos.value.generado + (data.expires_in * 1000)
      }

      habilitarNavegacionPortal.value = true
    } catch (error) {
      console.log(error)
    }
  }

  const validacionExpiracionToken = (cuentaObj) => {
    if (cuentaObj.token === null) {
      return true
    }

    if (cuentaObj.expira === null || cuentaObj.generado === null) {
      return true
    }

    const horaActual = new Date().getTime()
    if (horaActual >= cuentaObj.expira) {
      return true
    }

    return false
  }

  const obtenerEmbedToken = async (grupoId, reporteId, cuentaPB) => {
    try {
      cuentaSeleccionada.value = cuentaPB === 1 ? tokenCuentaUno : tokenCuentaDos

      if (validacionExpiracionToken(cuentaSeleccionada.value.value)) {
        await obtenerAccessToken()
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${cuentaSeleccionada.value.value.token}`,
          'Cache-Control': 'no-cache'
        }
      }

      const { data } = await apiPowerBiIntragruver.get(`/${grupoId}/reports`, config)

      const reporte = data.value.find(reporte => reporte.id === reporteId)

      embedToken.value = reporte
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerDatosMetrica = async (idMetrica) => {
    try {
      const { data } = await apiUsuarios.get(`/metricas/${idMetrica}`)

      infoMetricaSeleccionada.value = data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    // Vars / States
    reportesGeneral,
    habilitarNavegacionPortal,
    embedToken,
    infoMetricaSeleccionada,
    tokenCuentaUno,
    tokenCuentaDos,
    cuentaSeleccionada,
    // Functions
    obtenerAccessToken,
    obtenerEmbedToken,
    obtenerDatosMetrica,
  }
})
