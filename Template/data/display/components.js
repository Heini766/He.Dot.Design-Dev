import { SVG } from "../../../Library/renderSvg.js";
import { HTML } from "../../../Library/renderHTML.js";
import { createListeners } from "../../../Library/utilsFunctions.js";
import { stGame } from "../components/index.js";

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

let game
function btnFunc() {

  const [btn] = document.querySelectorAll('#runBtn');
  if (!game) game = new stGame();
  if (game.levels && game.levels.size !== 0) return

  game.newLevel()

  
  
}