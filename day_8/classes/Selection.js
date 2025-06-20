export class Selection {
    /**
     * Initializes a selection.
     */
    constructor() 
    {
        /**@type {number} Start row index */
        this.startRow = 0;
        /**@type {number} Start column index */
        this.startCol = 0;
        /**@type {number} End row index */
        this.endRow = 0;
        /**@type {number} End column index */
        this.endCol = 0;
        /**@type {string} Selection type: 'cell', 'row', 'column', 'range' */
        this.type = 'cell';
    }
    /**
     * Checks if a cell is within the selection.
     * @param {number} row
     * @param {number} col
     * @returns {boolean}
     */
    contains(row, col) 
    {
        return (
            row >= Math.min(this.startRow, this.endRow) &&
            row <= Math.max(this.startRow, this.endRow) &&
            col >= Math.min(this.startCol, this.endCol) &&
            col <= Math.max(this.startCol, this.endCol)
        );
    }
}