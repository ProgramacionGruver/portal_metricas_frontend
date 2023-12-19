import { copyToClipboard, Notify } from 'quasar'

export const copiarURL = (data) => {
  copyToClipboard(data)
    .then(() => {
      Notify.create({
        message: 'Elemento copiado',
        icon: 'content_copy'
      })
    })
    .catch(() => {
      // fail
    })
}
