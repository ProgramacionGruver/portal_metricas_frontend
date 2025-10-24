import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiUsuarios } from 'src/boot/axiosUsuarios'

export const usePuestosStore = defineStore("puestos", () => {
  const puestos = ref([])
  const listaPuestos = ref([])
  const listaClavePuestos = ref([])

  const obtenerPuestos = async () => {
    try {
      const { data } = await apiUsuarios.get('/puestos')

      listaPuestos.value = data.map(puesto => {
        return {
          label: puesto.nombrePuesto,
          value: puesto
        }
      })

      listaClavePuestos.value = data.map((puesto) => {
        return puesto.clavePuesto
      })

      puestos.value = [...data]
    } catch (error) {
      //console.log( error )
    }
  }

  return {
    puestos,
    listaPuestos,
    listaClavePuestos,
    obtenerPuestos,
  }
})
