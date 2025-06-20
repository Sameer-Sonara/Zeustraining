export class Col
{
    /** 
    * Initializes a column.
     * @param {number} index Column index
     * @param {string} name Column name
     */
    constructor(index, name) {
        /**@type {number} Column index */
        this.index = index;
        /**@type {string} Name of the column */
        this.name = name;
        /**@type {number} Width of the column */
        this.width = 100;
        /**@type {boolean} Whether the column is selected */
        this.selected = false;
    }
}