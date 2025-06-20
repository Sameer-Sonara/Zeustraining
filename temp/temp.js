/**
 * Represents a single cell in the grid.
 */
class Cell {
    /**
     * Initializes a cell.
     * @param {number} row Row index
     * @param {number} col Column index
     * @param {any} value Value of the cell
     */
    constructor(row, col, value) {
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
 
/**
 * Represents a row in the grid.
 */
class Row {
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
}
 
/**
 * Represents a column in the grid.
 */
class Column {
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
 
/**
 * Represents a selection in the grid.
 */
class Selection {
    /**
     * Initializes a selection.
     */
    constructor() {
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
    contains(row, col) {
        return (
            row >= Math.min(this.startRow, this.endRow) &&
            row <= Math.max(this.startRow, this.endRow) &&
            col >= Math.min(this.startCol, this.endCol) &&
            col <= Math.max(this.startCol, this.endCol)
        );
    }
}
 
/**
 * Represents a range of cells.
 */
class CellRange {
    /**
     * Initializes a cell range.
     * @param {number} startRow Start row index
     * @param {number} startCol Start column index
     * @param {number} endRow End row index
     * @param {number} endCol End column index
     */
    constructor(startRow, startCol, endRow, endCol) {
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
 
/**
 * Command pattern base class for undo/redo actions.
 */
class Command {
    /**
     * Executes the command.
     */
    execute() { }
    /**
     * Undoes the command.
     */
    undo() { }
}
 
/**
 * Command for editing a cell.
 */
class EditCellCommand extends Command {
    /**
     * @param {Grid} grid
     * @param {number} row
     * @param {number} col
     * @param {any} oldValue
     * @param {any} newValue
     */
    constructor(grid, row, col, oldValue, newValue) {
        super();
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
 
/**
 * Command for resizing a column.
 */
class ResizeColumnCommand extends Command {
    /**
     * @param {Grid} grid
     * @param {number} col
     * @param {number} oldWidth
     * @param {number} newWidth
     */
    constructor(grid, col, oldWidth, newWidth) {
        super();
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
 
/**
 * Command for resizing a row.
 */
class ResizeRowCommand extends Command {
    /**
     * @param {Grid} grid
     * @param {number} row
     * @param {number} oldHeight
     * @param {number} newHeight
     */
    constructor(grid, row, oldHeight, newHeight) {
        super();
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
 
/**
 * Represents the main grid.
 */
class Grid {
    /**
     * Initializes the grid.
     * @param {HTMLCanvasElement} canvas The canvas element
     * @param {number} rowCount Number of rows
     * @param {number} colCount Number of columns
     */
    constructor(canvas, rowCount, colCount) {
        /**@type {HTMLCanvasElement} The canvas element */
        this.canvas = canvas;
        /**@type {CanvasRenderingContext2D} The canvas context */
        this.ctx = canvas.getContext('2d');
        /**@type {Row[]} Array of rows */
        this.rows = [];
        /**@type {Column[]} Array of columns */
        this.columns = [];
        /**@type {Selection} Current selection */
        this.selection = new Selection();
        /**@type {Command[]} Undo stack */
        this.undoStack = [];
        /**@type {Command[]} Redo stack */
        this.redoStack = [];
        /**@type {Object[]} Data loaded from JSON */
        this.data = [];
        /**@type {number} Vertical scroll offset (for virtualization) */
        this.scrollY = 0;
        /**@type {number} Horizontal scroll offset (for virtualization) */
        this.scrollX = 0;
        /**@type {number} Height of column header */
        this.headerHeight = 24;
        /**@type {number} Width of row header */
        this.rowHeaderWidth = 50;
        /**@type {number} For resizing columns */
        this.resizingCol = -1;
        /**@type {number} For resizing rows */
        this.resizingRow = -1;
        /**@type {boolean} Is resizing */
        this.isResizing = false;
        /**@type {number} Initial mouse position for resizing */
        this.resizeStart = 0;
        /**@type {number} Initial size for resizing */
        this.resizeInitialSize = 0;
 
        // Initialize columns
        const columnNames = ["ID", "First Name", "Last Name", "Age","Salary"];
        for (let i = 0; i < colCount; i++) {
            // Use the first 4 names, then Col5, Col6, ...
            const name = i < columnNames.length ? columnNames[i] : `Col${i + 1}`;
            this.columns.push(new Column(i, name));
        }
        // Initialize rows
        for (let i = 0; i < rowCount; i++) {
            this.rows.push(new Row(i, colCount));
        }
 
        // Bind event handlers
        this.initEvents();
        // Initial render
        this.render();
    }
 
    /**
 * Computes count, min, max, sum, and average of selected numeric cells.
 * @returns {Object} Stats object
 */
    computeSelectionStats() {
        let values = [];
        for (let r = Math.min(this.selection.startRow, this.selection.endRow); r <= Math.max(this.selection.startRow, this.selection.endRow); r++) {
            for (let c = Math.min(this.selection.startCol, this.selection.endCol); c <= Math.max(this.selection.startCol, this.selection.endCol); c++) {
                let cell = this.rows[r]?.cells[c];
                if (cell) {
                    let num = Number(cell.value);
                    if (!isNaN(num)) {
                        values.push(num);
                    }
                }
            }
        }
        let count = values.length;
        let min = count > 0 ? Math.min(...values) : null;
        let max = count > 0 ? Math.max(...values) : null;
        let sum = count > 0 ? values.reduce((a, b) => a + b, 0) : 0;
        let avg = count > 0 ? sum / count : null;
        return { count, min, max, sum, avg };
    }
 
    /**
     * Loads data into the grid.
     * @param {Object[]} data Array of data objects
     */
    loadData(data) {
        this.data = data;
        // Map data to grid cells (customize as needed)
        for (let i = 0; i < Math.min(data.length, this.rows.length); i++) {
            let rowData = data[i];
            let row = this.rows[i];
            let keys = Object.keys(rowData);
            for (let j = 0; j < Math.min(keys.length, row.cells.length); j++) {
                row.cells[j].value = rowData[keys[j]];
            }
        }
        this.render();
    }
 
    /**
     * Initializes event handlers for the grid.
     */
    initEvents() {
        // Mouse events for selection, editing, resizing
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('dblclick', this.onDoubleClick.bind(this));
        // Keyboard events for undo/redo, editing
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        // Scroll events for virtualization
        this.canvas.addEventListener('wheel', this.onWheel.bind(this));
    }
 
    /**
     * Handles mouse down event for selection and resizing.
     * @param {MouseEvent} e
     */
    onMouseDown(e) {
        const { row, col, x, y, onColBorder, onRowBorder } = this.getCellAt(e.offsetX, e.offsetY);
 
        // Resizing logic should come first!
        if (onColBorder) {
            this.resizingCol = col;
            this.isResizing = true;
            this.resizeStart = e.clientX;
            this.resizeInitialSize = this.columns[col].width;
            return;
        }
        if (onRowBorder) {
            this.resizingRow = row;
            this.isResizing = true;
            this.resizeStart = e.clientY;
            this.resizeInitialSize = this.rows[row].height;
            return;
        }
 
        // Column selection (click on column header)
        if (row === -1 && col >= 0) {
            this.selection.startRow = 0;
            this.selection.endRow = this.rows.length - 1;
            this.selection.startCol = col;
            this.selection.endCol = col;
            this.selection.type = 'column';
            this.render();
            return;
        }
 
        // Row selection (click on row header)
        if (col === -1 && row >= 0) {
            this.selection.startCol = 0;
            this.selection.endCol = this.columns.length - 1;
            this.selection.startRow = row;
            this.selection.endRow = row;
            this.selection.type = 'row';
            this.render();
            return;
        }
 
        // Range selection (click and drag in grid)
        if (row >= 0 && col >= 0) {
            this.selection.startRow = row;
            this.selection.startCol = col;
            this.selection.endRow = row;
            this.selection.endCol = col;
            this.selection.type = 'cell';
            this.isSelecting = true;
            this.render();
            return;
        }
    }
    /**
     * Handles mouse move event for resizing and selection.
     * @param {MouseEvent} e
     */
    onMouseMove(e) {
        if (this.isResizing) {
            if (this.resizingCol >= 0) {
                // Column resizing
                let delta = e.clientX - this.resizeStart;
                let newWidth = Math.max(30, this.resizeInitialSize + delta);
                this.columns[this.resizingCol].width = newWidth;
                this.render();
            } else if (this.resizingRow >= 0) {
                // Row resizing
                let delta = e.clientY - this.resizeStart;
                let newHeight = Math.max(16, this.resizeInitialSize + delta);
                this.rows[this.resizingRow].height = newHeight;
                this.render();
            }
            return;
        }
 
        // Selection and cursor logic
        if (this.isSelecting) {
            // Range selection (drag)
            const { row, col } = this.getCellAt(e.offsetX, e.offsetY);
            if (row >= 0 && col >= 0) {
                this.selection.endRow = row;
                this.selection.endCol = col;
                this.selection.type = 'range';
                this.render();
            }
        } else {
            const { onColBorder, onRowBorder } = this.getCellAt(e.offsetX, e.offsetY);
            if (onColBorder) {
                this.canvas.style.cursor = 'col-resize'; // horizontal double-arrow
            } else if (onRowBorder) {
                this.canvas.style.cursor = 'row-resize'; // vertical double-arrow
            } else {
                this.canvas.style.cursor = 'default';
            }
        }
    }
 
    /**
     * Handles mouse up event for resizing and selection.
     * @param {MouseEvent} e
     */
    onMouseUp(e) {
        if (this.isResizing) {
            if (this.resizingCol >= 0) {
                // Push resize command for undo
                let col = this.resizingCol;
                let oldWidth = this.resizeInitialSize;
                let newWidth = this.columns[col].width;
                this.pushCommand(new ResizeColumnCommand(this, col, oldWidth, newWidth));
            } else if (this.resizingRow >= 0) {
                let row = this.resizingRow;
                let oldHeight = this.resizeInitialSize;
                let newHeight = this.rows[row].height;
                this.pushCommand(new ResizeRowCommand(this, row, oldHeight, newHeight));
            }
            this.isResizing = false;
            this.resizingCol = -1;
            this.resizingRow = -1;
        }
        if (this.isSelecting) {
            this.isSelecting = false;
        }
    }
 
    /**
     * Handles double click for cell or column header editing.
     * @param {MouseEvent} e
     */
    onDoubleClick(e) {
        const { row, col } = this.getCellAt(e.offsetX, e.offsetY);
        // Column header double-click: edit column name
        if (row === -1 && col >= 0) {
            this.showColumnNameEditor(col, this.columns[col].name);
            return;
        }
        // Cell double-click: edit cell value
        if (row >= 0 && col >= 0) {
            let cell = this.rows[row].cells[col];
            cell.editing = true;
            this.render();
            this.showEditor(row, col, cell.value);
        }
    }
 
    /**
 * Shows an input box for editing a column name.
 * @param {number} col
 * @param {string} value
 */
    showColumnNameEditor(col, value) {
        // Get column header position
        let x = this.rowHeaderWidth;
        for (let c = 0; c < col; c++) x += this.columns[c].width;
        let y = 0;
 
        let input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.style.position = 'absolute';
        input.style.left = (this.canvas.offsetLeft + x) + 'px';
        input.style.top = (this.canvas.offsetTop + y) + 'px';
        input.style.width = this.columns[col].width + 'px';
        input.style.height = this.headerHeight + 'px';
        input.style.fontSize = '14px';
        input.style.zIndex = 1000;
        document.body.appendChild(input);
        input.focus();
 
        input.addEventListener('blur', () => {
            let newValue = input.value;
            document.body.removeChild(input);
            if (this.columns[col].name !== newValue && newValue.trim() !== "") {
                this.columns[col].name = newValue;
                this.render();
            }
        });
 
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }
 
    /**
     * Shows an input box for editing a cell.
     * @param {number} row
     * @param {number} col
     * @param {any} value
     */
    showEditor(row, col, value) {
        // Get cell position
        let x = this.rowHeaderWidth;
        for (let c = 0; c < col; c++) x += this.columns[c].width;
        let y = this.headerHeight;
        for (let r = 0; r < row; r++) y += this.rows[r].height;
 
        let input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.style.position = 'absolute';
        input.style.left = (this.canvas.offsetLeft + x) + 'px';
        input.style.top = (this.canvas.offsetTop + y) + 'px';
        input.style.width = this.columns[col].width + 'px';
        input.style.height = this.rows[row].height + 'px';
        input.style.fontSize = '18px';
        input.style.zIndex = 1000;
        document.body.appendChild(input);
        input.focus();
 
        input.addEventListener('blur', () => {
            let oldValue = this.rows[row].cells[col].value;
            let newValue = input.value;
            this.rows[row].cells[col].editing = false;
            document.body.removeChild(input);
            if (oldValue !== newValue) {
                this.pushCommand(new EditCellCommand(this, row, col, oldValue, newValue));
            } else {
                this.render();
            }
        });
 
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }
 
    /**
     * Handles keyboard events for undo/redo.
     * @param {KeyboardEvent} e
     */
    onKeyDown(e) {
        if (e.ctrlKey && e.key === 'z') {
            this.undo();
        } else if (e.ctrlKey && e.key === 'y') {
            this.redo();
        }
    }
 
    /**
     * Handles scroll for virtualization.
     * @param {WheelEvent} e
     */
    onWheel(e) {
        this.scrollY += e.deltaY;
        this.scrollX += e.deltaX;
        this.scrollY = Math.max(0, this.scrollY);
        this.scrollX = Math.max(0, this.scrollX);
        this.render();
        e.preventDefault();
    }
 
    /**
     * Pushes a command to the undo stack and executes it.
     * @param {Command} cmd
     */
    pushCommand(cmd) {
        cmd.execute();
        this.undoStack.push(cmd);
        this.redoStack = [];
    }
 
    /**
     * Undoes the last command.
     */
    undo() {
        if (this.undoStack.length > 0) {
            let cmd = this.undoStack.pop();
            cmd.undo();
            this.redoStack.push(cmd);
        }
    }
 
    /**
     * Redoes the last undone command.
     */
    redo() {
        if (this.redoStack.length > 0) {
            let cmd = this.redoStack.pop();
            cmd.execute();
            this.undoStack.push(cmd);
        }
    }
 
    /**
     * Gets the cell at a given canvas position, and detects if on border for resizing.
     * @param {number} px
     * @param {number} py
     * @returns {object}
     */
    getCellAt(px, py) {
        let x = this.rowHeaderWidth - this.scrollX;
        let y = this.headerHeight - this.scrollY;
        let col = -1, row = -1;
        let onColBorder = false, onRowBorder = false;
        // Find column
        for (let c = 0; c < this.columns.length; c++) {
            if (px >= x + this.columns[c].width - 3 && px <= x + this.columns[c].width + 3 && py < this.headerHeight) {
                col = c;
                onColBorder = true;
                break;
            }
            if (px >= x && px < x + this.columns[c].width) {
                col = c;
                break;
            }
            x += this.columns[c].width;
        }
        // Find row
        x = this.rowHeaderWidth - this.scrollX;
        for (let r = 0; r < this.rows.length; r++) {
            if (py >= y + this.rows[r].height - 3 && py <= y + this.rows[r].height + 3 && px < this.rowHeaderWidth) {
                row = r;
                onRowBorder = true;
                break;
            }
            if (py >= y && py < y + this.rows[r].height) {
                row = r;
                break;
            }
            y += this.rows[r].height;
        }
        return { row, col, x, y, onColBorder, onRowBorder };
    }
 
    /**
     * Renders the grid on the canvas (virtualized).
     */
    render() {
        // Virtualization: only render visible rows/columns
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let x = this.rowHeaderWidth - this.scrollX;
        let y = this.headerHeight - this.scrollY;
        // Draw column headers
        for (let c = 0; c < this.columns.length; c++) {
            let col = this.columns[c];
            if (x > this.canvas.width) break;
            if (x + col.width >= 0) {
                // Highlight selected column
                if (this.selection.type === 'column' && this.selection.startCol === c) {
                    this.ctx.fillStyle = "#ffeeba";
                    this.ctx.fillRect(x, 0, col.width, this.headerHeight);
                } else {
                    this.ctx.fillStyle = "#f0f0f0";
                    this.ctx.fillRect(x, 0, col.width, this.headerHeight);
                }
                this.ctx.strokeRect(x, 0, col.width, this.headerHeight);
                this.ctx.fillStyle = "#000";
                this.ctx.fillText(col.name, x + 4, 16);
            }
            x += col.width;
        }
        // Draw row headers and cells
        y = this.headerHeight - this.scrollY;
        for (let r = 0; r < this.rows.length; r++) {
            let row = this.rows[r];
            let rowY = y;
            if (rowY > this.canvas.height) break;
            if (rowY + row.height >= 0) {
                // Highlight selected row
                if (this.selection.type === 'row' && this.selection.startRow === r) {
                    this.ctx.fillStyle = "#ffeeba";
                    this.ctx.fillRect(0, rowY, this.rowHeaderWidth, row.height);
                } else {
                    this.ctx.fillStyle = "#f0f0f0";
                    this.ctx.fillRect(0, rowY, this.rowHeaderWidth, row.height);
                }
                this.ctx.strokeRect(0, rowY, this.rowHeaderWidth, row.height);
                this.ctx.fillStyle = "#000";
                this.ctx.fillText((r + 1).toString(), 4, rowY + 16);
 
 
                // Cells
                let x = this.rowHeaderWidth - this.scrollX;
                for (let c = 0; c < this.columns.length; c++) {
                    let col = this.columns[c];
                    if (x > this.canvas.width) break;
                    if (x + col.width >= 0) {
                        let cell = row.cells[c];
                        // Highlight selection
                        if (this.selection.contains(r, c)) {
                            this.ctx.fillStyle = "#cce5ff";
                            this.ctx.fillRect(x, rowY, col.width, row.height);
                        } else {
                            this.ctx.fillStyle = "#fff";
                            this.ctx.fillRect(x, rowY, col.width, row.height);
                        }
                        this.ctx.strokeRect(x, rowY, col.width, row.height);
                        this.ctx.fillStyle = "#000";
                        this.ctx.fillText(cell.value, x + 4, rowY + 16);
                    }
                    x += col.width;
                }
            }
            y += row.height;
        }
        if (typeof statusBar !== 'undefined') {
            const stats = this.computeSelectionStats();
            statusBar.textContent = `Count: ${stats.count}  Min: ${stats.min}  Max: ${stats.max}  Sum: ${stats.sum}  Avg: ${stats.avg}`;
        }
    }
}
 
// Example usage:
const canvas = document.createElement('canvas');
canvas.width = 2000;
canvas.height = 850;
canvas.style.border = "1px solid #888";
document.body.appendChild(canvas);
 
// Add a div to your HTML:
const statusBar = document.createElement('div');
statusBar.style.padding = '6px';
statusBar.style.fontFamily = 'monospace';
document.body.appendChild(statusBar);
 
// Create grid with 100000 rows and 500 columns (for demo, use smaller numbers)
const grid = new Grid(canvas, 100000, 500); // Use 100000, 500 for real use
 
// Generate sample data
function generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: i + 1,
            firstName: "Raj" + i,
            lastName: "Solanki" + i,
            Age: 20 + (i % 50),
            Salary: 50000 + (i * 10)
        });
    }
    return data;
}
 
// Load data into grid
grid.loadData(generateData(1000)); // Use 50000 for real use
 
// Fetch and load Data.json
// fetch('Data.json')
//   .then(response => response.json())
//   .then(data => {
//     const canvas = document.getElementById('myCanvas');
//     const grid = new Grid(canvas, data.length, Object.keys(data[0]).length);
//     grid.loadData(data);
//   });
// Now you have:
// - Column/row resizing
// - Cell editing
// - Selection (cell/range)
// - Undo/redo for edit and resize
// - Virtualization for large grids
// - Detailed comments for every function and variable
 
// You can further expand:
// - Range selection with shift+click/drag
// - Row/column selection
// - Stats
 