<template>
  <q-layout class="q-pa-md">
    <div class="q-ma-md">
      <h2>Log de últimos accesos al portal</h2>
    </div>
    <q-separator color="primary" class="q-my-md" inset />
    <q-table class="sticky-movimiento tabla--paginada" color="primary" :columns="columns"
      :filter="buscar" row-key="idAcceso" hide-bottom v-bind:pagination="paginacionAccesos" :rows="accesosFiltrados"
      :loading="cargandoAccesos || accesosFiltrados.length === 0">
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
            :disable="cargandoAccesos || accesosFiltrados.length === 0" @update:model-value="filtrar(filtroActual, 1)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-input dense type="date" outlined v-model="fechas.fechaInicio" placeholder="Fecha Inicio" class="col-auto q-ml-sm" debounce="400"
            :disable="cargandoAccesos || accesosFiltrados.length === 0" @update:model-value="setearFechaFin">
          </q-input>
          <q-input dense type="date" outlined v-model="fechas.fechaFin" placeholder="Fecha Fin" class="col-auto q-ml-sm" debounce="400"
            :disable="cargandoAccesos || accesosFiltrados.length === 0" @update:model-value="filtrar(filtroActual, 1)">
          </q-input>
        </div>
        <div class="filtros">
          <q-btn-dropdown dense outline class="col q-my-sm" color="grey" label="Empresas"
            :disable="cargandoAccesos || empresasFiltradas.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todasEmpresasSeleccionadas" v-model="todasEmpresasSeleccionadas"
              label="Todas" @update:model-value="filtrar('TODASEMPRESAS')" />
            <q-separator class="q-mx-md bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="empresasFiltradas" v-model="modelEmpresasSeleccionadas"
              @update:model-value="filtrar('OPCIONESEMPRESAS')" type="checkbox" />
          </q-btn-dropdown>
          <q-btn-dropdown dense outline class="col q-my-sm" color="grey" label="Sucursales"
            :disable="cargandoAccesos || sucursalesFiltradas.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todasSucursalesSeleccionadas"
              v-model="todasSucursalesSeleccionadas" label="Todas" @update:model-value="filtrar('TODASSUCURSALES')" />
            <q-separator class="q-mx-sm bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="sucursalesFiltradas" v-model="modelSucursalesSeleccionadas"
              @update:model-value="filtrar('OPCIONESSUCURSALES')" type="checkbox" />
          </q-btn-dropdown>
          <q-btn-dropdown dense outline class="col q-my-sm" color="grey" label="Departamentos"
            :disable="cargandoAccesos || departamentosFiltrados.length === 0">
            <q-checkbox class="q-pa-md" dense :disable="todosDepartamentosSeleccionados"
              v-model="todosDepartamentosSeleccionados" label="Todos"
              @update:model-value="filtrar('TODOSDEPARTAMENTOS')" />
            <q-separator class="q-mx-sm bg-gray"></q-separator>
            <q-option-group class="q-pa-md" dense :options="departamentosFiltrados"
              v-model="modelDepartamentosSeleccionados" @update:model-value="filtrar('OPCIONESDEPARTAMENTOS')"
              type="checkbox" />
          </q-btn-dropdown>
        </div>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props" style="background-color: #1052A0; color: white; font-weight: bold;">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" :class="col.align">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div :class="col.align">
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="control--tabla q-mb-md">
      <q-btn v-if="paginacionAccesos.page > 1" icon="first_page" color="gray" round dense flat
        :disable="paginacionAccesos.page === 1 || cargandoAccesos" @click="filtrar(filtroActual, 1)" />

      <q-btn v-if="paginacionAccesos.page > 1" icon="chevron_left" color="gray" round dense flat
        :disable="paginacionAccesos.page === 1 || cargandoAccesos"
        @click="filtrar(filtroActual, paginacionAccesos.page - 1)" />

      <span class="q-mx-md text-bold">
        Página {{ paginacionAccesos?.page }} de
        {{ paginacionAccesos?.pagesNumber }}
      </span>

      <q-btn v-if="paginacionAccesos.page < paginacionAccesos.pagesNumber" icon="chevron_right" color="gray"
        round dense flat :disable="paginacionAccesos.page === paginacionAccesos.pagesNumber || cargandoAccesos"
        @click="filtrar(filtroActual, paginacionAccesos.page + 1)" />

      <q-btn v-if="paginacionAccesos.page < paginacionAccesos.pagesNumber" icon="last_page" color="gray" round
        dense flat :disable="paginacionAccesos.page === paginacionAccesos.pagesNumber || cargandoAccesos"
        @click="filtrar(filtroActual, paginacionAccesos.pagesNumber)" />
    </div>
  </q-layout>
</template>

<script>
import { ID_PORTAL } from "src/constant/servidor";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { filtrarOpciones } from "src/helpers/filtros";
import { formatearHora } from "src/helpers/formatearFecha";
import { useModulosStore } from "src/stores/permisosModulos";
import { useEmpresasStore } from "src/stores/empresas";
import { useSucursalesStore } from "src/stores/sucursales";
import { useDepartamentosStore } from "src/stores/departamentos";
import { notificacion } from "src/helpers/mensajes";

export default {
  setup() {
    const usePermisos = useModulosStore();
    const { obtenerAccesosPortal } = usePermisos;
    const { accesos, accesosFiltrados, paginacionAccesos, cargandoAccesos } = storeToRefs(
      usePermisos
    );

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

    const fechas = ref({
      fechaInicio: null,
      fechaFin: null,
    })

    const columns = [
      {
        name: "noEmpleado",
        label: "No. Empleado",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.numero_empleado,
      },
      {
        name: "usuario",
        label: "Usuario",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.usuario,
        sortable: true,
      },
      {
        name: "nombre",
        label: "Nombre",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.nombre,
        sortable: true,
      },
      {
        name: 'puesto',
        label: 'Puesto',
        align: 'center',
        field: informacionAcceso => informacionAcceso.usuario.puesto,
      },
      {
        name: "fechaAcceso",
        label: "Fecha de Acceso",
        align: "center",
        field: informacionAcceso => formatearHora(informacionAcceso.createdAt),
        sortable: true,
      },
    ]

    const buscar = ref("");

    const filtroActual = ref("");

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
      }

      await filtrar("TODASEMPRESAS");
    })

    const filtrar = async (tipoFiltro, pagina = null) => {
      if (fechas.value.fechaInicio && fechas.value.fechaFin) {
        const fechaInicio = new Date(fechas.value.fechaInicio);
        const fechaFin = new Date(fechas.value.fechaFin);

        if (fechaInicio > fechaFin) {
          notificacion("warning", "La fecha de inicio no puede ser mayor a la fecha fin.");
          return;
        }
      }

      cargandoAccesos.value = true;
      filtroActual.value = tipoFiltro;
      accesosFiltrados.value = [];

      // Filtra las opciones según (empresa, sucursal, departamento) (NO FILTRA INFORMACION)
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
        modelDepartamentosSeleccionados
      )

      const filtrosObj = {
        busqueda: buscar.value,
        empresas: modelEmpresasSeleccionadas.value,
        sucursales: modelSucursalesSeleccionadas.value,
        departamentos: modelDepartamentosSeleccionados.value,
        fechas: fechas.value,
      }

      if (pagina) {
        paginacionAccesos.value.page = pagina
      } else {
        paginacionAccesos.value.page = 1
      }

      await obtenerAccesosPortal(filtrosObj, ID_PORTAL)

      cargandoAccesos.value = false;
    }

    const setearFechaFin = () => {
      if (fechas.value.fechaInicio) {
        fechas.value.fechaFin = null;
      }
    }

    return {
      // States
      columns,
      buscar,
      filtroActual,
      accesos,
      accesosFiltrados,
      paginacionAccesos,
      cargandoAccesos,
      empresasFiltradas,
      modelEmpresasSeleccionadas,
      todasEmpresasSeleccionadas,
      sucursalesFiltradas,
      modelSucursalesSeleccionadas,
      todasSucursalesSeleccionadas,
      departamentosFiltrados,
      modelDepartamentosSeleccionados,
      todosDepartamentosSeleccionados,
      fechas,
      // Methods
      filtrar,
      setearFechaFin,
    };
  },
};
</script>

<style lang="sass">
.sticky-movimiento

  .q-table__top,
  thead tr:first-child
    background-color: #fafafa

  td:first-child
    background-color: #fafafa

  td:first-child
    position: sticky
    left: 0
    z-index: 1

</style>
