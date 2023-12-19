
export const editarRegistros = (nuevoRegistro, registroLleno, esNuevoRegistro) => {
  const objetoNuevo = nuevoRegistro

  Object.keys(nuevoRegistro || registroLleno).forEach(key => {
    objetoNuevo[key] = esNuevoRegistro ? nuevoRegistro[key] : registroLleno[key]
  })
  return objetoNuevo
}
