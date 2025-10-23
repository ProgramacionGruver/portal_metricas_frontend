<template>
  <q-layout class="q-pa-md">
    <div class="q-ma-md">
      <h2>Panel de Control</h2>
    </div>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="permisos">
      <div class="permisos__left q-ml-md">
        <div class="text-h4 q-mb-sm">Lista de modulos</div>
        <q-list>
          <template v-for="(modulo, index) in modulosFiltrados" :key="index">
            <q-expansion-item
              v-if="modulo.children"
              :label="modulo.label"
              :default-opened="false"
            >
              <template v-for="(departamento, index) in modulo.children" :key="index">
                <q-expansion-item
                  :label="departamento.label"
                  :default-opened="false"
                  class="q-ml-lg"
                >
                  <template
                    v-for="(children, index) in departamento.children"
                    :key="index"
                  >
                    <q-item
                      clickable
                      v-ripple
                      exact
                      :active="moduloSeleccionado === children.name"
                      active-class="my-menu-link"
                      class="q-ml-xl"
                      @click="seleccionarModulo(children.name)"
                    >
                      <q-item-section avatar>
                        <q-icon :name="children.icono" />
                      </q-item-section>
                      <q-item-section
                        style="
                          display: grid;
                          grid-template-columns: 1.5fr 0.5fr;
                          column-gap: 4rem;
                        "
                      >
                        <div>
                          <span>{{ children.label }}</span>
                        </div>
                        <div style="position: relative">
                          <q-avatar
                            v-for="(usuario, index) in usuariosModulos[
                              children.name
                            ]?.slice(0, 3)"
                            :key="index"
                            size="3rem"
                            :style="{ position: 'absolute', left: `${index * 1.5}rem` }"
                          >
                            <img :src="obtenerURLImage(usuario.numero_empleado)" />
                          </q-avatar>

                          <q-avatar
                            v-if="usuariosModulos[children.name]?.length > 3"
                            size="3rem"
                            color="primary"
                            :style="{ position: 'absolute', left: '4.5rem' }"
                            class="text-white"
                          >
                            <span>+{{ usuariosModulos[children.name]?.length - 3 }}</span>
                          </q-avatar>
                        </div>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-expansion-item>
              </template>
            </q-expansion-item>

            <q-item
              v-else
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
                    v-for="(usuario, index) in usuariosModulos[modulo.name]?.slice(0, 3)"
                    :key="index"
                    size="3rem"
                    :style="{ position: 'absolute', left: `${index * 1.5}rem` }"
                  >
                    <img :src="obtenerURLImage(usuario.numero_empleado)" />
                  </q-avatar>

                  <q-avatar
                    v-if="usuariosModulos[modulo.name]?.length > 3"
                    size="3rem"
                    color="primary"
                    :style="{ position: 'absolute', left: '4.5rem' }"
                    class="text-white"
                  >
                    <span>+{{ usuariosModulos[modulo.name]?.length - 3 }}</span>
                  </q-avatar>
                </div>
              </q-item-section>
            </q-item>
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
            <q-input outlined dense v-model="buscarUsuario" label="Buscar usuario">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Editar permisos"
              class="q-ml-md"
              @click="editarPermisos()"
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
                  <p style="font-size: small; margin-bottom: 0; text-align: center">
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
import ModalEditarPermisos from "../../components/ModalEditarPermisos.vue";

export default {
  components: {
    ModalEditarPermisos,
  },
  setup() {
    const useModulos = useModulosStore();
    const { obtenerUsuariosModulo } = useModulos;
    const {
      usuariosModulos,
      usuariosAcceso,
      filtroUsuariosAcceso,
      listaModulos,
    } = storeToRefs(useModulos);

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
      listaModulos.value = listaModulos.value.filter(
        (modulo) => modulo.name !== "dashboard"
      );
      modulosFiltrados.value = listaModulos.value;

      await obtenerUsuariosModulo();
      cargando.value = false;
    });

    const seleccionarModulo = (modulo) => {
      if (moduloSeleccionado.value === modulo) {
        moduloSeleccionado.value = "";
        usuariosAcceso.value = [...filtroUsuariosAcceso.value];
      } else {
        moduloSeleccionado.value = modulo;
        usuariosAcceso.value = usuariosModulos.value[modulo];
      }
    };

    const editarPermisos = () => {
      modalPermisos.value.abrir();
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
      // Methods
      obtenerURLImage,
      seleccionarModulo,
      editarPermisos,
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
