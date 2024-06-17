<template>
  <q-dialog v-model="abrirModal">
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
        <h4 style="margin-left: 2rem">Solicitar acceso</h4>
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
        <div class="text-h4">Seleccione las métricas a las que desea acceder:</div>
        <q-tree
          class="col-12 col-sm-6 q-mt-md"
          :nodes="checksPermisos"
          tick-strategy="leaf"
          node-key="name"
          v-model:ticked="tickedSeleccionados"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancelar"
          v-close-popup
          icon-right="close"
          color="primary"
        />
        <q-btn
          color="primary"
          label="Solicitar acceso"
          @click="solicitudAcceso"
          icon-right="send"
          :loading="cargando"
          :disable="tickedSeleccionados.length === 0"
        >
          <template v-slot:loading>
            <q-spinner-facebook color="white" />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import { useModulosStore } from 'src/stores/permisosModulos';
import { storeToRefs } from 'pinia';
import { useAutenticacionStore } from 'src/stores/autenticaciones';
import { notificacion } from 'src/helpers/mensajes';

export default {
  setup() {
    const useAutenticaciones = useAutenticacionStore();
    const { usuarioAutenticado } = storeToRefs(useAutenticaciones);

    const useModulos = useModulosStore();
    const { solicitarAcceso } = useModulos;
    const { listaModulos } = storeToRefs(useModulos);

    const abrirModal = ref(false);

    const checksPermisos = ref([]);
    const tickedSeleccionados = ref([]);

    const cargando = ref(false);

    const abrir = () => {
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
        .filter((modulo) => modulo.children);

      abrirModal.value = true;
    }

    const solicitudAcceso = async () => {
      cargando.value = true;

      const solicitud = {
        solicitante: usuarioAutenticado.value,
        metricas: tickedSeleccionados.value
      }

      notificacion('warning', 'Espere a que se cierre este automaticamente este modal, puede tardar unos segundos...')

      await solicitarAcceso(solicitud);

      tickedSeleccionados.value = [];
      cargando.value = false;
      abrirModal.value = false;
    }

    return {
      // States
      abrirModal,
      checksPermisos,
      tickedSeleccionados,
      cargando,
      // Methods
      abrir,
      solicitudAcceso
    }
  }
}
</script>
