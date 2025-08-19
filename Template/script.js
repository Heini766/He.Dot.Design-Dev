import { mainDs, myDiv } from "./data/display/components.js";

const elements = [mainDs, myDiv]

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})