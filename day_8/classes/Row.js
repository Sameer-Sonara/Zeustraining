// classes/Row.js
import { Cell } from './Cell.js';

export class Row {
  constructor(index) {
    this.index = index;
    this.cells = new Map();
  }

  getCell(colIndex) {
    if (!this.cells.has(colIndex)) {
      this.cells.set(colIndex, new Cell(this.index, colIndex));
    }
    return this.cells.get(colIndex);
  }
}
