<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          padding: 0;
        ">
        <h4 class="q-pa-md">Solicitar acceso</h4>
        <q-btn flat round dense v-close-popup class="text-white" icon="close" style="margin-right: 2rem" />
      </q-card-section>
      <q-card-section>
        <div class="text-h5 q-mb-md">Métricas del portal</div>
        <q-tree class="col-12" :nodes="checksPermisosMetricas" tick-strategy="leaf" node-key="name"
          v-model:ticked="tickedMetricasSeleccionadas" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" v-close-popup icon-right="close" color="primary" />
        <q-btn color="primary" label="Solicitar acceso" @click="solicitudAcceso" icon-right="send" :loading="cargando"
          :disable="tickedMetricasSeleccionadas.length === 0">
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
import { useMetricasStore } from 'src/stores/metricas';
import { storeToRefs } from 'pinia';
import { useAutenticacionStore } from 'src/stores/autenticaciones';
import { notificacion } from 'src/helpers/mensajes';

export default {
  setup() {
    const useAutenticaciones = useAutenticacionStore();
    const { usuarioAutenticado } = storeToRefs(useAutenticaciones);

    const useMetricas = useMetricasStore();
    const { solicitarAccesoMetricas } = useMetricas;
    const { metricas, permisosMetricas } = storeToRefs(useMetricas);

    const abrirModal = ref(false);

    const checksPermisosMetricas = ref([]);
    const tickedMetricasSeleccionadas = ref([]);

    const cargando = ref(false);

    const abrir = () => {
      // Construir el formato correcto para tickedMetricasSeleccionadas
      tickedMetricasSeleccionadas.value = permisosMetricas.value.map(permiso => {
        let resultado = null;
        metricas.value.forEach(empresa => {
          empresa.grupos.forEach(grupo => {
            const metrica = grupo.metricas.find(m => m.idMetrica === permiso.idMetrica);
            if (metrica) {
              resultado = `metrica-${metrica.idMetrica}-${grupo.idGrupo}-${empresa.claveEmpresa}`;
            }
          });
        });
        return resultado;
      }).filter(Boolean);

      checksPermisosMetricas.value = metricas.value.map((empresa) => {
        return {
          label: empresa.nombreCorto,
          name: `empresa-${empresa.claveEmpresa}`,
          children: empresa.grupos.map((grupo) => {
            return {
              label: grupo.nombreGrupo,
              name: `grupo-${grupo.idGrupo}-${empresa.claveEmpresa}`,
              children: grupo.metricas.map((metrica) => {
                return {
                  label: metrica.nombreMetrica,
                  name: `metrica-${metrica.idMetrica}-${grupo.idGrupo}-${empresa.claveEmpresa}`,
                };
              }),
            };
          }),
        };
      });

      abrirModal.value = true;
    }

    const solicitudAcceso = async () => {
      cargando.value = true;

      const permisosMetricas = tickedMetricasSeleccionadas.value.map(metrica => {
        return Number(metrica.split("-")[1]);
      })

      await solicitarAccesoMetricas(usuarioAutenticado.value.numero_empleado, permisosMetricas);

      tickedMetricasSeleccionadas.value = [];
      cargando.value = false;
      abrirModal.value = false;
    }

    return {
      // States
      abrirModal,
      checksPermisosMetricas,
      tickedMetricasSeleccionadas,
      cargando,
      // Methods
      abrir,
      solicitudAcceso
    }
  }
}
</script>
