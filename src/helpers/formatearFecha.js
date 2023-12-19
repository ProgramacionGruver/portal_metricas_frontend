import dayjs from 'dayjs'
import 'dayjs/locale/es'

export const formatearFecha = (stringFecha) => dayjs(stringFecha).locale('es').format('DD/MMMM/YYYY')
// console.log(es)

export const formatearFechaLDAP = (stringFecha) => dayjs(stringFecha).locale('es').format('DD/MM/YYYY')

export const formatearFechaInputDate = (stringFecha) => dayjs(stringFecha).locale('es').format('YYYY-MM-DD')

export const formatearFechaCorreo = (stringFecha) => dayjs(stringFecha).locale('es').format('DD-MM-YYYY')
