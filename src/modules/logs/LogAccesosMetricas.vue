<template>
  <q-layout class="q-pa-md">
    <div class="q-ma-md">
      <h2>Log de últimas consultas a métricas</h2>
    </div>
    <q-separator color="primary" class="q-my-md" inset />
    <q-table class="sticky-movimiento tabla--paginada" table-header-class="bg-primary text-white text-bold"
      color="primary" :columns="columns" :filter="buscar" row-key="idAcceso" hide-bottom
      v-bind:pagination="paginacionLog" :rows="logMetricasFiltrados" :loading="cargandoLog">
      <template v-slot:loading>
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: auto;
            padding: 1rem 0;
          ">
          <q-spinner-ios color="primary" size="100px" class="q-mb-md" />
          <span class="text-h4">Cargando...</span>
        </div>
      </template>

      <template v-slot:top>
        <div class="fit row q-mb-sm justify-end">
          <q-input color="blue" dense outlined v-model="buscar" placeholder="Buscar" class="col" debounce="400"
            :disable="cargandoLog" @update:model-value="filtrar(filtroActual, 1)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-input dense type="date" outlined v-model="fechas.fechaInicio" placeholder="Fecha Inicio"
            class="col-auto q-ml-sm" debounce="400" :disable="cargandoLog" @update:model-value="setearFechaFin">
          </q-input>
          <q-input dense type="date" outlined v-model="fechas.fechaFin" placeholder="Fecha Fin" class="col-auto q-ml-sm"
            debounce="400" :disable="cargandoLog" @update:model-value="filtrar(filtroActual, 1)">
          </q-input>
        </div>
        <div class="filtros">
          <q-btn-dropdown dense outline class="col q-my-sm" color="grey" label="Empresas"
            :disable="cargandoLog || empresasFiltradas.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todasEmpresasSeleccionadas" v-model="todasEmpresasSeleccionadas"
              label="Todas" @update:model-value="filtrar('TODASEMPRESAS')" />
            <q-separator class="q-mx-md bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="empresasFiltradas" v-model="modelEmpresasSeleccionadas"
              @update:model-value="filtrar('OPCIONESEMPRESAS')" type="checkbox" />
          </q-btn-dropdown>
          <q-btn-dropdown dense outline class="col q-my-sm" color="grey" label="Sucursales"
            :disable="cargandoLog || sucursalesFiltradas.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todasSucursalesSeleccionadas"
              v-model="todasSucursalesSeleccionadas" label="Todas" @update:model-value="filtrar('TODASSUCURSALES')" />
            <q-separator class="q-mx-sm bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="sucursalesFiltradas" v-model="modelSucursalesSeleccionadas"
              @update:model-value="filtrar('OPCIONESSUCURSALES')" type="checkbox" />
          </q-btn-dropdown>
          <q-btn-dropdown dense outline class="col q-my-sm" color="grey" label="Departamentos"
            :disable="cargandoLog || departamentosFiltrados.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todosDepartamentosSeleccionados"
              v-model="todosDepartamentosSeleccionados" label="Todos"
              @update:model-value="filtrar('TODOSDEPARTAMENTOS')" />
            <q-separator class="q-mx-sm bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="departamentosFiltrados"
              v-model="modelDepartamentosSeleccionados" @update:model-value="filtrar('OPCIONESDEPARTAMENTOS')"
              type="checkbox" />
          </q-btn-dropdown>
          <q-btn-dropdown outline class="col" color="grey" label="Puestos" :disable="listaPuestos?.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todosPuesto" v-model="todosPuesto" label="Todos"
              @update:model-value="filtrar('TODOSPUESTOS')" />
            <q-separator class="q-mx-md bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="listaPuestos" v-model="puestosSeleccionados"
              @update:model-value="filtrar('OPCIONESPUESTOS')" type="checkbox" />
          </q-btn-dropdown>
          <q-btn-dropdown outline class="col" color="grey" label="Acciones" :disable="catalogoAcciones?.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todasAcciones" v-model="todasAcciones" label="Todos"
              @update:model-value="filtrar('TODASACCIONES')" />
            <q-separator class="q-mx-md bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="catalogoAcciones" v-model="accionesSeleccionadas"
              @update:model-value="filtrar('OPCIONESACCIONES')" type="checkbox" />
          </q-btn-dropdown>
          <q-btn-dropdown outline class="col" color="grey" label="Métricas" :disable="metricasOpciones?.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todasMetricas" v-model="todasMetricas" label="Todos"
              @update:model-value="filtrar('TODASMETRICAS')" />
            <q-separator class="q-mx-md bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="metricasOpciones" v-model="metricasSeleccionadas"
              @update:model-value="filtrar('OPCIONESMETRICAS')" type="checkbox" />
          </q-btn-dropdown>
        </div>
      </template>
    </q-table>
    <q-card v-if="logMetricasFiltrados.length === 0 && !cargandoLog"
      class="q-pa-md flex flex-center column tabla--paginada">
      <q-icon name="dangerous" color="red" size="100px" />
      <h3>No se encontraron registros de acceso a métricas con los filtros seleccionados.</h3>
    </q-card>
    <div v-else class="control--tabla q-mb-md">
      <q-btn v-if="paginacionLog.page > 1" icon="first_page" color="gray" round dense flat
        :disable="paginacionLog.page === 1 || cargandoLog" @click="filtrar(filtroActual, 1)" />

      <q-btn v-if="paginacionLog.page > 1" icon="chevron_left" color="gray" round dense flat
        :disable="paginacionLog.page === 1 || cargandoLog" @click="filtrar(filtroActual, paginacionLog.page - 1)" />

      <span class="q-mx-md text-bold">
        Página {{ paginacionLog?.page }} de
        {{ paginacionLog?.pagesNumber }}
      </span>

      <q-btn v-if="paginacionLog.page < paginacionLog.pagesNumber" icon="chevron_right" color="gray" round dense flat
        :disable="paginacionLog.page === paginacionLog.pagesNumber || cargandoLog"
        @click="filtrar(filtroActual, paginacionLog.page + 1)" />

      <q-btn v-if="paginacionLog.page < paginacionLog.pagesNumber" icon="last_page" color="gray" round dense flat
        :disable="paginacionLog.page === paginacionLog.pagesNumber || cargandoLog"
        @click="filtrar(filtroActual, paginacionLog.pagesNumber)" />
    </div>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useDepartamentosStore } from "src/stores/departamentos";
import { useEmpresasStore } from "src/stores/empresas";
import { useMetricasStore } from "src/stores/metricas";
import { usePuestosStore } from "src/stores/puestos";
import { useSucursalesStore } from "src/stores/sucursales";
import { notificacion } from "src/helpers/mensajes";
import { filtrarOpciones } from "src/helpers/filtros";
import { formatearHora } from "src/helpers/formatearFecha";

export default {
  setup() {
    const useMetricas = useMetricasStore();
    const { metricasOpciones, cargandoLog, logMetricas, logMetricasFiltrados, paginacionLog, catalogoAcciones } = storeToRefs(useMetricas);
    const { obtenerTodasMetricas, obtenerLog, obtenerCatalogoAcciones } = useMetricas;

    const useEmpresas = useEmpresasStore()
    const {
      primeraCarga,
      listaClavesEmpresas,
      empresasFiltradas,
      modelEmpresasSeleccionadas,
      todasEmpresasSeleccionadas
    } = storeToRefs(useEmpresas)
    const { obtenerEmpresass } = useEmpresas

    const useSucursales = useSucursalesStore()
    const {
      listaClavesSucursales,
      sucursales,
      sucursalesFiltradas,
      modelSucursalesSeleccionadas,
      todasSucursalesSeleccionadas
    } = storeToRefs(useSucursales)
    const { obtenerSucursales } = useSucursales

    const useDepartamentos = useDepartamentosStore()
    const {
      listaClavesDepartamentos,
      departamentos,
      departamentosFiltrados,
      modelDepartamentosSeleccionados,
      todosDepartamentosSeleccionados
    } = storeToRefs(useDepartamentos)
    const { obtenerDepartamentos } = useDepartamentos

    const usePuestos = usePuestosStore();
    const { listaPuestos, listaClavePuestos } = storeToRefs(usePuestos);
    const { obtenerPuestos } = usePuestos;

    const todasAcciones = ref(true);
    const accionesSeleccionadas = ref([]);

    const todosPuesto = ref(true);
    const puestosSeleccionados = ref([]);

    const todasMetricas = ref(true);
    const metricasSeleccionadas = ref([]);

    const fechas = ref({
      fechaInicio: null,
      fechaFin: null,
    });

    const columns = [
      {
        name: "noEmpleado",
        label: "No. Empleado",
        align: "center",
        field: (informacionAcceso) => informacionAcceso.usuario.numero_empleado,
      },
      {
        name: "usuario",
        label: "Usuario",
        align: "center",
        field: (informacionAcceso) => informacionAcceso.usuario.usuario,
        sortable: true,
      },
      {
        name: "nombre",
        label: "Nombre",
        align: "center",
        field: (informacionAcceso) => informacionAcceso.usuario.nombre,
        sortable: true,
      },
      {
        name: "puesto",
        label: "Puesto",
        align: "center",
        field: (informacionAcceso) => informacionAcceso.usuario.puesto,
      },
      {
        name: "metrica",
        label: "Métrica",
        align: "center",
        field: (informacionAcceso) =>
          `${informacionAcceso.metrica.empresa.nombreCorto} -> ${informacionAcceso.metrica.grupo.nombreGrupo} -> ${informacionAcceso.metrica.nombreMetrica}`,
      },
      {
        name: "accion",
        label: "Acción",
        align: "center",
        field: (informacionAcceso) =>
          informacionAcceso.catalogo_accione.nombreAccion,
      },
      {
        name: "fechaAcceso",
        label: "Fecha de Acceso",
        align: "center",
        field: (informacionAcceso) =>
          formatearHora(informacionAcceso.createdAt),
        sortable: true,
      },
    ];

    const buscar = ref("")

    const filtroActual = ref("")

    onMounted(async () => {
      const fechaHoy = new Date();
      const fechaHace7Dias = new Date();
      fechaHace7Dias.setDate(fechaHoy.getDate() - 7);
      fechas.value.fechaInicio = fechaHace7Dias.toISOString().split("T")[0];
      fechas.value.fechaFin = fechaHoy.toISOString().split("T")[0];

      if (primeraCarga.value) {
        primeraCarga.value = false;

        await obtenerEmpresass();
        await obtenerSucursales();
        await obtenerDepartamentos();
        await obtenerPuestos();
        await obtenerCatalogoAcciones();
      }

      if (metricasOpciones.value.length === 0) {
        await obtenerTodasMetricas();
      }

      await filtrar("TODASEMPRESAS");
    });

    const filtrar = async (tipoFiltro, pagina = null) => {
      if (fechas.value.fechaInicio && fechas.value.fechaFin) {
        const fechaInicio = new Date(fechas.value.fechaInicio);
        const fechaFin = new Date(fechas.value.fechaFin);

        if (fechaInicio > fechaFin) {
          notificacion("warning", "La fecha de inicio no puede ser mayor a la fecha fin.");
          return;
        }

        cargandoLog.value = true;
        filtroActual.value = tipoFiltro;
        logMetricasFiltrados.value = [];

        filtrarOpciones(
          tipoFiltro,
          listaClavesEmpresas,
          todasEmpresasSeleccionadas,
          modelEmpresasSeleccionadas,
          sucursales,
          sucursalesFiltradas,
          listaClavesSucursales,
          todasSucursalesSeleccionadas,
          modelSucursalesSeleccionadas,
          departamentos,
          departamentosFiltrados,
          listaClavesDepartamentos,
          todosDepartamentosSeleccionados,
          modelDepartamentosSeleccionados,
          todosPuesto,
          puestosSeleccionados,
          todasAcciones,
          accionesSeleccionadas,
          todasMetricas,
          metricasSeleccionadas
        )

        const filtrosObj = {
          busqueda: buscar.value,
          empresas: modelEmpresasSeleccionadas.value,
          sucursales: modelSucursalesSeleccionadas.value,
          departamentos: modelDepartamentosSeleccionados.value,
          fechas: fechas.value,
          puestos: puestosSeleccionados.value.map(puesto => puesto.nombrePuesto),
          acciones: accionesSeleccionadas.value,
          metricas: metricasSeleccionadas.value,
        }

        if (pagina) {
          paginacionLog.value.page = pagina
        } else {
          paginacionLog.value.page = 1
        }

        await obtenerLog(filtrosObj);

        cargandoLog.value = false;
      }
    }

    const setearFechaFin = () => {
      if (fechas.value.fechaInicio) {
        fechas.value.fechaFin = null;
      }
    }

    return {
      // States
      columns,
      logMetricasFiltrados,
      cargandoLog,
      buscar,
      fechas,
      paginacionLog,
      todasAcciones,
      accionesSeleccionadas,
      todosPuesto,
      puestosSeleccionados,
      empresasFiltradas,
      modelEmpresasSeleccionadas,
      todasEmpresasSeleccionadas,
      sucursalesFiltradas,
      modelSucursalesSeleccionadas,
      todasSucursalesSeleccionadas,
      departamentosFiltrados,
      modelDepartamentosSeleccionados,
      todosDepartamentosSeleccionados,
      catalogoAcciones,
      listaPuestos,
      todasMetricas,
      metricasSeleccionadas,
      metricasOpciones,
      // Methods
      filtrar,
      setearFechaFin,
    };
  },
};
</script>
