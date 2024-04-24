export const abrirUrl = async (url) => {
  window.open(url, '_blank')
}

export const obtenerURLImage = (numeroEmpleado) => {
  const idFormateado = String(numeroEmpleado).padStart(7, '0')
  const url = `https://www.gruver.com.mx/fotos/${idFormateado}.jpg`
  return url
}
