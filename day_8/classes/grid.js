import { Row } from './Row.js';
// import { Selection } from './Selection.js';

const TILE_ROWS = 50;
const TILE_COLS = 30;
const TILE_BUFFER = 0;

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
class CanvasTile {
  constructor(grid, rowIndex, colIndex) {
    this.grid = grid;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;

    this.startRow = rowIndex * TILE_ROWS;
    this.endRow = Math.min(this.startRow + TILE_ROWS, grid.totalRows);
    this.startCol = colIndex * TILE_COLS;0
    this.endCol = Math.min(this.startCol + TILE_COLS, grid.totalCols);

    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('grid-tile');
    this.ctx = this.canvas.getContext('2d');

    const width = this.getWidth();
    const height = this.getHeight();
    const ratio = window.devicePixelRatio || 1;

    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = `${this.getLeft()}px`;
    this.canvas.style.top = `${this.getTop()}px`;

    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    grid.wrapper.appendChild(this.canvas);
  }

  getWidth() {
    let width = 0;
    for (let c = this.startCol; c < this.endCol; c++) {
      width += this.grid.getColWidth(c);
    }
    return width;
  }

  getHeight() {
    let height = 0;
    for (let r = this.startRow; r < this.endRow; r++) {
      height += this.grid.getRowHeight(r);
    }
    return height;
  }

  getLeft() {
    let x = 0;
    for (let c = 0; c < this.startCol; c++) x += this.grid.getColWidth(c);
    return x;
  }

  getTop() {
    let y = 0;
    for (let r = 0; r < this.startRow; r++) y += this.grid.getRowHeight(r);
    return y;
  }

  draw() {
    const ctx = this.ctx;
    const ratio = window.devicePixelRatio || 1;
    const width = this.canvas.width / ratio;
    const height = this.canvas.height / ratio;

    ctx.save();
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#ccc';
    
    
    ctx.translate(0.5 , 0.5);
    ctx.lineWidth = 1 / ratio;

    let y = 0;
    for (let r = this.startRow; r <= this.endRow; r++) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      y += this.grid.getRowHeight(r);
    }

    let x = 0;
    for (let c = this.startCol; c <= this.endCol; c++) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      x += this.grid.getColWidth(c);
    }
    ctx.restore();
  }

  destroy() {
    this.canvas.remove();
  }
}

export class Grid {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.totalRows = 100000;
    this.totalCols = 5000;
    this.defaultCellWidth = 100;
    this.defaultCellHeight = 25;

    this.colWidths = new Map();
    this.rowHeights = new Map();
    this.rows = new Map();
    this.tiles = new Map();

    this.colHeader = document.getElementById('col-header');
    this.colHeaderCtx = this.colHeader.getContext('2d');
    this.rowHeader = document.getElementById('row-header');
    this.rowHeaderCtx = this.rowHeader.getContext('2d');
    this.headerHeight = 25;
    this.headerWidth = 50;


    this.wrapper.addEventListener('scroll', () => {
      this.render();
      this.renderHeaders();
    });
    window.addEventListener('resize', debounce(() => 
      {
        this.forceFullRender();
        this.renderHeaders();
      }, 50));
    this.render();
    this.renderHeaders();
  }

  getColName(index) {
    let name = '';
    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name;
      index = Math.floor(index / 26) - 1;
    }
    return name;
  }

  getColWidth(c) {
    return this.colWidths.get(c) || this.defaultCellWidth;
  }

  getRowHeight(r) {
    return this.rowHeights.get(r) || this.defaultCellHeight;
  }

  getRow(r) {
    if (!this.rows.has(r)) this.rows.set(r, new Row(r));
    return this.rows.get(r);
  }

  forceFullRender() {
    for (const tile of this.tiles.values()) {
      tile.destroy();
    }
    this.tiles.clear();
    this.render();
  }

  render() {
    const scrollTop = this.wrapper.scrollTop;
    const scrollLeft = this.wrapper.scrollLeft;
    const visibleWidth = this.wrapper.clientWidth;
    const visibleHeight = this.wrapper.clientHeight;
    const tileRowStart = Math.floor(scrollTop / (TILE_ROWS * this.getRowHeight()));
    const tileRowEnd = Math.ceil((scrollTop + visibleHeight) / (TILE_ROWS * this.getRowHeight()));
    const tileColStart = Math.floor(scrollLeft / (TILE_COLS * this.getColWidth()));
    const tileColEnd = Math.ceil((scrollLeft + visibleWidth) / (TILE_COLS * this.getColWidth()));

    const visibleKeys = new Set();

    for (let r = (tileRowStart - TILE_BUFFER) ; r <= tileRowEnd + TILE_BUFFER; r++) {
      for (let c = (tileColStart - TILE_BUFFER); c <= tileColEnd + TILE_BUFFER; c++) {
        if (r < 0 || c < 0) continue;
        const key = `${r}_${c}`;
        visibleKeys.add(key);
        if (!this.tiles.has(key)) {
          const tile = new CanvasTile(this, r, c);
          this.tiles.set(key, tile);
          
        }
      }
    }

    for (const [key, tile] of this.tiles.entries()) {
      if (!visibleKeys.has(key)) {
        tile.destroy();
        this.tiles.delete(key);
      }
      else{
        tile.draw();
      }
    }
  }

  renderHeaders() {
    const scrollX = this.wrapper.scrollLeft;
    const scrollY = this.wrapper.scrollTop;
    const ratio = window.devicePixelRatio || 1;
    const canvasWidth = this.wrapper.clientWidth;
    const canvasHeight = this.wrapper.clientHeight;

    // Column header
    const colCanvas = this.colHeader;
    const ctxCol = this.colHeaderCtx;

    colCanvas.width = canvasWidth * ratio;
    colCanvas.height = this.headerHeight * ratio;
    colCanvas.style.width = `${canvasWidth}px`;
    colCanvas.style.height = `${this.headerHeight}px`;
    
    ctxCol.setTransform(ratio, 0, 0, ratio, 0, 0);
    
    ctxCol.translate(0.5 , 0.5);
    ctxCol.lineWidth =1/ ratio;
    ctxCol.clearRect(0, 0, canvasWidth, this.headerHeight);
    ctxCol.font = '15px sans-serif';
    ctxCol.textAlign = 'center';
    ctxCol.textBaseline = 'middle';

    let x = -scrollX;
    for (let c = 0; x < canvasWidth && c < this.totalCols; c++) {
      const colW = this.getColWidth(c);
      ctxCol.fillStyle = '#f8f8f8';
      ctxCol.fillRect(x, 0, colW, this.headerHeight);
      ctxCol.strokeStyle = '#ccc';
      ctxCol.strokeRect(x, 0, colW, this.headerHeight);
      ctxCol.fillStyle = '#000';
      ctxCol.fillText(this.getColName(c), x + colW / 2, this.headerHeight / 2);
      x += colW;
    }

    // Row header
    const rowCanvas = this.rowHeader;
    const ctxRow = this.rowHeaderCtx;

    rowCanvas.width = this.headerWidth * ratio;
    rowCanvas.height = canvasHeight * ratio;
    rowCanvas.style.width = `${this.headerWidth}px`;
    rowCanvas.style.height = `${canvasHeight}px`;
    ctxCol.translate(0.5 , 0.5);
    ctxCol.lineWidth = 0.8 / ratio;

    ctxRow.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctxRow.clearRect(0, 0, this.headerWidth, canvasHeight);
    ctxRow.font = '15px sans-serif';
    ctxRow.textAlign = 'center';
    ctxRow.textBaseline = 'middle';
    ctxRow.translate(0.5 , 0.5);
    ctxRow.lineWidth = 1/ ratio;

    let y = -scrollY;
    for (let r = 0; y < canvasHeight && r < this.totalRows; r++) {
      const rowH = this.getRowHeight(r);
      const label = (r + 1).toString();
      ctxRow.fillStyle = '#f8f8f8';
      ctxRow.fillRect(0, y, this.headerWidth, rowH);
      ctxRow.strokeStyle = '#ccc';
      ctxRow.strokeRect(0, y, this.headerWidth, rowH);
      ctxRow.fillStyle = '#000';
      ctxRow.fillText(label, this.headerWidth / 2, y + rowH / 2);
      y += rowH;
    }
  }
}
