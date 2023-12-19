<template>
  <q-list>
    <div class="q-px-md q-py-md text-h4">
        Dashboard
      </div>
      <q-separator />
    <template v-for="(menuItem, index) in menulist" :key="index">
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

     <div v-if="menulist[index+1]?.name === 'etiquetas'">
          <div class="q-px-md q-py-md q-mt-md text-h4">
            Catalogo
          </div>
          <q-separator />
     </div>

    </template>
  </q-list>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAutenticacionStore } from 'src/stores/autenticaciones'
import { usuariosEditan } from 'src/constant/constant'

const menulist = ref([])
const router = useRouter()

const useUsuario = useAutenticacionStore()
const { usuarioAutenticado } = storeToRefs(useUsuario)

onMounted(() => {
menulist.value = router.options.routes
  .find((r) => {
    return r.name === 'principal'
  })
  .children
  
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
