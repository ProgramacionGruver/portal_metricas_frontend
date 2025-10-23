export const abrirUrl = async (url) => {
  window.open(url, '_blank')
}

export const obtenerURLImage = (numeroEmpleado) => {
  const idFormateado = String(numeroEmpleado).padStart(7, '0')
  const url = `https://backend.gruver.com.mx/rh/api/fotos/${idFormateado}.jpg`
  return url
}
