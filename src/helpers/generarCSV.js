import { exportFile } from 'quasar'

export const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

export const convertirTablaCSV = (columna, row, nombre) => {
  try {
    // naive encoding to csv format
    const content = [columna.map(col => wrapCsvValue(col.label))].concat(
      row.value.map(row => columna.map(col => wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[col.field === void 0 ? col.name : col.field],
        col.format,
        row
      )).join(','))
    ).join('\r\n')

    return exportFile(
      nombre,
      content,
      'text/csv'
    )
  } catch (error) {
    return false
  }
}

export const convertirTablaCSVRow = (row, nombre) => {
  try {
    // naive encoding to csv format
    const content = [Object.keys(row[0]).map(key => wrapCsvValue(key))].concat(
      row.map(row => Object.keys(row).map(key => wrapCsvValue(
        typeof row[key] === 'function'
          ? row[key]()
          : row[key],
        row[key]?.format,
        row
      )).join(','))
    ).join('\r\n')

    return exportFile(
      nombre,
      content,
      'text/csv'
    )
  } catch (error) {
    console.log(error)
  }
}
