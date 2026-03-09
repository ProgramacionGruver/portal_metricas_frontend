<template>
  <div
    v-if="cargando"
    class="fit column items-center justify-center"
    style="height: 90vh !important"
  >
    <q-spinner-ios size="200px" color="primary" />
    <div class="text-h2 q-mt-xl q-mr-md q-ml-md text-center cargando--animado">
      Obteniendo la información del Power BI, espere un momento
    </div>
  </div>
  <q-layout v-else class="q-pa-md">
    <div
      class="q-ma-md"
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <h2>{{ infoMetricaSeleccionada?.nombreMetrica }}</h2>
      <q-btn
        round
        color="primary"
        :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
        :disable="!isEmbedLoaded"
        @click="fullScreenReport"
      >
        <q-tooltip>
          {{
            isFullScreen ? "Salir de pantalla completa" : "Pantalla completa"
          }}
        </q-tooltip>
      </q-btn>
    </div>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="contenedorMetrica">
      <div ref="powerBiContainer" style="height: 90vh"></div>
    </div>
  </q-layout>
</template>

<script>
import { onMounted, ref, nextTick, watch } from "vue";
import * as pbi from "powerbi-client";
import { usePowerBiStore } from "src/stores/powerbi";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMetricasStore } from "src/stores/metricas";
import { useAutenticacionStore } from "src/stores/autenticaciones";

export default {
  setup() {
    const useAutenticaciones = useAutenticacionStore();
    const { usuarioAutenticado } = storeToRefs(useAutenticaciones);

    const useMetricas = useMetricasStore();
    const { obtenerMetricaById, crearLog } = useMetricas;
    const { infoMetricaSeleccionada } = storeToRefs(useMetricas);

    const usePowerBi = usePowerBiStore();
    const { obtenerEmbedToken } = usePowerBi;
    const { embedToken, cuentaSeleccionada } = storeToRefs(usePowerBi);

    const powerBiContainer = ref(null);
    let powerbi;
    let pagesArray = [];
    let reporteEmbed;
    const isFullScreen = ref(false);
    const isEmbedLoaded = ref(false);
    const cargando = ref(true);

    const router = useRouter();

    const infoRouter = ref({
      claveEmpresa: router.currentRoute.value.params.claveEmpresa,
      idGrupo: router.currentRoute.value.params.idGrupo,
      idMetrica: router.currentRoute.value.params.idMetrica,
    });

    onMounted(async () => {
      powerbi = new pbi.service.Service(
        pbi.factories.hpmFactory,
        pbi.factories.wpmpFactory,
        pbi.factories.routerFactory
      );

      await buscarMetrica(infoRouter.value.idMetrica);
    });

    const configurarEmbedReporte = () => {
      const config = {
        type: "report",
        accessToken: cuentaSeleccionada.value.value.token,
        embedUrl: embedToken.value.embedUrl,
        id: embedToken.value.id,
        permissions: pbi.models.Permissions.All,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: true,
          layoutType: pbi.models.LayoutType.Custom,
          customLayout: {
            displayOption: pbi.models.DisplayOption.FitToWidth,
          },
        },
      };

      reporteEmbed = powerbi.embed(powerBiContainer.value, config);
      reporteEmbed.on("loaded", () => {
        isEmbedLoaded.value = true;
        pagesArray = reporteEmbed.getPages();
      });
    };

    const fullScreenReport = () => {
      if (isFullScreen.value) {
        reporteEmbed.exitFullscreen();
      } else {
        reporteEmbed.fullscreen();
      }
      isFullScreen.value = !isFullScreen.value;
    };

    const buscarMetrica = async (idMetrica) => {
      cargando.value = true;

      await obtenerMetricaById(idMetrica);
      await obtenerEmbedToken(
        infoMetricaSeleccionada.value.idGrupoPB,
        infoMetricaSeleccionada.value.idMetricaPB,
        infoMetricaSeleccionada.value.cuentaPB
      );

      await crearLog({
        idMetrica: infoMetricaSeleccionada.value.idMetrica,
        numeroEmpleado: usuarioAutenticado.value.numero_empleado,
        idAccion: 1,
      })

      cargando.value = false;

      await nextTick();

      configurarEmbedReporte();
    };

    watch(
      () => router.currentRoute.value.params.idMetrica,
      async (newIdMetrica) => {
        await buscarMetrica(newIdMetrica);
      }
    );

    return {
      // States
      infoMetricaSeleccionada,
      powerBiContainer,
      isEmbedLoaded,
      isFullScreen,
      pagesArray,
      cargando,
      // Methods
      fullScreenReport,
    };
  },
};
</script>
