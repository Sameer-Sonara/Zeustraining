export class Edit 
{
    execute() {
        this.grid.rows[this.row].cells[this.col].value = this.newValue;
        this.grid.render();
    }
    undo() {
        this.grid.rows[this.row].cells[this.col].value = this.oldValue;
        this.grid.render();
    }
}