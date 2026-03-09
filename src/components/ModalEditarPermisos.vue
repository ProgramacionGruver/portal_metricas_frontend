<template>
  <q-dialog v-model="modalPermisos">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          padding: 0;
        ">
        <h4 class="q-pa-md">Editar permisos</h4>
        <q-btn flat round dense v-close-popup class="text-white" icon="close" style="margin-right: 2rem" />
      </q-card-section>
      <q-card-section>
        <q-select outlined clearable use-input input-debounce="0" label="Selecciona un usuario"
          v-model="usuarioSeleccionado" :options="opcionesUsuarios" @update:model-value="seleccionarUsuario"
          @filter="filtrarUsuarios" />
      </q-card-section>
      <q-card-section style="max-height: 50vh" class="scroll q-pt-none" v-if="!usuarioSeleccionado">
        <div align="center">
          <q-icon name="checklist" color="grey" size="3rem" class="q-mr-sm"></q-icon>
          <div class="text-weight-light text-grey">
            Selecciona un usuario para editar sus permisos
          </div>
        </div>
      </q-card-section>
      <q-card-section v-else style="
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        ">
        <div class="text-h5">Módulos del portal</div>
        <q-tree class="col-12" :nodes="checksPermisosModulos" tick-strategy="leaf" node-key="name"
          v-model:ticked="tickedModulosSeleccionados" />

        <q-separator class="q-my-md" />

        <div class="text-h5">Métricas del portal</div>
        <q-tree class="col-12" :nodes="checksPermisosMetricas" tick-strategy="leaf" node-key="name"
          v-model:ticked="tickedMetricasSeleccionadas" />

        <q-card-actions style="
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          ">
          <q-btn v-if="usuarioSeleccionado" class="q-my-sm" @click="actualizarPermiso" icon="update"
            label="Actualizar permisos" color="primary" :loading="cargando">
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
import { useMetricasStore } from "src/stores/metricas";
import { storeToRefs } from "pinia";
import { filtradoBusquedaObj } from "src/helpers/filtroBusquedaObj";
import { useRouter } from "vue-router";
import { useAutenticacionStore } from "src/stores/autenticaciones";
import { QSpinnerIos, useQuasar } from "quasar";

export default {
  setup() {
    const useAutenticaciones = useAutenticacionStore();
    const { usuarioAutenticado } = storeToRefs(useAutenticaciones);

    const useModulos = useModulosStore();
    const { obtenerPermisosByUsuario, actualizarPermisos } = useModulos;
    const {
      filtroUsuariosAcceso,
      permisoPanelControl,
    } = storeToRefs(useModulos);

    const useMetricas = useMetricasStore();
    const {
      obtenerPermisosModulosByNumeroEmpleado,
      obtenerPermisosMetricasByNumeroEmpleado,
      actualizarPermisosModulos,
      actualizarPermisosMetricas
    } = useMetricas;
    const { metricas, permisosMetricas, permisosModulos } = storeToRefs(useMetricas);

    const modalPermisos = ref(false);
    const usuarioSeleccionado = ref(null);

    const checksPermisosModulos = ref([]);
    const checksPermisosMetricas = ref([]);
    const tickedModulosSeleccionados = ref([]);
    const tickedMetricasSeleccionadas = ref([]);

    const opcionesUsuarios = ref(filtroUsuariosAcceso.value);

    const cargando = ref(false);

    const router = useRouter();

    const $q = useQuasar();

    const abrir = () => {
      usuarioSeleccionado.value = null;
      tickedModulosSeleccionados.value = [];
      tickedMetricasSeleccionadas.value = [];

      checksPermisosModulos.value = router.options.routes
        .find((route) => route.name === "principal")
        .children.filter((route) => route.name !== "dashboard").map((route) => {
          return {
            name: route.name,
            label: route.label,
          };
        });

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

      modalPermisos.value = true;
    };

    const seleccionarUsuario = async () => {
      if (usuarioSeleccionado.value) {
        await obtenerPermisosModulosByNumeroEmpleado(usuarioSeleccionado.value.value.numero_empleado);
        tickedModulosSeleccionados.value = permisosModulos.value.map(p => p.nombreModulo);

        await obtenerPermisosMetricasByNumeroEmpleado(usuarioSeleccionado.value.value.numero_empleado);

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
      }
    };

    const actualizarPermiso = async () => {
      cargando.value = true;

      try {
        $q.loading.show({
          message: 'Actualizando permisos, espere un momento...',
          spinner: QSpinnerIos,
          spinnerColor: "primary",
          spinnerSize: 150,
          backgroundColor: "grey",
          messageColor: "black",
        })

        await actualizarPermisosModulos(usuarioSeleccionado.value.value.numero_empleado, tickedModulosSeleccionados.value, usuarioAutenticado.value.usuario);

        const permisosMetricas = tickedMetricasSeleccionadas.value.map(metrica => {
          return Number(metrica.split("-")[1]);
        })

        await actualizarPermisosMetricas(usuarioSeleccionado.value.value.numero_empleado, permisosMetricas, usuarioAutenticado.value.usuario);

        modalPermisos.value = false;
      } catch (error) {
        console.error("Error al actualizar permisos:", error);
      } finally {
        cargando.value = false;
        $q.loading.hide();
      }
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
      // States
      modalPermisos,
      usuarioSeleccionado,
      filtroUsuariosAcceso,
      checksPermisosModulos,
      checksPermisosMetricas,
      tickedModulosSeleccionados,
      tickedMetricasSeleccionadas,
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
