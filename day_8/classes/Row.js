import { Cell } from './Cell.js';
import { Col } from './Col.js';
export class Row 
{
  /**
     * Initializes a row.
     * @param {number} index Row index
     * @param {number} colCount Number of columns
     */
    constructor(index, colCount) {
        /**@type {number} Row index */
        this.index = index;
        /**@type {Cell[]} Array of cells in the row */
        this.cells = [];
        for (let i = 0; i < colCount; i++) {
            this.cells.push(new Cell(index, i, ""));
        }
        /**@type {number} Height of the row */
        this.height = 24;
        /**@type {boolean} Whether the row is selected */
        this.selected = false;
    }
  getCell(col) 
  {
    return this.cells.get(col);
  }

  setCell(col, value) 
  {
    this.cells.get(col).value = value;
  }
}