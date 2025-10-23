<template>
  <q-scroll-area
    :thumb-style="{
      right: '2px',
      backgroundColor: 'primary',
      borderRadius: '5px',
      width: '5px',
      opacity: 0.5
    }"
    :bar-style="{
      right: '2px',
      backgroundColor: 'primary',
      borderRadius: '9px',
      width: '9px',
      opacity: 0.2
    }"
    style="height: 80%; max-width: 100%;"
  >
    <q-list>
      <template v-for="(menuItem, index) in menulist" :key="index">
        <q-expansion-item
          v-if="menuItem.children"
          :label="menuItem.label"
          :default-opened="false"
        >
          <template v-for="(departamento, index) in menuItem.children" :key="index">
            <q-expansion-item :label="departamento.label" :default-opened="false" class="q-ml-lg">
              <template v-for="(children, index) in departamento.children" :key="index">
                <q-item
                clickable
                v-ripple
                :to="{ name: children.name }"
                exact
                active-class="my-menu-link"
                class="q-ml-xl"
                :disable="!habilitarNavegacionPortal"
                >
                  <q-item-section avatar>
                    <q-icon :name="children.icono" />
                  </q-item-section>
                  <q-item-section>
                      {{ children.label }}
                  </q-item-section>
                </q-item>
              </template>
            </q-expansion-item>
          </template>
        </q-expansion-item>

        <q-item v-else clickable v-ripple :to="{ name: menuItem.name }" exact active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon :name="menuItem.icono" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAutenticacionStore } from 'src/stores/autenticaciones'
import { usePowerBiStore } from 'src/stores/powerbi'
import { useModulosStore } from 'src/stores/permisosModulos'

const menulist = ref([])
const router = useRouter()

const useUsuario = useAutenticacionStore()
const { usuarioAutenticado } = storeToRefs(useUsuario)

const usePowerBi = usePowerBiStore()
const { habilitarNavegacionPortal } = storeToRefs(usePowerBi)

const useModulos = useModulosStore()
const { obtenerPermisosByUsuario } = useModulos
const { permisoPanelControl, tickedSeleccionados, listaModulos } = storeToRefs(useModulos)

onMounted(async () => {
  menulist.value = router.options.routes
    .find((r) => {
      return r.name === 'principal'
    })
    .children

    listaModulos.value = JSON.parse(JSON.stringify(menulist.value));

    await obtenerPermisosByUsuario(usuarioAutenticado.value)

    menulist.value = menulist.value.filter((modulo) => {
      if (modulo.name === 'dashboard') {
        return true
      }

      if (modulo.children) {
        modulo.children = modulo.children.filter((departamento) => {
          if (departamento.children) {
            departamento.children = departamento.children.filter((children) => {
              return tickedSeleccionados.value.includes(children.name)
            })
            return departamento.children.length > 0
          } else {
            return tickedSeleccionados.value.includes(departamento.name)
          }
        })
        return modulo.children.length > 0
      } else {
        return tickedSeleccionados.value.includes(modulo.name)
      }
    })

  if (router.currentRoute.value.name === 'principal') {
    router.replace({ name: 'dashboard' })
  }
})
</script>

<style lang="sass" scope>
.my-menu-link
  color: white
  background: $primary
</style>
