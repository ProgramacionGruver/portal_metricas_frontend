import { Notify } from 'quasar'

export const notificacion = (tipo, mensaje) => {
  Notify.create({
    type: tipo,
    message: mensaje,
    class: 'glossy',
    actions: [
      { label: 'Cerrar', color: 'white', handler: () => {} }
    ]
  })
}
