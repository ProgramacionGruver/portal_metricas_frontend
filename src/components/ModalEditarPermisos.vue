<template>
  <q-dialog v-model="modalPermisos">
    <q-card class="full-width">
      <q-card-section
        class="bg-primary text-white"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          padding: 0;
        "
      >
        <h4 style="margin-left: 2rem">Editar permisos</h4>
        <q-btn
          flat
          round
          dense
          v-close-popup
          class="text-white"
          icon="close"
          style="margin-right: 2rem"
        />
      </q-card-section>
      <q-card-section>
        <q-select
          outlined
          clearable
          use-input
          input-debounce="0"
          label="Selecciona un usuario"
          v-model="usuarioSeleccionado"
          :options="opcionesUsuarios"
          @update:model-value="seleccionarUsuario"
          @filter="filtrarUsuarios"
        />
      </q-card-section>
      <q-card-section
        style="max-height: 50vh"
        class="scroll q-pt-none"
        v-if="!usuarioSeleccionado"
      >
        <div align="center">
          <q-icon
            name="checklist"
            color="grey"
            size="3rem"
            class="q-mr-sm"
          ></q-icon>
          <div class="text-weight-light text-grey">
            Selecciona un usuario para editar sus permisos
          </div>
        </div>
      </q-card-section>
      <q-card-section
        v-else
        style="
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        "
      >
        <div class="text-h5">Módulos y métricas del portal</div>
        <q-tree
          class="col-12 col-sm-6"
          :nodes="checksPermisos"
          tick-strategy="leaf"
          node-key="name"
          v-model:ticked="tickedSeleccionados"
        />
        <q-card-actions
          style="
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <q-btn
            v-if="usuarioSeleccionado"
            class="q-my-sm"
            @click="actualizarPermiso"
            icon="update"
            label="Actualizar permisos"
            color="primary"
            :loading="cargando"
          >
            <template v-slot:loading>
              <q-spinner-facebook color="white" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useModulosStore } from "src/stores/permisosModulos";
import { storeToRefs } from "pinia";
import { filtradoBusquedaObj } from "src/helpers/filtroBusquedaObj";

export default {
  setup() {
    const useModulos = useModulosStore();
    const { obtenerPermisosByUsuario, actualizarPermisos } = useModulos;
    const {
      filtroUsuariosAcceso,
      listaModulos,
      tickedSeleccionados,
      permisoPanelControl,
    } = storeToRefs(useModulos);

    const modalPermisos = ref(false);
    const usuarioSeleccionado = ref(null);

    const checksPermisos = ref([]);

    const opcionesUsuarios = ref(filtroUsuariosAcceso.value);

    const cargando = ref(false);

    const abrir = () => {
      usuarioSeleccionado.value = null;

      checksPermisos.value = listaModulos.value
        .map((modulo) => {
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
                    };
                  }),
                };
              }),
            };
          } else {
            return {
              label: modulo.label,
              name: modulo.name,
            };
          }
        })

      modalPermisos.value = true;
    };

    const seleccionarUsuario = async () => {
      if (usuarioSeleccionado.value) {
        await obtenerPermisosByUsuario(usuarioSeleccionado.value.value);
      }
    };

    const actualizarPermiso = async () => {
      cargando.value = true;

      const permisos = {
        usuario: usuarioSeleccionado.value.value,
        metricasSeleccionadas: tickedSeleccionados.value,
        permisoPanelControl: permisoPanelControl.value,
      }

      await actualizarPermisos(permisos);

      cargando.value = false;
      modalPermisos.value = false;
    };

    const filtrarUsuarios = (val, update) => {
      filtradoBusquedaObj(
        val,
        update,
        filtroUsuariosAcceso.value,
        opcionesUsuarios
      );
    };

    return {
      // States / Vars
      modalPermisos,
      usuarioSeleccionado,
      filtroUsuariosAcceso,
      listaModulos,
      checksPermisos,
      tickedSeleccionados,
      opcionesUsuarios,
      permisoPanelControl,
      cargando,
      // Methods
      abrir,
      seleccionarUsuario,
      actualizarPermiso,
      filtrarUsuarios,
    };
  },
};
</script>
