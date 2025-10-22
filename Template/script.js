import { PacMan } from "./data/character/index.js";
import {canvas } from "./data/display/components.js";
import { runBtn } from "./data/display/components.js";

const elements = [runBtn, canvas]

export const pacMan = new PacMan();

pacMan.spawn(canvas)
pacMan.setState({position: [25, 50], rotate: 120})

console.log(canvas.archive)

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})