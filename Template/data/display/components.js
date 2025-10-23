import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js";
import { shape } from "../../script.js";
import { createDrag } from "../../../Code Library OOP/utilities.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG('svg', {id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});
const html = new HTML();

export const runBtn = html.ren('button', {id: 'runBtn', class: 'run-button', content: 'Run'});

runBtn.node.addEventListener('click', btnFunc)


function btnFunc() {
  
  shape.setState(shape.node.archive.get('circle'), {
    //scale: .9
  })

  createDrag(shape.node.archive.get('circle').node, {

    onDown: e => {
      const cur = getRelativePosition(e, canvas.node)
      shape.setState(shape.node.archive.get('circle'), {
        translate: [cur[0], cur[1]],
        //scale: .5
      })
    },
    onMove: e => {
      const cur = getRelativePosition(e, canvas.node)
      shape.setState(shape.node.archive.get('circle'), {
        translate: [cur[0], cur[1]]
      })
    }, 
    onUp: e => {
      shape.setState(shape.node.archive.get('circle'), {
        scale: 2
      })
    }
    
  }).active(true)
  
}