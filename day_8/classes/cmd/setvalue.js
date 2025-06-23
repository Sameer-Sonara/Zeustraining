// classes/cmd/SetCellValueCommand.js
export class SetCellValueCommand {
  constructor(grid, row, col, newValue) {
    this.grid = grid;
    this.row = row;
    this.col = col;
    this.newValue = newValue;
    this.oldValue = grid.getRow(row).getCell(col).value;
  }

  execute() {
    this.grid.getRow(this.row).getCell(this.col).value = this.newValue;
    this.grid.render();
  }

  undo() {
    this.grid.getRow(this.row).getCell(this.col).value = this.oldValue;
    this.grid.render();
  }
}
 