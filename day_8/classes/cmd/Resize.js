// classes/Resizer.js
export class Resizer {
  constructor(grid) {
    this.grid = grid;
    this.canvas = grid.canvas;
    this.ctx = grid.ctx;

    this.dragging = false;
    this.hoverCol = null;
    this.hoverRow = null;
    this.startMouse = null;
    this.startSize = null;

    this.init();
  }

  init() {
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mouseup', () => this.dragging = false);
    this.canvas.addEventListener('mouseleave', () => this.dragging = false);
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const scrollX = this.grid.scrollX;
    const scrollY = this.grid.scrollY;
    const x = clientX + scrollX;
    const y = clientY + scrollY;

    let col = null;
    let row = null;

    // Only allow col resize inside header row
    if (y < this.grid.getRowHeight(0)) {
      col = this.findColNear(x);
    }

    // Only allow row resize inside header column
    if (x < this.grid.getColWidth(0)) {
      row = this.findRowNear(y);
    }

    if (this.dragging) {
      if (this.hoverCol !== null) {
        const delta = e.clientX - this.startMouse.x;
        const newWidth = Math.max(30, this.startSize + delta);
        this.grid.colWidths.set(this.hoverCol, newWidth);
      } else if (this.hoverRow !== null) {
        const delta = e.clientY - this.startMouse.y;
        const newHeight = Math.max(15, this.startSize + delta);
        this.grid.rowHeights.set(this.hoverRow, newHeight);
      }
      this.grid.render();
      return;
    }

    if (col !== null) {
      this.canvas.style.cursor = 'col-resize';
      this.hoverCol = col;
      this.hoverRow = null;
    } else if (row !== null) {
      this.canvas.style.cursor = 'row-resize';
      this.hoverRow = row;
      this.hoverCol = null;
    } else {
      this.canvas.style.cursor = 'default';
      this.hoverRow = this.hoverCol = null;
    }
  }

  onMouseDown(e) {
    if (this.hoverCol !== null || this.hoverRow !== null) {
      this.startMouse = { x: e.clientX, y: e.clientY };
      this.startSize = this.hoverCol !== null
        ? this.grid.getColWidth(this.hoverCol)
        : this.grid.getRowHeight(this.hoverRow);
      this.dragging = true;
    }
  }

  findColNear(x) {
    let offset = 0;
    for (let col = 0; col < this.grid.totalCols; col++) {
      const w = this.grid.getColWidth(col);
      if (col === 0) { offset += w; continue; } // skip col 0
      if (Math.abs(x - (offset + w)) < 5) return col;
      offset += w;
      if (offset > this.grid.scrollX + this.canvas.width) break;
    }
    return null;
  }

  findRowNear(y) {
    let offset = 0;
    for (let row = 0; row < this.grid.totalRows; row++) {
      const h = this.grid.getRowHeight(row);
      if (row === 0) { offset += h; continue; } // skip row 0
      if (Math.abs(y - (offset + h)) < 5) return row;
      offset += h;
      if (offset > this.grid.scrollY + this.canvas.height) break;
    }
    return null;
  }
}
