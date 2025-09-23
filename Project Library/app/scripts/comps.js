import { HTML } from 'https://cdn.jsdelivr.net/gh/Heini766/He.Dot.Design-Dev@refs/heads/App/Code%20Library%20OOP/renderHTML.js';
import { SVG } from 'https://cdn.jsdelivr.net/gh/Heini766/He.Dot.Design-Dev@refs/heads/App/Code%20Library%20OOP/renderSvg.js';

const display = new HTML('div', {id: 'uiContainer', class: 'ui-container'});
const canvas = new SVG({viewBox: `0 0 100 100`, class: 'canvas'});

document.getElementById('mainSection').appendChild(display.node);

display.addNodes(() => {

  return [canvas]
  
})