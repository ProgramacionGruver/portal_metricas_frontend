import dayjs from 'dayjs'
import 'dayjs/locale/es'

export const formatearFecha = (stringFecha) => dayjs(stringFecha).locale('es').format('DD/MM/YYYY')
export const formatearHora = (stringFecha) => dayjs(stringFecha).locale('es').format('DD/MM/YYYY HH:mm')
// console.log(es)

export const formatearFechaLDAP = (stringFecha) => dayjs(stringFecha).locale('es').format('DD/MM/YYYY')

export const formatearFechaInputDate = (stringFecha) => dayjs(stringFecha).locale('es').format('YYYY-MM-DD')

export const formatearFechaCorreo = (stringFecha) => dayjs(stringFecha).locale('es').format('DD-MM-YYYY')

export const fechaCompletaAhora = () => {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const diasSemana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

  const fecha = new Date()
  return 'Hoy es ' + diasSemana[fecha.getDay()] + ' ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' del ' + fecha.getUTCFullYear()
}

export const agregarDiasFecha = (fecha, dias) => {
  const fechaOriginal = new Date(fecha)
  const fechaNueva = new Date(fechaOriginal)
  fechaNueva.setDate(fechaOriginal.getDate() + dias)

  return fechaNueva.toISOString().slice(0, 10)
}
export const quitarDiasFecha = (fecha, dias) => {
  const fechaOriginal = new Date(fecha)
  const fechaNueva = new Date(fechaOriginal)
  fechaNueva.setDate(fechaOriginal.getDate() - dias)

  return fechaNueva.toISOString().slice(0, 10)
}

export const agregarDiasFormatear = (fecha, dias) => {
  const fechaOriginal = new Date(fecha)
  const fechaNueva = new Date(fechaOriginal)
  fechaNueva.setDate(fechaOriginal.getDate() + dias)

  const formatoFecha = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `${formatoFecha.format(fechaNueva)}`
}
