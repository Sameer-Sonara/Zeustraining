import { Grid } from "./classes/grid.js";

const canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d'); // make 2d elements
console.log(canvas);

const grid = new Grid(canvas , ctx);
grid.render();