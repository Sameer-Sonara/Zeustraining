import { Grid } from './classes/grid.js';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
canvas.style.imageRendering = 'pixelated'; // clean rendering
const grid = new Grid(canvas, ctx);
grid.render();


// Toolbar actions
window.grid = grid;



window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault(); // prevent browser undo
    grid.commandManager.undo();
  }
  if (e.ctrlKey && e.key === 'y') {
    e.preventDefault(); // prevent browser redo
    grid.commandManager.redo();
  }
});
