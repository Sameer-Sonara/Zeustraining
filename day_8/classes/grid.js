// classes/Grid.js
import { Row } from './Row.js';
import { CommandManager } from './cmd/Command.js';
import { SetCellValueCommand } from './cmd/setvalue.js';
import { Resizer } from './cmd/Resize.js';

export class Grid {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.selectedCell = null;
    this.defaultCellWidth = 100;
    this.defaultCellHeight = 25;   
    this.totalRows = 100000;
    this.totalCols = 5000;

    this.colWidths = new Map();
    this.rowHeights = new Map();

    this.rows = new Map();
    this.commandManager = new CommandManager();

    this.scrollX = 0;
    this.scrollY = 0;
    this.attachEvents();
    this.resizer = new Resizer(this); 
  }

  getColWidth(col) {
    return this.colWidths.get(col) || this.defaultCellWidth;
  }

  getRowHeight(row) {
    return this.rowHeights.get(row) || this.defaultCellHeight;
  }

  attachEvents() {
    
    this.wrapper = document.getElementById('canvas-wrapper');
    
    const canvasRect = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener('dblclick', (e) => {
        const wrapper = document.getElementById("canvas-wrapper");
        const wrapperRect = wrapper.getBoundingClientRect();
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left + this.scrollX;
        const y = e.clientY - rect.top + this.scrollY;

        let col = 0, colOffset = 0;
        for (; col < this.totalCols; col++) {
        const w = this.getColWidth(col);
        if (colOffset + w > x) break;
        colOffset += w;
        }

        let row = 0, rowOffset = 0;
        for (; row < this.totalRows; row++) {
        const h = this.getRowHeight(row);
        if (rowOffset + h > y) break;
        rowOffset += h;
        }

        if (row === 0 || col === 0) return;

        const input = document.createElement('input');
        input.type = 'text';

        input.style.left = `${colOffset - this.scrollX}px`;
        input.style.top = `${rowOffset - this.scrollY}px`;
        input.style.width = `${this.getColWidth(col)}px`;
        input.style.height = `${this.getRowHeight(row)}px`;
        input.value = this.getRow(row).getCell(col).value;

        wrapper.appendChild(input);
        input.focus();
        let cancelled = false;

        input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            input.blur(); // save
        } else if (e.key === 'Escape') {
            cancelled = true;
            input.blur(); // discard
        }
        });

        input.addEventListener('blur', () => {
        if (!cancelled) {
            const cmd = new SetCellValueCommand(this, row, col, input.value);
            this.commandManager.execute(cmd);
        }
        wrapper.removeChild(input);
        });

        });

  }

  getRow(r) {
    if (!this.rows.has(r)) {
      this.rows.set(r, new Row(r));
    }
    return this.rows.get(r);
  }

  clear() {
    this.rows.clear();
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const visibleRows = [];
    let y = -this.scrollY, rowIdx = 0;
    while (y < this.canvas.height && rowIdx < this.totalRows) {
      const h = this.getRowHeight(rowIdx);
      if (y + h >= 0) visibleRows.push({ index: rowIdx, y, h });
      y += h;
      rowIdx++;
    }

    const visibleCols = [];
    let x = -this.scrollX, colIdx = 0;
    while (x < this.canvas.width && colIdx < this.totalCols) {
      const w = this.getColWidth(colIdx);
      if (x + w >= 0) visibleCols.push({ index: colIdx, x, w });
      x += w;
      colIdx++;
    }

    // Column headers
    for (const col of visibleCols) {
        if(col.index === 0) continue;
      ctx.fillStyle = '#eee';
      ctx.fillRect(col.x, 0, col.w, this.defaultCellHeight);
      ctx.strokeRect(col.x, 0, col.w, this.defaultCellHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(this.getColName(col.index-1), col.x + 5, 15);
    }

    // Rows and cells
    for (const row of visibleRows) {
        if(row.index === 0 ) continue;
      ctx.fillStyle = '#eee';
      ctx.fillRect(0, row.y, this.defaultCellWidth, row.h);
      ctx.strokeRect(0, row.y, this.defaultCellWidth, row.h);
      ctx.fillStyle = '#000';
      ctx.fillText((row.index ).toString(), 5, row.y + 15);

      for (const col of visibleCols) {
        const cell = this.getRow(row.index).getCell(col.index);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(col.x, row.y, col.w, row.h);
        ctx.fillStyle = '#000';
        ctx.fillText(cell.value, col.x + 5, row.y + 15);
      }
    }
    this.wrapper = document.getElementById('canvas-wrapper');
    this.wrapper.addEventListener('scroll', () => this.render());
  }

  getColName(index) {
    let name = "";
    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name;
      index = Math.floor(index / 26) - 1;
    }
    return name;
  }
}
