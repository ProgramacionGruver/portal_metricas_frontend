export const filtrarOpciones = (tipoFiltro,
  listaClavesEmpresas, todasEmpresasSeleccionadas, modelEmpresasSeleccionadas,
  sucursales, sucursalesFiltradas, listaClavesSucursales, todasSucursalesSeleccionadas, modelSucursalesSeleccionadas,
  departamentos, departamentosFiltrados, listaClavesDepartamentos, todosDepartamentosSeleccionados, modelDepartamentosSeleccionados,
  todosPuesto, puestosSeleccionados
) => {
  switch (tipoFiltro) {
    case 'TODASEMPRESAS':
      todasEmpresasSeleccionadas.value = true
      modelEmpresasSeleccionadas.value = []
      sucursalesFiltradas.value = filtrarElemento(listaClavesEmpresas.value, sucursales.value, 'claveEmpresa')
      departamentosFiltrados.value = filtrarElementosDuplicados(filtrarElemento(listaClavesEmpresas.value, departamentos.value, 'claveEmpresa'), 'claveDepartamento')
      break
    case 'OPCIONESEMPRESAS':
      todasEmpresasSeleccionadas.value = false
      sucursalesFiltradas.value = filtrarElemento(modelEmpresasSeleccionadas.value, sucursales.value, 'claveEmpresa')
      modelSucursalesSeleccionadas.value = sucursalesFiltradas.value.map(sucursal => sucursal.abreviacion)
      departamentosFiltrados.value = filtrarElementosDuplicados(filtrarElemento(modelEmpresasSeleccionadas.value, departamentos.value, 'claveEmpresa'), 'claveDepartamento')
      modelDepartamentosSeleccionados.value = departamentosFiltrados.value.map(departamento => departamento.claveDepartamento)
      break
    case 'TODASSUCURSALES':
      todasSucursalesSeleccionadas.value = true
      modelSucursalesSeleccionadas.value = []
      departamentosFiltrados.value === todasEmpresasSeleccionadas.value
        ? filtrarElementosDuplicados(filtrarElemento(listaClavesEmpresas.value, departamentos.value, 'claveEmpresa'), 'claveDepartamento')
        : filtrarElementosDuplicados(filtrarElemento(modelEmpresasSeleccionadas.value, departamentos.value, 'claveEmpresa'), 'claveDepartamento')
      break
    case 'OPCIONESSUCURSALES':
      todasSucursalesSeleccionadas.value = false
      departamentosFiltrados.value = filtrarElementosDuplicados(filtrarElemento(modelSucursalesSeleccionadas.value, departamentos.value, 'claveSucursal'), 'claveDepartamento')
      modelDepartamentosSeleccionados.value = departamentosFiltrados.value.map(departamento => departamento.claveDepartamento)
      break
    case 'TODOSDEPARTAMENTOS':
      todosDepartamentosSeleccionados.value = true
      modelDepartamentosSeleccionados.value = []
      break
    case 'OPCIONESDEPARTAMENTOS':
      todosDepartamentosSeleccionados.value = false
      break
    case 'TODOSFOTOS':
      todosFotosSeleccionados.value = true
      fotosSeleccionados.value = []
      break
    case 'OPCIONESFOTOS':
      todosFotosSeleccionados.value = false
      break
    case 'TODOSCONFIRMADOS':
      todosNuevosIngresosConfirmados.value = true
      confirmadosSeleccionados.value = []
      break
    case 'OPCIONESCONFIRMADOS':
      todosNuevosIngresosConfirmados.value = false
      break
    case 'TODOSPUESTOS':
      todosPuesto.value = true
      puestosSeleccionados.value = []
      break
    case 'OPCIONESPUESTOS':
      todosPuesto.value = false
      break
  }
}

export const llenarOpcionesEmpresas = (empresas) => {
  return empresas.map((empresa) => {
    empresa.label = empresa.razonSocial
    empresa.value = empresa.claveEmpresa
    return empresa
  })
}

// Devuelve una lista de opciones filtradas (un array filtrado del array opciones)
export const filtrarElemento = (listaElementosSeleccionados, opciones, nombreCampoAFiltrar) => {
  return opciones.filter(elemento => {
    return listaElementosSeleccionados.includes(elemento[nombreCampoAFiltrar])
  })
}

export const llenarOpcionesSucursales = (sucursales) => {
  // const regex = /CENTRALIZADOR|DIVISION/
  // return sucursales.filter(sucursal => !regex.test(sucursal.nombreSucursal)).map((sucursal) => {
  return sucursales.map((sucursal) => {
    sucursal.label = sucursal.nombreSucursal
    sucursal.value = sucursal.abreviacion
    return sucursal
  })
}

// Elimina elementos duplicados de una lista basándose en una propiedad única
export const filtrarElementosDuplicados = (listaElementos, nombrePropiedadUnica) => {
  return listaElementos.reduce((acumulador, elemento) => {
    // Comprueba si la propiedad 'nombrePropiedadUnica' del elemento ya se ha agregado al acumulador
    if (!acumulador.find(acu => acu[nombrePropiedadUnica] === elemento[nombrePropiedadUnica])) {
      acumulador.push(elemento)
    }
    return acumulador
  }, [])
}

export const llenarOpcionesDepartamentos = (departamentos) => {
  /* SI SE LLEGA A REQUERIR FILTRAR ALGUN DEPARTAMENTO --> USAR REGEX */
  // const regex = /BDC|CENTRALIZADOR|ACONDICIONAMIENTO|COCINA|MERCADOTECNIA|CORPORATIVA/
  // return departamentos.filter(departamento => !regex.test(departamento.departamento.nombreDepartamento)).map((departamento) => {
  return departamentos.map((departamento) => {
    departamento.label = departamento.departamento.nombreDepartamento
    departamento.claveEmpresa = departamento.sucursale.claveEmpresa
    departamento.value = departamento.claveDepartamento
    return departamento
  })
}
