<template>
  <q-layout class="q-pa-md">
    <div class="q-ma-md">
      <h2>Panel de Control</h2>
    </div>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="permisos">
      <div class="permisos__left q-ml-md">
        <div class="text-h4 q-mb-sm">Lista de módulos</div>
        <q-list>
          <template v-for="(modulo, index) in modulosFiltrados" :key="index">
            <q-item
              clickable
              v-ripple
              exact
              :active="moduloSeleccionado === modulo.name"
              active-class="my-menu-link"
              @click="seleccionarModulo(modulo.name)"
            >
              <q-item-section avatar>
                <q-icon :name="modulo.icono" />
              </q-item-section>
              <q-item-section
                style="
                  display: grid;
                  grid-template-columns: 1.5fr 0.5fr;
                  column-gap: 4rem;
                "
              >
                <div>
                  <span>{{ modulo.label }}</span>
                </div>
                <div style="position: relative">
                  <q-avatar
                    v-for="(usuario, index) in filtrarUsuariosModulo(
                      modulo.name,
                      false
                    )?.slice(0, 3)"
                    :key="index"
                    size="3rem"
                    :style="{ position: 'absolute', left: `${index * 1.5}rem` }"
                  >
                    <img :src="obtenerURLImage(usuario.numero_empleado)" />
                  </q-avatar>

                  <q-avatar
                    v-if="filtrarUsuariosModulo(modulo.name, false)?.length > 3"
                    size="3rem"
                    color="primary"
                    :style="{ position: 'absolute', left: '4.5rem' }"
                    class="text-white"
                  >
                    <span
                      >+{{
                        filtrarUsuariosModulo(modulo.name, false)?.length - 3
                      }}</span
                    >
                  </q-avatar>
                </div>
              </q-item-section>
            </q-item>
          </template>

          <div class="text-h4 q-mt-md">Lista de métricas</div>
          <template v-for="(metrica, index) in metricas" :key="index">
            <q-expansion-item
              :label="metrica.nombreCorto"
              :default-opened="false"
            >
              <template
                v-for="(grupo, subIndex) in metrica.grupos"
                :key="subIndex"
              >
                <q-expansion-item
                  class="q-ml-md"
                  :label="grupo.nombreGrupo"
                  :default-opened="false"
                >
                  <template
                    v-for="(metrica, metricaIndex) in grupo.metricas"
                    :key="metricaIndex"
                  >
                    <q-item
                      clickable
                      v-ripple
                      exact
                      :active="moduloSeleccionado === metrica.idMetrica"
                      active-class="my-menu-link"
                      class="q-ml-md"
                      @click="seleccionarModulo(metrica.idMetrica, true)"
                    >
                      <q-item-section avatar>
                        <q-icon :name="metrica.icono" />
                      </q-item-section>
                      <q-item-section
                        style="
                          display: grid;
                          grid-template-columns: 1.5fr 0.5fr;
                          column-gap: 4rem;
                        "
                      >
                        <div>
                          <span>{{ metrica.nombreMetrica }}</span>
                        </div>
                        <div style="position: relative">
                          <q-avatar
                            v-for="(usuario, index) in filtrarUsuariosModulo(
                              metrica.idMetrica,
                              true
                            )?.slice(0, 3)"
                            :key="index"
                            size="3rem"
                            :style="{
                              position: 'absolute',
                              left: `${index * 1.5}rem`,
                            }"
                          >
                            <img
                              :src="obtenerURLImage(usuario.numero_empleado)"
                            />
                          </q-avatar>

                          <q-avatar
                            v-if="
                              filtrarUsuariosModulo(metrica.idMetrica, true)
                                ?.length > 3
                            "
                            size="3rem"
                            color="primary"
                            :style="{ position: 'absolute', left: '4.5rem' }"
                            class="text-white"
                          >
                            <span
                              >+{{
                                filtrarUsuariosModulo(metrica.idMetrica, true)
                                  ?.length - 3
                              }}</span
                            >
                          </q-avatar>
                        </div>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-expansion-item>
              </template>
            </q-expansion-item>
          </template>
        </q-list>
      </div>
      <div class="permisos__right q-mr-md">
        <div class="column items-center align-center" v-if="cargando">
          <q-spinner size="200px" color="primary" />
          <p class="text-h5">Cargando usuarios, espere un momento...</p>
        </div>

        <q-table
          v-else
          grid
          flat
          bordered
          :rows="usuariosAcceso"
          :columns="columns"
          row
          key="nombre"
          :filter="buscarUsuario"
          hide-header
          :rows-per-page-options="[15]"
        >
          <template v-slot:top-right>
            <q-input
              outlined
              dense
              v-model="buscarUsuario"
              label="Buscar usuario"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Editar permisos"
              class="q-ml-md"
              @click="editarPermisos"
            />
          </template>

          <template v-slot:item="props">
            <div class="q-pa-sm col-md-4">
              <q-card style="height: 16rem; margin: 0.5rem">
                <q-card-section class="text-center">
                  <q-avatar size="6rem" class="q-mt-md">
                    <img :src="obtenerURLImage(props.row.numero_empleado)" />
                  </q-avatar>
                </q-card-section>

                <q-card-section>
                  <p
                    style="
                      font-size: small;
                      font-weight: bold;
                      margin-bottom: 0.5rem;
                      text-align: center;
                    "
                  >
                    {{ props.row.nombre }}
                  </p>
                  <p
                    style="
                      font-size: small;
                      margin-bottom: 0;
                      text-align: center;
                    "
                  >
                    {{ props.row.usuario }}
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <ModalEditarPermisos ref="modalPermisos"></ModalEditarPermisos>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { useModulosStore } from "src/stores/permisosModulos";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { obtenerURLImage } from "src/helpers/abrirURL.js";
import { useMetricasStore } from "src/stores/metricas";
import ModalEditarPermisos from "../../components/ModalEditarPermisos.vue";

export default {
  components: {
    ModalEditarPermisos,
  },
  setup() {
    const useModulos = useModulosStore();
    const { obtenerUsuariosModulo } = useModulos;
    const { usuariosModulos, usuariosAcceso, filtroUsuariosAcceso } =
      storeToRefs(useModulos);

    const useMetricas = useMetricasStore();
    const {
      obtenerTodasMetricas,
      obtenerPermisosModulosTodos,
      obtenerPermisosMetricasTodos,
    } = useMetricas;
    const { metricas, usuariosPermisoModulos, usuariosPermisoMetricas } =
      storeToRefs(useMetricas);

    const router = useRouter();

    const buscarUsuario = ref("");
    const modulosFiltrados = ref([]);
    const moduloSeleccionado = ref(null);

    const modalPermisos = ref(false);

    const columns = [
      {
        name: "nombre",
        label: "Nombre",
        field: "nombre",
      },
      {
        name: "usuario",
        label: "Usuario",
        field: "usuario",
      },
    ];

    const cargando = ref(false);

    onMounted(async () => {
      cargando.value = true;
      modulosFiltrados.value = router.options.routes
        .find((route) => route.name === "principal")
        .children.filter((route) => route.name !== "dashboard");

      if (metricas.value.length === 0) {
        await obtenerTodasMetricas();
      }

      await obtenerPermisosModulosTodos();
      await obtenerPermisosMetricasTodos();
      await obtenerUsuariosModulo();
      cargando.value = false;
    });

    const seleccionarModulo = (modulo, esMetricas = false) => {
      if (moduloSeleccionado.value === modulo) {
        moduloSeleccionado.value = "";
        usuariosAcceso.value = [...filtroUsuariosAcceso.value.map((usuario) => usuario.value)];
      } else {
        moduloSeleccionado.value = modulo;
        if (esMetricas) {
          usuariosAcceso.value = filtrarUsuariosModulo(modulo, true);
        } else {
          usuariosAcceso.value = filtrarUsuariosModulo(modulo, false);
        }
      }
    };

    const editarPermisos = () => {
      modalPermisos.value.abrir();
    };

    const filtrarUsuariosModulo = (modulo, esMetricas = false) => {
      if (esMetricas) {
        return usuariosPermisoMetricas.value.filter((usuario) =>
          usuario.permisosMetricas?.some(
            (permiso) => permiso.idMetrica === modulo
          )
        );
      } else {
        return usuariosPermisoModulos.value.filter((usuario) =>
          usuario.permisosModulos?.some(
            (permiso) => permiso.nombreModulo === modulo
          )
        );
      }
    };

    return {
      // States / Vars
      modulosFiltrados,
      usuariosModulos,
      usuariosAcceso,
      moduloSeleccionado,
      columns,
      buscarUsuario,
      modalPermisos,
      cargando,
      usuariosPermisoMetricas,
      usuariosPermisoModulos,
      metricas,
      // Methods
      obtenerURLImage,
      seleccionarModulo,
      editarPermisos,
      filtrarUsuariosModulo,
    };
  },
};
</script>

<style lang="sass" scoped>
.permisos
  display: grid
  gap: 1rem
  grid-template-columns: 0.8fr 1.2fr

.q-card__section--vert
  padding: 0.5rem 0 0.5rem 0
</style>
