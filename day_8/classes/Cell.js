export class Cell {
  /**
     * Initializes a cell.
     * @param {number} row Row index
     * @param {number} col Column index
     * @param {any} value Value of the cell
     */
    constructor(row, col, value = '') 
    {
        /**@type {number} Row index of the cell */
        this.row = row;
        /**@type {number} Column index of the cell */
        this.col = col;
        /**@type {any} Value of the cell */
        this.value = value;
        /**@type {boolean} Whether the cell is selected */
        this.selected = false;
        /**@type {boolean} Whether the cell is being edited */
        this.editing = false;
    }
}