import { api } from 'src/boot/axios'

export const mensajeHerramienta = async (requisicion) => {
  try {
    const { data } = await api.post('/notificaciones/notificacionHerramienta', requisicion)
    return data.msg
  } catch (error) {
    // console.log(error)
  }
}
