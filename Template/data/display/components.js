import { SVG } from "../../../Code Library OOP/renderSvg.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});

canvas.addNodes(() => {

  const container  = canvas.ren('g', {id: 'container'})
  container.addNodes(() => {

    let shapes = [];

    for (let i = 0; i < 4; i++) {
      const newShape = canvas.ren('rect', {id: `shape${i + 1}`})
      shapes.push(newShape)
    }

    return shapes
    
  })

  return [container]
  
})

console.log(canvas.container.shape4.node)