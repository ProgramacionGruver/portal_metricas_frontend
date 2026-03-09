<template>
  <q-scroll-area
    :thumb-style="{
      right: '2px',
      backgroundColor: 'primary',
      borderRadius: '5px',
      width: '5px',
      opacity: 0.5,
    }"
    :bar-style="{
      right: '2px',
      backgroundColor: 'primary',
      borderRadius: '9px',
      width: '9px',
      opacity: 0.2,
    }"
    style="height: 80%; max-width: 100%"
  >
    <q-list>
      <div v-if="menuListModulos.length > 0">
        <p class="q-pa-none q-ma-none q-ml-sm q-mt-md q-mb-sm text-h4">
          Módulos
        </p>
        <q-separator color="primary" />
      </div>

      <template v-for="(menuItem, index) in menuListModulos" :key="index">
        <q-item
          clickable
          v-ripple
          :to="{ name: menuItem.name }"
          exact
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icono" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </template>

      <div v-if="menuListMetricas.length > 0">
        <p class="q-pa-none q-ma-none q-ml-sm q-mt-md q-mb-sm text-h4">
          Métricas
        </p>
        <q-separator color="primary" />
      </div>

      <template v-for="(menuItem, index) in menuListMetricas" :key="index">
        <q-expansion-item :label="menuItem.label" :default-opened="false">
          <template
            v-for="(subMenuItem, subIndex) in menuItem.children"
            :key="subIndex"
          >
            <q-expansion-item
              class="q-ml-md"
              :label="subMenuItem.label"
              :default-opened="false"
            >
              <template
                v-for="(metrica, metricaIndex) in subMenuItem.children"
                :key="metricaIndex"
              >
                <q-item
                  clickable
                  v-ripple
                  :to="metrica.path"
                  exact
                  active-class="my-menu-link"
                  class="q-ml-md"
                >
                  <q-item-section avatar>
                    <q-icon :name="metrica.icono" />
                  </q-item-section>
                  <q-item-section>
                    {{ metrica.label }}
                  </q-item-section>
                </q-item>
              </template>
            </q-expansion-item>
          </template>
        </q-expansion-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAutenticacionStore } from "src/stores/autenticaciones";
import { usePowerBiStore } from "src/stores/powerbi";
import { useModulosStore } from "src/stores/permisosModulos";
import { useMetricasStore } from "src/stores/metricas";

const menuListModulos = ref([]);
const menuListMetricas = ref([]);
const router = useRouter();

const useUsuario = useAutenticacionStore();
const { usuarioAutenticado } = storeToRefs(useUsuario);

const usePowerBi = usePowerBiStore();
const { habilitarNavegacionPortal } = storeToRefs(usePowerBi);

const useModulos = useModulosStore();
const { obtenerPermisosByUsuario } = useModulos;
const { permisoPanelControl, tickedSeleccionados, listaModulos } =
  storeToRefs(useModulos);

const useMetricas = useMetricasStore();
const { metricas, permisosModulos, permisosMetricas } =
  storeToRefs(useMetricas);

onMounted(async () => {
  menuListModulos.value = router.options.routes
    .find((route) => route.name === "principal")
    .children.filter(
      (route) =>
        route.name === "dashboard" ||
        permisosModulos.value.some(
          (modulo) => modulo.nombreModulo === route.name
        )
    );

  menuListMetricas.value = metricas.value
    .map((empresa) => {
      return {
        label: empresa.nombreCorto,
        children: empresa.grupos
          .map((grupo) => {
            return {
              label: grupo.nombreGrupo,
              children: grupo.metricas
                .filter((metrica) =>
                  permisosMetricas.value.some(
                    (permiso) => permiso.idMetrica === metrica.idMetrica
                  )
                )
                .map((metrica) => ({
                  icono: metrica.icono,
                  label: metrica.nombreMetrica,
                  name: "vistaMetrica",
                  path: `/metrica/${empresa.claveEmpresa}/${grupo.idGrupo}/${metrica.idMetrica}`,
                })),
            };
          })
          .filter((grupo) => grupo.children.length > 0),
      };
    })
    .filter((empresa) => empresa.children.length > 0);

  if (router.currentRoute.value.name === "principal") {
    router.replace({ name: "dashboard" });
  }
});
</script>

<style lang="sass" scope>
.my-menu-link
  color: white
  background: $primary
</style>
