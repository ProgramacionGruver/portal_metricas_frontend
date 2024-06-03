import { defineStore } from 'pinia'
import { apiUsuarios } from 'src/boot/axiosUsuarios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const useAutenticacionStore = defineStore('autenticaciones', () => {
  const usuarioAutenticado = ref(null)
  const isLogin = ref(false)
  const mandarARegistrarse = ref(false)
  const registroExitoso = ref(false)

  const iniciarSesion = async (usuario, router) => {
    try {
      const { data } = await apiUsuarios.post('/usuarios/login', usuario)
      isLogin.value = true
      localStorage.setItem('token', data)

      await autenticarUsuario()
      router.push('/principal')
    } catch (error) {
      notificacion('negative', error.response.data.message)
    }
  }

  // reseteamos el store de la autenticacion
  const cerrarSesion = async () => {
    try {
      usuarioAutenticado.value = null
      localStorage.removeItem('token')
      isLogin.value = false
    } catch (error) {
      // console.log(error)
    }
  }

  const autenticarUsuario = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }

    const configuracion = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await apiUsuarios.get('/usuarios/perfil', configuracion)
      isLogin.value = true
      usuarioAutenticado.value = { ...data }
    } catch (error) {
      isLogin.value = false
      notificacion('negative', error.response.data.message)
    }
  }

  const registrarPermisoPortalMetricas = async (numero_empleado) => {
    try {
      const { data } = await apiUsuarios.post(`/metricasRegistro/${numero_empleado}`)

      registroExitoso.value = true
      notificacion('positive', data.message)
    } catch (error) {
      registroExitoso.value = false

      if (error.response.status >= 400) {
        registroExitoso.value = false
        notificacion('warning', error.response.data.message)
        return
      }

      notificacion('negative', error.response.data.message)
    }
  }

  return {
    iniciarSesion,
    cerrarSesion,
    autenticarUsuario,
    usuarioAutenticado,
    isLogin,
    registrarPermisoPortalMetricas,
    registroExitoso
  }
})
