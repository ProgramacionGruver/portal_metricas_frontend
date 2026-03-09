<template>
  <div v-if="estaActualizado" class="fit row justify-center items-center bg-grey-4" style="width: 100vw !important; height: 100vh !important">
    <PanelActualizacion />
  </div>
  <div
    v-else-if="cargando"
    class="fit column justify-center items-center"
    style="width: 100%; height: 100vh !important"
  >
    <q-spinner-ios size="200px" color="primary" />
    <div class="text-h2 q-mt-xl q-mr-md q-ml-md text-center cargando--animado">
      Obteniendo la información del portal, espere un momento
    </div>
  </div>
  <q-layout v-else view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-avatar class="bg-white q-ml-sm">
          <img src="../img/logog.png" class="q-pa-xs" />
        </q-avatar>

        <q-toolbar-title> Portal Métricas </q-toolbar-title>

        <div>
          <q-btn
            flat
            round
            dense
            icon="info"
            @click="solicitarAcceso"
            :class="mostrar ? 'boton--info' : ''"
          >
            <q-tooltip style="font-size: 12px" v-if="!mostrar">
              Si necesitas acceso a alguna métrica, haz clic aquí
            </q-tooltip>
          </q-btn>
          <div class="custom--tooltip" v-if="mostrar">
            Si necesitas acceso a alguna métrica, haz clic aquí
          </div>
        </div>
        <q-btn flat @click="logout"> Cerrar sesión</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="270"
    >
      <div class="contenedor-perfil">
        <div
          style="background-color: rgba(0, 0, 0, 0.5)"
          class="q-px-md q-py-sm"
        >
          <div style="display: flex; justify-content: center">
            <q-avatar size="7rem">
              <q-img
                :src="calcularURLFoto(usuarioAutenticado?.numero_empleado)"
                spinner-color="white"
              />
            </q-avatar>
          </div>
          <div style="display: flex; justify-content: center">
            {{ usuarioAutenticado?.nombre }}
          </div>
        </div>
      </div>
      <NavBar></NavBar>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <ModalSolicitarAcceso ref="modalSolicitarAcceso" />
  </q-layout>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAutenticacionStore } from "src/stores/autenticaciones";
import { usePowerBiStore } from "src/stores/powerbi";
import { useMetricasStore } from "src/stores/metricas";
import NavBar from "src/components/NavBar.vue";
import ModalSolicitarAcceso from "src/components/ModalSolicitarAcceso.vue";
import { useActualizacionesStore } from "src/stores/actualizaciones";
import PanelActualizacion from "src/components/PanelActualizacion.vue";

export default {
  components: {
    NavBar,
    ModalSolicitarAcceso,
    PanelActualizacion,
  },
  setup() {
    const useUsuario = useAutenticacionStore();
    const { cerrarSesion } = useUsuario;
    const { usuarioAutenticado } = storeToRefs(useUsuario);

    const usePowerBi = usePowerBiStore();
    const { obtenerAccessToken } = usePowerBi;

    const useMetricas = useMetricasStore();
    const { metricas, permisosModulos, permisosMetricas } = storeToRefs(useMetricas);
    const { obtenerTodasMetricas, obtenerPermisosModulosByNumeroEmpleado, obtenerPermisosMetricasByNumeroEmpleado } = useMetricas;

    const useActualzaciones = useActualizacionesStore();
    const { estaActualizado } = storeToRefs(useActualzaciones);
    const { validarActualizacionPortal, marcarUsuarioActualizado } = useActualzaciones;

    const leftDrawerOpen = ref(false);
    const router = useRouter();

    const modalSolicitarAcceso = ref(null);

    const cargando = ref(false);
    const mostrar = ref(true);
    const moduloActual = ref(router.currentRoute.value.name);

    const logout = () => {
      router.push("/");
      cerrarSesion();
    };

    onMounted(async () => {
      const actualizacionData = {
        fecha: new Date().toISOString().split("T")[0], // Solo la fecha en formato YYYY-MM-DD
        numeroEmpleado: usuarioAutenticado.value.numero_empleado,
      }

      await validarActualizacionPortal(actualizacionData);
      await marcarUsuarioActualizado(actualizacionData);

      cargando.value = true;

      if (metricas.value.length === 0) {
        await obtenerTodasMetricas();
      }

      if (permisosModulos.value.length === 0) {
        await obtenerPermisosModulosByNumeroEmpleado(usuarioAutenticado.value.numero_empleado);
      }

      if (permisosMetricas.value.length === 0) {
        await obtenerPermisosMetricasByNumeroEmpleado(usuarioAutenticado.value.numero_empleado);
      }

      await obtenerAccessToken(1);
      await obtenerAccessToken(2);
      validarRuta(moduloActual.value);

      cargando.value = false;
    });

    const calcularURLFoto = (numeroEmpleado) => {
      const idFormateado = String(numeroEmpleado).padStart(7, "0");
      const url = `https://backend.gruver.com.mx/rh/api/fotos/${idFormateado}.jpg`;
      return url;
    };

    const solicitarAcceso = async () => {
      modalSolicitarAcceso.value.abrir();
    };

    const validarRuta = (modulo) => {
      if (modulo === "dashboard") {
        mostrar.value = true;
      } else {
        mostrar.value = false;
      }
    };

    watch(
      () => router.currentRoute.value.name,
      (newValue) => {
        validarRuta(newValue);
      }
    );

    return {
      // States
      usuarioAutenticado,
      leftDrawerOpen,
      modalSolicitarAcceso,
      mostrar,
      cargando,
      estaActualizado,
      // Methods
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      calcularURLFoto,
      solicitarAcceso,
    };
  },
};
</script>
