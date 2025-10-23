
import { Element } from "./data/character/index.js";
import {canvas } from "./data/display/components.js";
import { runBtn } from "./data/display/components.js";

const elements = [runBtn, canvas]

export const shape = new Element((svg) => {
  
  svg.addNodes([
    svg.ren('circle', {id: 'circle',r: 5, fill: 'white'})
  ])
  
});

shape.setState(shape.node.archive.get('circle'), {
  translate: [50, 50],
  scale: [2, 1]
})

shape.spawn(canvas)

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})