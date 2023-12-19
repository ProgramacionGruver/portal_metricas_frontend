<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Portal Metricas
        </q-toolbar-title>
        <q-btn flat @click="logout"> Cerrar sesión</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="270">
      <!-- drawer content -->
      <div class="contenedor-perfil">
        <div style="background-color: rgba(0, 0, 0, 0.5);" class="q-px-md q-py-sm">
            <div style="display: flex; justify-content: center;">
              <q-avatar size="7rem">
                <q-img
                  :src="calcularURLFoto(usuarioAutenticado?.numero_empleado)"
                  spinner-color="white"/>
              </q-avatar>
            </div>
            <div style="display: flex; justify-content: center; " >
              {{ usuarioAutenticado?.nombre }}
            </div>
        </div>
      </div>
      <NavBar></NavBar>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import NavBar from 'src/components/NavBar.vue'

import { useAutenticacionStore } from 'src/stores/autenticaciones'


export default {
  components: {
    NavBar
  },
  setup () {
    const useUsuario = useAutenticacionStore()
    const { cerrarSesion } = useUsuario
    const { usuarioAutenticado } = storeToRefs(useUsuario)
    
    const leftDrawerOpen = ref(false)
    const router = useRouter()

    const logout = () => {
      router.push('/')
      cerrarSesion()
    }
    onMounted(() => {
    })

    const calcularURLFoto = (numeroEmpleado) => {
      const idFormateado = String(numeroEmpleado).padStart(7, '0')
      const url = `https://www.gruver.com.mx/fotos/${idFormateado}.jpg`
      return url
    }

    return {
      usuarioAutenticado,
      leftDrawerOpen,
      logout,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      calcularURLFoto,
    }
  }
}
</script>
