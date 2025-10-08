import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js"

const aspect = {x: 100, y: 100}

export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});
const html = new HTML();

export const runBtn = html.ren('button', {id: 'runBtn', class: 'run-button', content: 'Run'});

runBtn.node.addEventListener('click', btnFunc)

const container = canvas.ren('g', {id: 'container', transform: `translate(${aspect.x/2} ${aspect.y/2})`});
const shape = canvas.ren('circle', {class: 'shape', id: `shape`, r: 5});

canvas.addNodes( [container])
container.addNodes([shape])

function btnFunc() {

  console.log('Run my script')
  
}