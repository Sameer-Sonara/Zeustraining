// main.js
import { Grid } from './classes/grid.js'
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('canvas-wrapper');
  const grid = new Grid(wrapper);

  window.grid = grid;

});
