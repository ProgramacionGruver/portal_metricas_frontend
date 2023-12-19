/* eslint-disable semi-spacing */
export const asignarValorForm = (datosInit, datosAsign) => {
  if (datosAsign == null) {
    return datosInit
  }

  const newDatosForm = {}
  const newDatosAsign = Object.assign({}, datosInit)

  for (const key in newDatosAsign) {
    const value = newDatosAsign[key]

    if (typeof value === 'object' && value !== null && !(value instanceof File)) {
      newDatosForm[key] = asignarValorForm(value, datosAsign[key])
    } else {
      newDatosForm[key] = datosAsign[key] ?? value
    }
  }

  return newDatosForm
}

export const formatearNoEmpleado = (noEmpleado) => {
  const cadenaNoEmpleado = String(noEmpleado)
  const zerosToAdd = 6 - cadenaNoEmpleado.length
  return '0'.repeat(zerosToAdd) + cadenaNoEmpleado
}

export const calcularCRC16 = (palabra) => {
  let cifrado = ''
  for (let i = 0;i < palabra.length;i++) {
    const codigoCaracter = palabra.charCodeAt(i)

    if (codigoCaracter >= 65 && codigoCaracter <= 90) {
      // Letra mayúscula
      const letraCifrada = String.fromCharCode(
        ((codigoCaracter - 65 + 3) % 26) + 65
      )
      cifrado += letraCifrada
    } else if (codigoCaracter >= 97 && codigoCaracter <= 122) {
      // Letra minúscula
      const letraCifrada = String.fromCharCode(
        ((codigoCaracter - 97 + 3) % 26) + 97
      )
      cifrado += letraCifrada
    } else {
      // Otros caracteres no cambian
      cifrado += palabra.charAt(i)
    }
  }
  return cifrado
}

export const decodificarCRC16 = (cifrado) => {
  let palabra = ''
  for (let i = 0;i < cifrado.length;i++) {
    const codigoCaracter = cifrado.charCodeAt(i)

    if (codigoCaracter >= 65 && codigoCaracter <= 90) {
      // Letra mayúscula
      const letraDescifrada = String.fromCharCode(
        ((codigoCaracter - 65 - 3 + 26) % 26) + 65
      )
      palabra += letraDescifrada
    } else if (codigoCaracter >= 97 && codigoCaracter <= 122) {
      // Letra minúscula
      const letraDescifrada = String.fromCharCode(
        ((codigoCaracter - 97 - 3 + 26) % 26) + 97
      )
      palabra += letraDescifrada
    } else {
      // Otros caracteres no cambian
      palabra += cifrado.charAt(i)
    }
  }
  return palabra
}
