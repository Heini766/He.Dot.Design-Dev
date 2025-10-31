import { SVG } from "../../../Library/renderSvg.js";
import { HTML } from "../../../Library/renderHTML.js";
import { createListeners } from "../../../Library/utilsFunctions.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG('svg', {id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});
const html = new HTML();

export const runBtn = html.ren('button', {id: 'runBtn', class: 'run-button', content: 'Run'});

createListeners([
  {
    node: runBtn.node,
    event: 'click',
    call: btnFunc
  }
])

function btnFunc() {

  
  
}