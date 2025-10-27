import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js";
import { PointGame } from "../components/index.js";
import { createListeners } from "../../../Code Library OOP/utilsFunctions.js";

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

const game = new PointGame()

function btnFunc() {

  game.renderPoint(canvas)
  
}