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

        this.rows = 100000;
        this.columns = 500;
        this.cellWidth = 100;
        this.cellHeight = 25;
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

    
    render() // to render the whole grid
    {
        for (let i = 0; i < 55; i++) 
        {
            console.log(i, this.getColName(i));
        }
        // Draw header row
        for (let col = 1; col < 502; col++) 
        {
            this.ctx.fillStyle = '#ddd';
            this.ctx.fillRect(col * this.cellWidth, 0, this.cellWidth, this.cellHeight);
            this.ctx.fillStyle = '#000';
            const name = this.getColName(col-1);
            this.ctx.fillText(name, col * this.cellWidth + 5, 15);
        }

        // Draw rows (just few for perf)
        for (let row = 1; row < 100000; row++) 
            {
                this.ctx.fillStyle = '#eee';
                this.ctx.fillRect(0, row * this.cellHeight, this.rowHeaderWidth, this.cellHeight);

            // Row number text
            this.ctx.fillStyle = '#000';
            this.ctx.fillText(row.toString(), 5, row * this.cellHeight + 15);
            for (let col = 0; col < 200; col++) {
                this.ctx.strokeRect(col * this.cellWidth, row * this.cellHeight, this.cellWidth, this.cellHeight);
            }
        }
    }

}