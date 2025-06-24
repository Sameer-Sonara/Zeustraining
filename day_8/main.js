// main.js
import { Grid } from './classes/Grid.js';
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('canvas-wrapper');
  const grid = new Grid(wrapper);

  window.grid = grid;

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      grid.commandManager.undo();
    }
    if (e.ctrlKey && e.key === 'y') {
      e.preventDefault();
      grid.commandManager.redo();
    }
  });

});
