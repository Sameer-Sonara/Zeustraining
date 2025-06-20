import { Row } from './Row.js';
import { Col } from './Col.js';
import { Cell } from './Cell.js';
import { Command } from './cmd/Command.js'

export class Grid
{
    /**
     * Initializes the Grid.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    constructor(canvas, ctx) 
    {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;

        this.totalRows = 100000;
        this.totalCols = 500;
        this.cellWidth = 100;
        this.cellHeight = 25;
        this.scrollX = 0;
        this.scrollY = 0;
        this.visibleRows = Math.ceil(canvas.height / this.cellHeight);
        this.visibleCols = Math.ceil(canvas.width / this.cellWidth);

        this.attachScrollListeners(); // to render as we scroll

        this.columns = new Map();
        this.rows = new Map();

        this.attachEditListeners();

    }

    getRow(r) 
    {
        if (!this.rows.has(r)) 
        {
            this.rows.set(r, new Row(r, this.totalCols));
        }
        return this.rows.get(r);
    }
    getColName(ind)
    {
        let name ="";
        while(ind >= 0)
        {
            name = String.fromCharCode((ind%26)+65)+name;
            ind = Math.floor(ind/26) - 1;
        }
        return name;
    }

    attachScrollListeners()
    {
        this.canvas.addEventListener('wheel' , (e) =>
        {
            this.scrollX += e.deltaX;
            this.scrollY += e.deltaY;

            this.scrollX = Math.max(0 , this.scrollX);
            this.scrollY = Math.max(0 , this.scrollY);
            this.render();
        });
    }

    attachEditListeners()
    {
        this.canvas.addEventListener('dblclick' , (e) =>
        {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left + this.scrollX;
            const y = e.clientY - rect.top + this.scrollY;

            const col = Math.floor(x / this.cellWidth);
            const row = Math.floor(y / this.cellHeight);

            const input = document.createElement('input');
            input.style.position = 'absolute';
            input.style.left = `${e.clientX}px`;
            input.style.top = `${e.clientY}px`;
            input.style.width = `${this.cellWidth}px`;
            input.style.height = `${this.cellHeight}px`;
            input.style.fontSize = '12px';
            input.value = this.getRow(row).getCell(col).value;

            document.body.appendChild(input);
            input.focus();

            input.addEventListener("blur" , () =>
            {
                this.getRow(row).setCell(col , input.value);
                document.body.removeChild(input);
                this.render();
            });
        });
        
    }
    
    render() // to render the whole grid
    {
        const ctx = this.ctx;
        ctx.clearRect(0 , 0 , this.canvas.width , this.canvas.height)

        const rowStart = Math.floor(this.scrollY/this.cellHeight);
        const colStart = Math.floor(this.scrollX/this.cellWidth);

        for (let col = 1; col < this.visibleCols; col++) 
        {
            const c = colStart + col;
            this.ctx.fillStyle = '#ddd';
            this.ctx.fillRect(col * this.cellWidth, 0, this.cellWidth, this.cellHeight);
            this.ctx.fillStyle = '#000';
            const name = this.getColName(c-1);
            this.ctx.fillText(name, c * this.cellWidth + 5, 15);
        }
        for(let row = 1 ; row<this.visibleRows ; row++)
        {
            this.ctx.fillStyle = '#000';
            this.ctx.fillText((rowStart+row).toString(), 5, row * this.cellHeight + 15);
            for(let col = 1 ; col<this.visibleCols ; col++)
            {
                const r = rowStart + row;
                const c = colStart + col;
                if(r>=this.totalRows || c>=this.totalCols) continue;

                const x = col * this.cellWidth - (this.scrollX % this.cellWidth);
                const y = row * this.cellHeight - (this.scrollY % this.cellHeight);

                ctx.strokeStyle = '#ccc';
                ctx.strokeRect(x , y , this.cellWidth , this.cellHeight);

                ctx.fillStyle = '#000';
                ctx.font= "12px sans-serif";
                ctx.fillText(`R${r}C${c}`, x + 5, y + 17);

            }
        }
        
    }

}


