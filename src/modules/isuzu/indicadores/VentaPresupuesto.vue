<template>
  <q-layout class="q-pa-md">
    <div class="q-ma-md" style="display: flex; justify-content: space-between; align-items: center;">
      <h2>Venta vs Presupuesto</h2>
      <q-btn
        round
        color="primary"
        :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
        :disable="!isEmbedLoaded"
        @click="fullScreenReport"
      >
      <q-tooltip>
        {{ isFullScreen ? 'Salir de pantalla completa' : 'Pantalla completa' }}
      </q-tooltip>
    </q-btn>
    </div>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="contenedorMetrica">
      <!-- <div class="superposicionFramePb"></div> -->
      <div ref="powerBiContainer" style="height: 90vh;"></div>
    </div>
  </q-layout>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as pbi from 'powerbi-client';
import { usePowerBiStore } from 'src/stores/powerbi';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const powerBiContainer = ref(null);
    let powerbi
    let pagesArray = []
    let reporteEmbed
    const isFullScreen = ref(false)
    const isEmbedLoaded = ref(false)

    const usePowerBi = usePowerBiStore()
    const { obtenerDatosMetrica, obtenerEmbedToken } = usePowerBi
    const { embedToken, infoMetricaSeleccionada, cuentaSeleccionada } = storeToRefs(usePowerBi)

    onMounted(async () => {
      powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory)

      await obtenerDatosMetrica(86)
      await obtenerEmbedToken(infoMetricaSeleccionada.value.idGrupoPB, infoMetricaSeleccionada.value.idMetricaPB, 2)
      configurarEmbedReporte(infoMetricaSeleccionada.value)
    })

    const configurarEmbedReporte = (objReporte) => {
      const config = {
        type: 'report',
        // tokenType: pbi.models.TokenType.Embed,
        accessToken: cuentaSeleccionada.value.value.token,
        embedUrl: embedToken.value.embedUrl,
        id: embedToken.value.id,
        permissions: pbi.models.Permissions.All,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: true,
          layoutType: pbi.models.LayoutType.Custom,
          customLayout: {
            displayOption: pbi.models.DisplayOption.FitToWidth
          }
        }
      }

      reporteEmbed = powerbi.embed(powerBiContainer.value, config)
      reporteEmbed.on('loaded', () => {
        isEmbedLoaded.value = true
        pagesArray = reporteEmbed.getPages()
      })
    }

    const fullScreenReport = () => {
      if (isFullScreen.value) {
        reporteEmbed.exitFullscreen()
      } else {
        reporteEmbed.fullscreen()
      }
      isFullScreen.value = !isFullScreen.value
    }

    return {
      powerBiContainer,
      isEmbedLoaded,
      isFullScreen,
      pagesArray,
      fullScreenReport,
    }
  }
}

</script>
