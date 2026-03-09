<template>
  <div class="fit column justify-center items-center q-pa-md">
    <q-card flat bordered class="panel-actualizacion full-width">
      <q-card-section class="bg-info text-white">
        <div class="row items-center no-wrap q-gutter-sm text-h4">
          <q-icon name="campaign" size="24px" />
          <div>El portal ha sido actualizado</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-lg text-center">
        <div class="q-mb-sm">
          Como parte de nuestra mejora continua, realizamos actualizaciones importantes en el portal.
        </div>
        <div class="q-mb-md">
          Para aplicarlas correctamente, recarga la página y continúa trabajando con la versión más reciente.
        </div>

        <q-img
          class="imagen-recarga q-mb-md"
          src="https://backend.gruver.com.mx/portalGestorWebs/recargar.png"
          fit="contain"
        />

        <q-banner rounded class="bg-blue-1 text-blue-10 q-mt-md">
          <p class="text-h6 q-pa-none q-ma-none">Si ya tenías el portal abierto, la recarga asegura que veas todos los cambios.</p>
        </q-banner>
      </q-card-section>

      <q-card-section class="q-pt-sm text-center">
        El equipo de sistemas agradece tu comprensión.
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.panel-actualizacion {
  max-width: 880px;
  border-radius: 12px;
}

.imagen-recarga {
  max-width: 420px;
  margin: 0 auto;
}
</style>
