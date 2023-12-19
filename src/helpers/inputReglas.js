export const validarCorreo = [
  (val, rules) => rules.email(val) || 'Ingresa un correo valido.'
]

export const validarFechaVigencia = [
  val => (Date.now() < new Date(val)) || 'Fecha de Vigencia invalida.'
]

export const validarCampo = [
  val => (val && val.length >= 0) || '',
  val => (val && val.length < 50) || ''
]

export const validarTexto50 = [
  val => (val && val.length >= 0) || 'LLena el este campo para continuar.',
  val => (val && val.length < 50) || 'Maximo de campo 50 caracteres'
]

export const validarTexto100 = [
  val => (val && val.length >= 0) || 'LLena el este campo para continuar.',
  val => (val && val.length < 100) || 'Maximo de campo 100 caracteres'
]
export const validarTexto255 = [
  val => (val && val.length >= 0) || 'LLena el este campo para continuar.',
  val => (val && val.length < 1000) || 'Maximo de campo 1000 caracteres'
]

export const validarTexto = [
  val => (val && val.length >= 0) || 'LLena el este campo para continuar.'
]

export const validarDigitosEnteros = [
  val => (val !== null && val !== '' && !isNaN(parseInt(val))) || 'Ingresa un numero valido.',
  val => ((val - Math.floor(val) === 0) && val >= 0) || 'Solo numeros enteros.'
]

export const validarDigitosEnterosPositivos = [
  val => (val !== null && val !== '' && !isNaN(parseInt(val))) || 'Ingresa un numero valido.',
  val => (val - Math.floor(val) === 0) || 'Solo numeros enteros.',
  val => (val >= 0) || 'El número no puede ser negativo.'
]

export const validarDigitosPositivosDecimales = [
  val => (val !== null && val !== '' && !isNaN(parseFloat(val))) || 'Ingresa un número válido.',
  val => (val >= 0) || 'El número no puede ser negativo.'
]

export const validarDigitos = [
  val => (val >= 0 && val !== null && val !== '' && !isNaN(parseInt(val))) || 'Ingresa un numero valido.'
]

export const validarDigitosMaximo100 = [
  val => (val >= 0 && val !== null && val !== '' && !isNaN(parseInt(val))) || 'Ingresa un numero valido.',
  val => ((val - Math.floor(val) === 0) && val >= 0) || 'Solo numeros enteros.',
  val => ((val <= 100) && val >= 0) || 'El valor debe ser menor o igual a 100%'
]
