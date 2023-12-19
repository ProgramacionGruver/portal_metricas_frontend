import { autorizacionEstatus } from 'src/constant/estatusAutorizacion'

export const obtenerButton = (value) => autorizacionEstatus[value] || { color: '', icon: '' }
