import { defineStore } from "pinia";
import { apiUsuarios } from "src/boot/axiosUsuarios";
import { ID_PORTAL } from "src/constant/servidor";
import { ref } from "vue";

export const useActualizacionesStore = defineStore("actualizaciones", () => {
  const estaActualizado = ref(false);

  const validarActualizacionPortal = async (actualizacionData) => {
    try {
      const { data } = await apiUsuarios.post(`/portales/validarActualizacion/${ID_PORTAL}`, actualizacionData);

      estaActualizado.value = data.actualizacion;
    } catch (error) {
      console.error("Error al validar la actualización del portal:", error);
    }
  }

  const marcarUsuarioActualizado = async (actualizacionData) => {
    try {
      await apiUsuarios.post(`/portales/marcarActualizacion/${ID_PORTAL}`, actualizacionData);
    } catch (error) {
      console.error("Error al marcar al usuario como actualizado:", error);
    }
  }

  return {
    // States
    estaActualizado,
    // Methods
    validarActualizacionPortal,
    marcarUsuarioActualizado,
  }
})
