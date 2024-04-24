<template>
  <q-dialog v-model="modalPermisos">
    <q-card class="full-width" style="height: auto;">
      <q-card-section class="bg-primary text-white row" style="position: sticky; top: 0; z-index: 100; display: flex; justify-content: space-between;">
        <h4>Editar permisos</h4>
        <q-btn flat round dense v-close-popup class="text-white" icon="close" />
      </q-card-section>
      <q-card-section>
        <q-select
          class="q-mb-md"
          v-model="usuarioSeleccionado"
          label="Selecciona un usuario"
          option-label="nombre"
          option-disable="inactive"
          emit-value
          outlined
          map-options
          :options="filtroUsuariosAcceso"
          @update:model-value="seleccionarUsuario"
        />
      </q-card-section>
      <q-card-section style="max-height: 50vh" class="scroll q-pt-none" v-if="!usuarioSeleccionado">
        <div align="center" >
          <q-icon name="checklist" color="grey" size="3rem" class="q-mr-sm"></q-icon>
          <div class="text-weight-light text-grey">
            Selecciona un usuario para editar sus permisos
          </div>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class="text-h4">Permisos de módulos</div>
        <q-tree
          class="col-12 col-sm-6"
          :nodes="checksPermisos"
          tick-strategy="leaf"
          node-key="name"
          v-model:ticked="tickedSeleccionados"
        />
        <q-card-actions align="center">
        <q-btn
          v-if="usuarioSeleccionado"
          class="q-my-sm"
          @click="actualizarPermisos"
          icon="update"
          label="Actualizar permisos"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { useModulosStore } from 'src/stores/permisosModulos'
import { storeToRefs } from 'pinia'

export default {
  setup () {
    const useModulos = useModulosStore()
    const { filtroUsuariosAcceso, listaModulos, usuariosModulos } = storeToRefs(useModulos)

    const modalPermisos = ref(false)
    const usuarioSeleccionado = ref(null)
    const checksPermisos = ref([])
    const tickedSeleccionados = ref([])

    const abrir = () => {
      usuarioSeleccionado.value = null

      checksPermisos.value = [{
        label: 'Modulos del portal',
        children: listaModulos.value.map((modulo) => {
          if (modulo.children) {
            return {
              label: modulo.label,
              name: modulo.name,
              children: modulo.children.map((departamento) => {
                return {
                  label: departamento.label,
                  name: departamento.name,
                  children: departamento.children.map((modulo) => {
                    return {
                      label: modulo.label,
                      name: modulo.name,
                    }
                  })
                }
              })
            }
          } else {
            return {
              label: modulo.label,
              name: modulo.name,
            }
          }
        })
      }]

      modalPermisos.value = true
    }

    const seleccionarUsuario = async () => {
      tickedSeleccionados.value = []

      console.log(tickedSeleccionados.value);
    }

    const actualizarPermisos = async () => {

    }

    return {
      // States / Vars
      modalPermisos,
      usuarioSeleccionado,
      filtroUsuariosAcceso,
      listaModulos,
      checksPermisos,
      tickedSeleccionados,
      // Methods
      abrir,
      seleccionarUsuario,
      actualizarPermisos
    }
  }
}
</script>
