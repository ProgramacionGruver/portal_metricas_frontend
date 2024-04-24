<template>
  <div class="contenedor-dashboard">
    <div class="contenedor-banner-fecha">
      <q-card class="card-banner">
        <q-card-section class="row no-wrap items-center">
          <div class="col">
            <h3 class="text-white">Buen día. Bienvenido(a) al portal de métricas.</h3>
            <h4 class="text-white">{{ usuarioAutenticado?.nombre }}</h4>
          </div>
          <div class="col-4">
            <q-img src="../../img/sensible.png" spinner-color="white" style="height: 150px; max-width: 150px" />
          </div>
        </q-card-section>
      </q-card>
      <div class="contenedor-date">
        <q-date style="height: 25rem;" v-model="date" :locale="myLocale" minimal />
      </div>

    </div>

  </div>
</template>

<script>
import { useAutenticacionStore } from 'src/stores/autenticaciones'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default {
  setup () {

    const useUsuario = useAutenticacionStore()
    const { usuarioAutenticado } = storeToRefs(useUsuario)


    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()

    return {
      buscar: ref(''),
      usuarioAutenticado,
      date: ref(`${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`),
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      },
      pagination: {
        sortBy: 'noEmpleado',
        descending: true
      },
    }
  }
}
</script>

<style scoped>

</style>
