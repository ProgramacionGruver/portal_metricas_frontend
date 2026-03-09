import { defineStore } from "pinia";
import { ref } from "vue";
import { apiMetricas } from "src/boot/axiosMetricas";
import { notificacion } from "src/helpers/mensajes";

export const useMetricasStore = defineStore("metricas", () => {
  const metricas = ref([]);
  const metricasOpciones = ref([]);

  const infoMetricaSeleccionada = ref(null);

  const permisosModulos = ref([]);
  const permisosMetricas = ref([]);

  const usuariosPermisoModulos = ref([]);
  const usuariosPermisoMetricas = ref([]);

  const cargandoLog = ref(false);
  const logMetricas = ref([]);
  const logMetricasFiltrados = ref([]);

  const paginacionLog = ref({
    page: 1,
    rowsPerPage: 11,
    rowsNumber: 0,
    pagesNumber: 0,
  });

  const catalogoAcciones = ref([]);

  const obtenerTodasMetricas = async () => {
    try {
      const { data } = await apiMetricas.get("/metricas");

      metricas.value = data;
      metricasOpciones.value = data.flatMap((empresa) =>
        empresa.grupos.flatMap((grupo) =>
          grupo.metricas.map((metrica) => ({
            label: `${empresa.nombreCorto} -> ${grupo.nombreGrupo} -> ${metrica.nombreMetrica}`,
            value: metrica.idMetrica,
          }))
        )
      );
    } catch (error) {
      console.error("Error al obtener las métricas:", error);
    }
  };

  const obtenerPermisosModulosByNumeroEmpleado = async (numeroEmpleado) => {
    try {
      const { data } = await apiMetricas.get(
        `/permisos/modulos/${numeroEmpleado}`
      );

      permisosModulos.value = data;
    } catch (error) {
      console.error("Error al obtener los permisos de módulos:", error);
    }
  };

  const obtenerPermisosMetricasByNumeroEmpleado = async (numeroEmpleado) => {
    try {
      const { data } = await apiMetricas.get(
        `/permisos/metricas/${numeroEmpleado}`
      );

      permisosMetricas.value = data;
    } catch (error) {
      console.error("Error al obtener los permisos de métricas:", error);
    }
  };

  const obtenerMetricaById = async (idMetrica) => {
    try {
      const { data } = await apiMetricas.get(`/metrica/${idMetrica}`);

      infoMetricaSeleccionada.value = data;
    } catch (error) {
      console.error("Error al obtener la métrica por ID:", error);
    }
  };

  const obtenerLog = async (filtros) => {
    try {
      const { page, rowsPerPage } = paginacionLog.value;

      cargandoLog.value = true;
      const { data } = await apiMetricas.post(`/log`, {
        page,
        rowsPerPage,
        filtros,
      });

      logMetricas.value = data.log;
      logMetricasFiltrados.value = data.log;
      paginacionLog.value.pagesNumber = data.totalPages;
      paginacionLog.value.rowsNumber = data.total;
    } catch (error) {
      console.log(error);
    } finally {
      cargandoLog.value = false;
    }
  };

  const crearLog = async (logData) => {
    try {
      await apiMetricas.post("/log/crear", logData);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCatalogoAcciones = async () => {
    try {
      const { data } = await apiMetricas.get("/acciones");

      catalogoAcciones.value = data.map((accion) => {
        return {
          label: accion.nombreAccion,
          value: accion.idAccion,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPermisosModulosTodos = async () => {
    try {
      const { data } = await apiMetricas.get(`/permisos/modulosTodos`);

      usuariosPermisoModulos.value = data;
    } catch (error) {
      console.error("Error al obtener los permisos de módulos:", error);
    }
  }

  const obtenerPermisosMetricasTodos = async () => {
    try {
      const { data } = await apiMetricas.get(`/permisos/metricasTodos`);

      usuariosPermisoMetricas.value = data;
    } catch (error) {
      console.error("Error al obtener los permisos de métricas:", error);
    }
  }

  const actualizarPermisosModulos = async (numeroEmpleado, permisos, usuario) => {
    try {
      const { data } = await apiMetricas.put(`/permisos/modulos/${numeroEmpleado}`, {
        permisos,
        usuario,
      });

      const index = usuariosPermisoModulos.value.findIndex(u => u.numero_empleado === numeroEmpleado);

      if (index !== -1) {
        usuariosPermisoModulos.value[index].permisos = data;
      }

      notificacion("positive", "Permisos de módulos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los permisos de módulos:", error);
      notificacion("negative", "Error al actualizar los permisos de módulos");
    }
  };

  const actualizarPermisosMetricas = async (numeroEmpleado, permisos, usuario) => {
    try {
      await apiMetricas.put(`/permisos/metricas/${numeroEmpleado}`, {
        permisos,
        usuario,
      });

      const index = usuariosPermisoMetricas.value.findIndex(u => u.numero_empleado === numeroEmpleado);

      if (index !== -1) {
        usuariosPermisoMetricas.value[index].permisos = permisos;
      }

      notificacion("positive", "Permisos de métricas actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los permisos de métricas:", error);
      notificacion("negative", "Error al actualizar los permisos de métricas");
    }
  };

  const solicitarAccesoMetricas = async (numeroEmpleado, solicitudes) => {
    try {
      await apiMetricas.post(`/permisos/solicitarAccesoMetricas/${numeroEmpleado}`, { solicitudes });

      notificacion("positive", "Solicitud de acceso a métricas enviada correctamente");
    } catch (error) {
      console.error("Error al solicitar acceso a métricas:", error);
      notificacion("warning", error.response?.data?.message || "Error al solicitar acceso a métricas");
    }
  };

  return {
    // States
    metricas,
    metricasOpciones,
    infoMetricaSeleccionada,
    permisosModulos,
    permisosMetricas,
    cargandoLog,
    logMetricas,
    logMetricasFiltrados,
    paginacionLog,
    catalogoAcciones,
    usuariosPermisoModulos,
    usuariosPermisoMetricas,
    // Methods
    obtenerTodasMetricas,
    obtenerPermisosModulosByNumeroEmpleado,
    obtenerPermisosMetricasByNumeroEmpleado,
    obtenerMetricaById,
    obtenerLog,
    crearLog,
    obtenerCatalogoAcciones,
    obtenerPermisosModulosTodos,
    obtenerPermisosMetricasTodos,
    actualizarPermisosModulos,
    actualizarPermisosMetricas,
    solicitarAccesoMetricas,
  };
});
