import { HTML } from 'https://cdn.jsdelivr.net/gh/Heini766/He.Dot.Design-Dev@refs/heads/main/Code%20Library%20OOP/renderHTML.js';
import { SVG } from 'https://cdn.jsdelivr.net/gh/Heini766/He.Dot.Design-Dev@refs/heads/main/Code%20Library%20OOP/renderSvg.js';

const display = new HTML('div', {id: 'uiContainer', class: 'ui-container'});

document.getElementById('mainSection').appendChild(display.node)

