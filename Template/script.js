import {canvas, divContainer} from "./data/display/components.js";

const elements = [canvas]

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})

document.body.appendChild(divContainer.node)