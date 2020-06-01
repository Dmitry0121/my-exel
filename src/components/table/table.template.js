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

function toCell(_, index) {
  return `
        <div class="cell" data-column="${index}" contenteditable></div>
    `
}

function toColumn(column, index) {
  return `
        <div class="column" data-type="resizable" data-column="${index}">
          ${column}
          <div class="column-resize" data-resize="column"></div>
        </div>
    `
}

function toRow(index, row) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
        <div class="row" data-type="resizable">
          <div class="row-info">
            ${index ? index : ''}          
            ${resize}
          </div>
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