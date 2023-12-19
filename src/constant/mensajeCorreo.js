import { formatearFechaCorreo } from 'src/helpers/formatearFecha'

export const mensajeCorreo = (entrevista, reporte) => {
  return `<table border='1' style='border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;'>
  <thead bgcolor='#1052A0' text='white'>
    <tr>
      <th colspan='2' style='padding: 16px; background-color: #1052A0; color: white;'>ENTREVISTA DE SALIDA</th>
    </tr>
  </thead>
  <tbody bgcolor='white' text='black'>
    <tr>
      <td style='padding: 12px;'>Fecha de elaboracion:</td>
      <td style='padding: 12px;'>${formatearFechaCorreo(Date())}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Centro de trabajo:</td>
      <td style='padding: 12px;'>${entrevista.centroTrabajo}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Nombre:</td>
      <td style='padding: 12px;'>${entrevista.nombre}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Entrevista:</td>
      <td style='padding: 12px;'><a href='${reporte.url}' style='color: #58ACFA; text-decoration: none;'>Da click aqui</a></td>
    </tr>
  </tbody>
</table>
`
}

export const mensajeCorreoHistorial = (reporte) => {
  return `
  <p>¡Buen día!</p>
  <p>Por favor, completa el historial clínico que se adjunta en el correo.</p> 
  <br>
  <table border='1' style='border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;'>
  <thead bgcolor='#1052A0' text='white'>
    <tr>
      <th colspan='2' style='padding: 16px; background-color: #1052A0; color: white;'>Historial Clinico</th>
    </tr>
  </thead>
  <tbody bgcolor='white' text='black'>
    <tr>
      <td style='padding: 12px;'>Documento de entrevista:</td>
      <td style='padding: 12px;'><a href='${reporte.url}' style='color: #58ACFA; text-decoration: none;'>Da click aqui</a></td>
    </tr>
  </tbody>
</table>
<br>
<p>Si tienen alguna pregunta o necesitan ayuda para completar el formulario, por favor no duden en comunicarse con nuestro departamento de recursos humanos.</p>
  <p>¡Muchas gracias!</p>
`
}

export const mensajeCorreoRequisicionPersonal = (requiscion, liga) => {
  return `<table border='1' style='border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;'>
  <thead bgcolor='#1052A0' text='white'>
    <tr>
      <th colspan='2' style='padding: 16px; background-color: #1052A0; color: white;'>Requisicion de personal</th>
    </tr>
  </thead>
  <tbody bgcolor='white' text='black'>
    <tr>
      <td style='padding: 12px;'>Fecha de elaboracion:</td>
      <td style='padding: 12px;'>${formatearFechaCorreo(requiscion.createdAt)}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Centro de trabajo:</td>
      <td style='padding: 12px;'>${requiscion.centroTrabajo}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>A nombre de:</td>
      <td style='padding: 12px;'>${requiscion.nombreSolicitante}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Documento de entrevista:</td>
      <td style='padding: 12px;'><a href='${liga.url}' style='color: #58ACFA; text-decoration: none;'>Click aqui para ir a la requisicion</a></td>
    </tr>
  </tbody>
</table>
`
}

export const mensajeCorreoMovimientoPersonal = (movimiento, liga) => {
  return `<table border='1' style='border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;'>
  <thead bgcolor='#1052A0' text='white'>
    <tr>
      <th colspan='2' style='padding: 16px; background-color: #1052A0; color: white;'>Movimiento Personal</th>
    </tr>
  </thead>
  <tbody bgcolor='white' text='black'>
    <tr>
      <td style='padding: 12px;'>Fecha de elaboracion:</td>
      <td style='padding: 12px;'>${formatearFechaCorreo(movimiento.createdAt)}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Centro de trabajo movimiento:</td>
      <td style='padding: 12px;'>${movimiento.centroTrabajoPropuesta}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Nombre del emplado movimiento:</td>
      <td style='padding: 12px;'>${movimiento.nombreColaborador}</td>
    </tr>
    <tr>
      <td style='padding: 12px;'>Documento de entrevista:</td>
      <td style='padding: 12px;'><a href='${liga.url}' style='color: #58ACFA; text-decoration: none;'>Click aqui para ir a la movimiento</a></td>
    </tr>
  </tbody>
</table>
`
}
