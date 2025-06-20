export class resizeCol {
    /**
     * @param {Grid} grid
     * @param {number} col
     * @param {number} oldWidth
     * @param {number} newWidth
     */
    constructor(grid, col, oldWidth, newWidth) {
        this.grid = grid;
        this.col = col;
        this.oldWidth = oldWidth;
        this.newWidth = newWidth;
    }
    execute() {
        this.grid.columns[this.col].width = this.newWidth;
        this.grid.render();
    }
    undo() {
        this.grid.columns[this.col].width = this.oldWidth;
        this.grid.render();
    }
}

export class resizeRow
{
    /**
     * @param {Grid} grid
     * @param {number} row
     * @param {number} oldHeight
     * @param {number} newHeight
     */
    constructor(grid, row, oldHeight, newHeight) {
        this.grid = grid;
        this.row = row;
        this.oldHeight = oldHeight;
        this.newHeight = newHeight;
    }
    execute() {
        this.grid.rows[this.row].height = this.newHeight;
        this.grid.render();
    }
    undo() {
        this.grid.rows[this.row].height = this.oldHeight;
        this.grid.render();
    }
}