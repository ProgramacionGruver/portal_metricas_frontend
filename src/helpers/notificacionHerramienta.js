import { mensajeHerramienta } from '../helpers/mensajeHerramienta'

export const notificacionHerramienta = async (requisicion) => {
  let correos = []
  const { equipoComputo, vehiculo, cajaHerramientas, celular } = requisicion

  // retornara una respuesta de que el correo se envio de manera correcta
  switch (requisicion !== null) {
    case equipoComputo && vehiculo && cajaHerramientas && celular:
      // console.log('Selecciono todos')
      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case equipoComputo && vehiculo && cajaHerramientas:
      // console.log('Selecciono Equipo de computo, vehiculo y caja de herramientas')
      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case equipoComputo && vehiculo && celular:
      // console.log('Selecciono Equipo de computo, vehiculo y celular')
      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case equipoComputo && vehiculo:
      // console.log('Selecciono equipo de computo y vehiculo')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case equipoComputo && cajaHerramientas:
      // console.log('Selecciono equipo de computo y caja de herramientas')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case equipoComputo && celular:
      // console.log('Selecciono equipo de computo y celular')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

      // casos que incluyen vehiculo

    case vehiculo && cajaHerramientas:
      // console.log('Selecciono vehiculo y caja de herramientas')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case vehiculo && celular:
      // console.log('Selecciono vehiculo y celular')
      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case cajaHerramientas && vehiculo:
      // console.log('Selecciono caja de herramientas y vehiculo')
      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case cajaHerramientas && celular:
      // console.log('Selecciono caja de herramientas y celular')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)
    // casos que incluyen equipos de computo
    case equipoComputo:
      // console.log('Selecciono equipo de computo')
      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case vehiculo:
      // console.log('Selecciono vehiculo')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case cajaHerramientas:
      // console.log('Selecciono caja de herramientas')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)

    case celular:
      // console.log('Selecciono celular')

      correos = ['azael.garcia@gruver.mx']
      requisicion.correos = correos
      return await mensajeHerramienta(requisicion)
  }
}

// if (requisicionActulizada.equipoComputo) {
//   // correos de sistemas
//   const correos = ['azael.garcia@gruver.mx']
//   requisicionActulizada.correos = correos
//   //console.log(requisicionActulizada)
//   const { data } = await api.post('/notificaciones/notificacionHerramienta', requisicionActulizada)
//   //console.log(data)
//   notificacion('postive', data.msg)
// }
