
import { Element } from "./data/character/index.js";
import {canvas } from "./data/display/components.js";
import { runBtn } from "./data/display/components.js";

const elements = [runBtn, canvas]

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})