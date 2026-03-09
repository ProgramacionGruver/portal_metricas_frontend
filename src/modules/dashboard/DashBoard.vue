<template>
  <div class="contenedor-dashboard q-mt-md">
    <div class="contenedor-banner-fecha">
      <q-card class="card-banner">
        <div class="col">
          <h3 class="text-white">Bienvenido(a)</h3>
          <h4 class="text-white">{{ usuarioAutenticado?.nombre }}</h4>
        </div>
        <div style="height: 180px; max-width: 180px">
          <img
            src="../../img/sensible.png"
            spinner-color="white"
            style="height: 100%; width: 100%"
          />
        </div>
      </q-card>
      <q-date
        v-model="date"
        :locale="myLocale"
        landscape
        class="card-calendar"
      />
    </div>
  </div>
</template>

<script>
import { useAutenticacionStore } from "src/stores/autenticaciones";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  setup() {
    const useUsuario = useAutenticacionStore();
    const { usuarioAutenticado } = storeToRefs(useUsuario);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return {
      buscar: ref(""),
      usuarioAutenticado,
      date: ref(
        `${year}/${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}`
      ),
      myLocale: {
        /* starting with Sunday */
        days: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
        daysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
        months:
          "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
          ),
        monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split(
          "_"
        ),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: "dias",
      },
      pagination: {
        sortBy: "noEmpleado",
        descending: true,
      },
    };
  },
};
</script>

<style scoped></style>
