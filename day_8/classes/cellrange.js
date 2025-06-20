export class CellRange {
    /**
     * Initializes a cell range.
     * @param {number} startRow Start row index
     * @param {number} startCol Start column index
     * @param {number} endRow End row index
     * @param {number} endCol End column index
     */
    constructor(startRow, startCol, endRow, endCol) 
    {
        /**@type {number} Start row index */
        this.startRow = startRow;
        /**@type {number} Start column index */
        this.startCol = startCol;
        /**@type {number} End row index */
        this.endRow = endRow;
        /**@type {number} End column index */
        this.endCol = endCol;
    }
}