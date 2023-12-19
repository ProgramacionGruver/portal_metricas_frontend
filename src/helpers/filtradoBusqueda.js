
export const filtradoBusqueda = (valor, update, state, opciones) => {
  if (valor === '') {
    update(() => {
      opciones.value = state
    })
    return opciones.value
  }
  update(() => {
    const needle = valor.toLowerCase()
    opciones.value = state.filter(v => v.toLowerCase().indexOf(needle) > -1)
    return opciones.value
  })
}

export const filtradoElemento = (elementoSeleccionado, estate, opciones, elementoFiltrar) => {
  if (elementoSeleccionado.value === 'Todos') {
    estate.value = opciones.value
  } else if (elementoSeleccionado.value === 'Historial Manual') {
    const opcionesFiltrado = opciones.value.filter(elemento => elemento[elementoFiltrar] === null)
    estate.value = opcionesFiltrado
  } else {
    const opcionesFiltrado = opciones.value.filter(elemento => elemento[elementoFiltrar] === elementoSeleccionado.value)
    estate.value = opcionesFiltrado
  }
}
