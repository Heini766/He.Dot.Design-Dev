import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js";
import { createDrag } from "../../../Code Library OOP/utilities.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG('svg', {id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});
const html = new HTML();

export const runBtn = html.ren('button', {id: 'runBtn', class: 'run-button', content: 'Run'});

runBtn.node.addEventListener('click', btnFunc)


function btnFunc() {
  
}