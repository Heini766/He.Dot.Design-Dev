import { genPathData, SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js"
import { getPointAlongPath } from "../../../Code Library OOP/functions.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});
const html = new HTML();

export const runBtn = html.ren('button', {id: 'runBtn', class: 'run-button', content: 'Run'});

runBtn.node.addEventListener('click', btnFunc)

const myFirstPath = canvas.ren('path', {class: 'path', d: genPathData([
  {
    vertex: [-10, -10],
    outTangent: [20, 0]
  }, {
    vertex: [10, 10],
    inTangent: [-30, 0]
  }
]).d})

const pos = getPointAlongPath(myFirstPath.node, .25);

const container = canvas.ren('g', {id: 'container', transform: `translate(${aspect.x/2} ${aspect.y/2})`});
const shape = canvas.ren('circle', {class: 'shape', id: `shape`, r: 5, transform: `translate(${pos.x} ${pos.y})`});

canvas.addNodes( [container])
container.addNodes([shape, myFirstPath])

function btnFunc() {

  console.log('Run my script')
  
}