import {canvas } from "./data/display/components.js";
import { runBtn } from "./data/display/components.js";
import './data/components/script.js'

const elements = [runBtn, canvas]

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})