export class Edit 
{
    /**
     * @param {Grid} grid
     * @param {number} row
     * @param {number} col
     * @param {any} oldValue
     * @param {any} newValue
     */
    constructor(grid, row, col, oldValue, newValue) {
        /**@type {Grid} The grid */
        this.grid = grid;
        /**@type {number} Row index */
        this.row = row;
        /**@type {number} Column index */
        this.col = col;
        /**@type {any} Old value */
        this.oldValue = oldValue;
        /**@type {any} New value */
        this.newValue = newValue;
    }
    execute() {
        this.grid.rows[this.row].cells[this.col].value = this.newValue;
        this.grid.render();
    }
    undo() {
        this.grid.rows[this.row].cells[this.col].value = this.oldValue;
        this.grid.render();
    }
}