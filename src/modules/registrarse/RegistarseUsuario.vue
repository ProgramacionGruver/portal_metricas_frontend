<template>
  <q-layout class="layout--registrarse">
    <q-card style="width: 35vw; border-radius: 2%; padding: 3rem;">
      <q-card-section>
        <div style="width: 100%;">
          <img src="../../assets/logoGruver.png" alt="Logo Gruver" style="width: 100%; height: 100%;">
        </div>
      </q-card-section>
      <q-card-section class="q-mt-md">
        <div style="display: block; width: 100%;">
          <p class="text-center text-h4">
            Regístrate para acceder el portal de métricas
          </p>
          <q-input
            v-model="numero_empleado"
            label="Ingresa tu número de empleado"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Debes ingresar tu número de empleado',
            ]"
            style="width: 100%;"
            filled
          >
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
          <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
            <q-btn
              color="primary"
              label="Registrarse"
              icon="person_add"
              @click="registrarUsuario"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useAutenticacionStore } from 'src/stores/autenticaciones'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const useAutenticacion = useAutenticacionStore()
    const { registrarPermisoPortalMetricas } = useAutenticacion
    const { registroExitoso } = storeToRefs(useAutenticacion)

    const numero_empleado = ref('')

    const router = useRouter()

    const registrarUsuario = async () => {
      await registrarPermisoPortalMetricas(numero_empleado.value)

      if (registroExitoso.value) {
        router.push('/')
      }
    }

    return {
      // States
      numero_empleado,
      // Methods
      registrarUsuario
    }
  }
}
</script>

<style>
.layout--registrarse {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden !important;
  background-color: #f3f4f6;
}
</style>
