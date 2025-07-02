import { mainDs } from "./data/components.js";
import { direction } from "./data/properties.js";

import * as innerFunc from './data/functions.js';

document.body.appendChild(mainDs);

window.addEventListener('keydown', (ev) => {

  const moveDirection = innerFunc.checkMove(ev);
  if (moveDirection) {
    innerFunc.animateMove(moveDirection, direction.current)
    if (direction.current !== moveDirection) {
      direction.current = moveDirection
    }
  }
  
})