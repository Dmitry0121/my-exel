export function createTable(rowsCount = 50) {
  const columnsCount = CODES.Z - CODES.A + 1
  const rows = []

  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(toRow(null, columns));

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(toRow(i, cells));
  }

  return rows.join('')
}

const CODES = {
  A: 65,
  Z: 90,
}

function toCell() {
  return `
        <div class="cell" contenteditable></div>
    `
}

function toColumn(column) {
  return `
        <div class="column">${column}</div>
    `
}

function toRow(index, row) {
  return `
        <div class="row">
          <div class="row-info">${index ? index : ''}</div>
          <div class="row-data">${row}</div>
        </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

/*
// decryption
const columns = new Array(columnsCount)
    .fill('')
    .map((element, index) => {
        return String.fromCharCode(CODES.A + index)
    })
    .map((element, index) => {
        return toColumn(element)
    })
    .join('')
*/