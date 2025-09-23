import { HTML } from '../../../Code Library OOP/renderHTML.js';
import { SVG } from 'https://cdn.jsdelivr.net/gh/Heini766/He.Dot.Design-Dev@refs/heads/main/Code%20Library%20OOP/renderSvg.js';

const display = new HTML('div', {id: 'uiContainer', class: 'ui-container'});
const div = display.ren('div', {id: 'divRendered'})

display.addNodes(() => {
  return [div]
})

console.log(div)

document.getElementById('mainSection').appendChild(display.node);



