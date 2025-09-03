import {canvas} from "./data/display/components.js";

const elements = [canvas]

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})