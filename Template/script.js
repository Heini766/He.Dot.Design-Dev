import {navMenu} from "./data/display/components.js";

const elements = [navMenu]

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})