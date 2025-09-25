import { HTML } from "../../../Code Library OOP/renderHTML.js";
import { SVG } from "../../../Code Library OOP/renderSvg.js";

const aspect = {x: 100, y: 100}

export const divContainer = new HTML('div', {class: 'div-container', id: 'divCon'});
export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});

const firstListner = divContainer.addListener([
  {
    event: 'mousedown',
    func: (node) => {
      divContainer.addListener({event: 'mousemove', func: () => {
        console.log('move')
      }})
    }
  },
  {
    event: 'mouseup',
    func: () => {
      divContainer.removeListener(3)
      console.log('up')
    }
  }
])

console.log(firstListner)

