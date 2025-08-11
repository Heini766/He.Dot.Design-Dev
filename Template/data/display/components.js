import { SVG } from "../../../Code Library OOP/renderSvg.js"

const aspect = {x: 100, y: 100}

export const mainDs = new SVG({id: 'mainDisplay', class: 'main-display', viewBox: `${-aspect.x/2} ${-aspect.y/2} ${aspect.x} ${aspect.y}`});
mainDs.addNodes(() => {
  const shape1 = mainDs.ren('rect', {class: 'shape1', width: 20, height: 20})
  const shape2 = mainDs.ren('path', {class: 'polygon', d: `M0 0 L10 10 L-40 10 L -20 -15z`})
  return [shape1, shape2]
})