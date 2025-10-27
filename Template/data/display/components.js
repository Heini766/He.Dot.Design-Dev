import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js";
import { PointGame } from "../components/index.js";
import { events } from "../../../Code Library OOP/utilsFunctions.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG('svg', {id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});
const html = new HTML();

export const runBtn = html.ren('button', {id: 'runBtn', class: 'run-button', content: 'Run'});

runBtn.node.addEventListener('click', btnFunc)

const moveEvents = events([
  {
    node: window,
    event: 'keydown',
    repeat: false,
    call: [
      {key: ['a', 'l'], call: e => console.log('Move left', e.key)},
      {key: 'w', call: e => console.log('Move up', e.key)},
      {key: 's', call: e => console.log('Move down', e.key)},
      {key: 'd', call: e => console.log('Move rigth', e.key)},
    ]
  }
])

const clickEvents = events([
  {
    node: canvas.node,
    event: 'dblclick',
    call: e => console.log(e.clientX)
  }
])
clickEvents.remove()

const game = new PointGame()

function btnFunc() {

  game.renderPoint(canvas)

  moveEvents.remove()
  clickEvents.add()
  
}
