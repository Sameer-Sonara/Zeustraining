export class Selection {
  constructor() {
    this.clear();
  }

  // Select a single cell
  selectCell(row, col) {
    this.type = 'cell';
    this.startRow = row;
    this.startCol = col;
    this.endRow = row;
    this.endCol = col;
  }

  // Select entire row
  selectRow(row) {
    this.type = 'row';
    this.startRow = row;
    this.startCol = 0;
    this.endRow = row;
    this.endCol = Infinity;
  }

  // Select entire column
  selectCol(col) {
    this.type = 'col';
    this.startCol = col;
    this.startRow = 0;
    this.endCol = col;
    this.endRow = Infinity;
  }

  isSelected(row, col) {
    if (!this.isActive()) return false;

    if (this.type === 'cell') {
      return row === this.startRow && col === this.startCol;
    }

    if (this.type === 'row') {
      return row === this.startRow;
    }

    if (this.type === 'col') {
      return col === this.startCol;
    }

    return false;
  }

  isActive() {
    return this.startRow !== null && this.startCol !== null;
  }

  clear() {
    this.type = null;
    this.startRow = null;
    this.startCol = null;
    this.endRow = null;
    this.endCol = null;
  }
}
