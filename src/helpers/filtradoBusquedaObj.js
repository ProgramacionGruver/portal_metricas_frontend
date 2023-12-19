
export const filtradoBusquedaObj = (valor, update, state, opciones) => {
  if (valor === '') {
    update(() => {
      opciones.value = state
    })
    return opciones.value
  }
  update(() => {
    const needle = valor.toLowerCase()
    opciones.value = state.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
    return opciones.value
  })
}
